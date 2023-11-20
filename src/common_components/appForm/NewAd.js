import { useState, useContext } from "react";
import axios from "axios";
import $ from "jquery";
import { AppContext } from "../../App";
import { CONST } from "../../constant/index";
import getDigest from "../../services/GetDigest/GetDigest";

import {
  emailValidator,
  dropDownValidator,
  textAreaValidator,
  phoneNumberValidator,
  priceValidator,
} from "../../services/validationService";
import { VAR } from "../../env";

function getMyPictureUrl(accountName, size) {
  return (
    CONST.BASE_URL +
    "/_layouts/15/userphoto.aspx?size=" +
    size +
    "&accountname=" +
    accountName
  );
}

const UseForm = (
  initialValues,
  errorObj,
  setLoaderTime,
  setRegisterDone,
  eventId,
  mode,
  listId,
  updatedValues
) => {
  //State Setting
  const [inputs, setInputs] = useState(initialValues);
  const [errors, setErrors] = useState(errorObj);
  //User
  const { user } = useContext(AppContext);
  // Submit Handling
  const handleSubmit = async () => {
    if (mode === "update") {
      setLoaderTime(true);
      // let resp = await getDigest();
      const url =
        CONST.BASE_URL + CONST.API.LIST("Advertisement") + `(${listId})`;
      const stringifyPostData = JSON.stringify({
        __metadata: {
          type: "SP.Data.Advertisement1ListItem",
          // type: "SP.Data.AdvertisementListItem",
        },
        Title: updatedValues.Title,
        Description: updatedValues.Description,
        Price: updatedValues.Price,
        Brand: updatedValues.Brand,
        Email: updatedValues.Email,
        // Country: updatedValues.Country,
        // City: updatedValues.City,
        Category: updatedValues.Category,
        SubCategory:
          updatedValues.Category.toLowerCase() === "others"
            ? ""
            : inputs.SubCategory,
        Phone: updatedValues.Phone,
        Address: updatedValues.Address,
        Author0: updatedValues.Author0,
        //AuthorImage: user.data.UserProfileProperties[18].Value.replace(':443', ''),
        status: updatedValues.status,
        AuthorImage: updatedValues.AuthorImage,
      });
      // $("#__REQUESTDIGEST").val()

      getDigest().then(async (digest) => {
        const configAxios = {
          headers: {
            accept: "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": await digest,
            // "X-HTTP-Method": "POST",
            "IF-MATCH": "*",
            "X-HTTP-Method": "MERGE",
          },
        };
        axios
          .post(url, stringifyPostData, configAxios)
          .then((r) => {
            setLoaderTime(false);
            setRegisterDone(true);
            setInputs(initialValues);
            setErrors(errorObj);
          })
          .catch((err) => {
            setLoaderTime(false);
            console.log("err==>", err);
            alert("Oops! Something went wrong.");
          });
      });
    } else {
      let errorObject = {};
      Object.keys(inputs).forEach((input) => {
        let error = validator(input, inputs[input]);
        if (error !== undefined) errorObject[input] = error;
        setErrors((err) => ({
          ...err,
          [input]: error,
        }));
      });

      console.log("errorObject-------->", errorObject);
      if (
        Object.values(errorObject).filter((err) => err === false).length === 0
      ) {
        setLoaderTime(true);
        // let resp = await getDigest();
        const url =
          CONST.BASE_URL + CONST.API.LIST("Advertisement") + `(${eventId})`;
        const stringifyPostData = JSON.stringify({
          __metadata: {
            type: "SP.Data.Advertisement1ListItem",
            // type: "SP.Data.AdvertisementListItem",
          },
          Title: inputs.adTitle,
          Description: inputs.description,
          Price: inputs.price,
          Brand: inputs.brand,
          Email: inputs.email,
          // Country: inputs.country,
          // City: inputs.city,
          Category: inputs.category,
          SubCategory:
            inputs.category.toLowerCase() === "others"
              ? ""
              : inputs.subcategory,
          Phone: inputs.phone,
          Address: inputs.address,
          Author0: user.data.DisplayName,
          //AuthorImage: user.data.UserProfileProperties[18].Value.replace(':443', ''),
          AuthorImage: getMyPictureUrl(user.data.Email, "M"),
          status: "Active",
        });
        // $("#__REQUESTDIGEST").val()

        getDigest().then(async (digest) => {
          const configAxios = {
            headers: {
              accept: "application/json;odata=verbose",
              "content-type": "application/json;odata=verbose",
              "X-RequestDigest": await digest,
              "X-HTTP-Method": "POST",
              "IF-MATCH": "*",
              "X-HTTP-Method": "MERGE",
            },
          };

          axios
            .post(url, stringifyPostData, configAxios)
            .then((r) => {
              setLoaderTime(false);
              setRegisterDone(true);
              setInputs(initialValues);
              setErrors(errorObj);
            })
            .catch((err) => {
              setLoaderTime(false);
              console.log("err==>", err);
              alert("Oops! Something went wrong.");
            });
        });
      }
    }
  };

  //validation
  const validator = (name, value) => {
    switch (name) {
      case "email":
        return emailValidator(value);
      case "category":
        return dropDownValidator(value);
      case "subcategory":
        return dropDownValidator(value);
      case "adTitle":
        return textAreaValidator(value.trim());
      case "phone":
        return phoneNumberValidator(value.trim());
      case "address":
        return textAreaValidator(value.trim());
      case "price":
        return priceValidator(value.trim());
      default: // do nothing;
        break;
    }
  };

  // Input Change Handling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let error = validator(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
    setInputs((inputs) => ({
      ...inputs,
      [name]: value,
    }));
  };

  // category Handling
  const handleSubCategory = (e) => {
    let error = validator("subcategory", e);
    setErrors({
      ...errors,
      ["subcategory"]: error,
    });
    setInputs((inputs) => ({
      ...inputs,
      ["subcategory"]: e,
    }));
  };
  // category Handling
  const handleCategory = (e) => {
    let error = validator("category", e);
    setErrors({
      ...errors,
      ["category"]: error,
    });
    setInputs((inputs) => ({
      ...inputs,
      ["category"]: e,
    }));
  };

  return {
    handleSubmit,
    handleInputChange,
    handleCategory,
    handleSubCategory,
    inputs,
    errors,
    setErrors,
    setInputs,
  };
};

export default UseForm;
