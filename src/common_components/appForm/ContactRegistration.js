import { useState } from "react";
import axios from "axios";
import $ from "jquery";
import { CONST } from "../../constant/index";
import getDigest from "../../services/GetDigest/GetDigest";

// Validator
import {
  emailValidator,
  firstNameValidator,
  textAreaValidator,
  phoneNumberValidator,
} from "../../services/validationService";
import { VAR } from "../../env";

export default function UseContactForm(
  fromObject,
  errorObj,
  setLoaderTime,
  setRegisterDone
) {
  //State Setting
  const [inputs, setInputs] = useState(fromObject);
  const [errors, setErrors] = useState(errorObj);
  // Submit Handling
  const handleSubmit = async (inputs) => {
    let errorObject = {};
    Object.keys(inputs).forEach((input) => {
      let error = validator(input, inputs[input]);
      if (error !== undefined) errorObject[input] = error;
      setErrors((err) => ({
        ...err,
        [input]: error,
      }));
    });

    if (
      Object.values(errorObject).filter((err) => err === false).length === 0
    ) {
      // let resp = await getDigest();
      setLoaderTime(true);

      const url = CONST.BASE_URL + CONST.API.LIST("Contact");
      const stringifyPostData = JSON.stringify({
        __metadata: {
          type: "SP.Data.ContactListItem",
        },
        Title: inputs.firstName,
        LastName: inputs.lastName,
        Email: inputs.email,
        Phone: inputs.phoneNumber,
        Message: inputs.textarea,
      });

      getDigest().then((digest) => {
        const configAxios = {
          headers: {
            accept: "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": digest,
            "X-HTTP-Method": "POST",
            "IF-MATCH": "*",
            // "X-HTTP-Method": "MERGE",
          },
        };

        axios
          .post(url, stringifyPostData, configAxios)
          .then((r) => {
            setLoaderTime(false);

            setRegisterDone(true);
            setInputs(fromObject);
            setErrors(errorObj);
          })
          .catch((err) => {
            setLoaderTime(false);
            console.log("err==>", err);
            alert("Oops! Something went wrong.");
          });
      });
    }

    // setTimeout(() => {
    //   setLoaderTime(false);
    // }, 3000);
  };

  // const handleSubmit = async (inputs) => {
  //   let errorObject = {};
  //   Object.keys(inputs).forEach((input) => {
  //     let error = validator(input, inputs[input]);
  //     if (error !== undefined) errorObject[input] = error;
  //     setErrors((err) => ({
  //       ...err,
  //       [input]: error,
  //     }));
  //   });
  //   console.log("errorObject-------->", errorObject);

  //   if (
  //     Object.values(errorObject).filter((err) => err === false).length === 0
  //   ) {
  //     setLoaderTime(true);

  //     const url = `${CONST.BASE_URL}/_api/web/lists/getbytitle('Contact')/items`; // Update with your list name

  //     // Prepare the data for updating the list item
  //     const updateData = {
  //       Title: inputs.firstName,
  //       LastName: inputs.lastName,
  //       Email: inputs.email,
  //       Phone: inputs.phoneNumber,
  //       Message: inputs.textarea,
  //     };

  //     // Make a GET request to retrieve the list item you want to update
  //     const getItemResponse = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json;odata=verbose",
  //       },
  //     });

  //     if (getItemResponse.ok) {
  //       const items = await getItemResponse.json();

  //       if (items.d.results.length > 0) {
  //         const itemId = items.d.results[0].Id; // Assuming you want to update the first item found

  //         const updateUrl = `${url}(${itemId})`;

  //         // Make a PATCH request to update the list item
  //         const updateResponse = await fetch(updateUrl, {
  //           method: "POST", // Use "MERGE" for partial updates
  //           headers: {
  //             "Content-Type": "application/json;odata=verbose",
  //             "X-RequestDigest": await GetDigest(),
  //             "If-Match": "*",
  //             "X-HTTP-Method": "POST",
  //           },
  //           body: JSON.stringify(updateData),
  //         });

  //         if (updateResponse.ok) {
  //           setLoaderTime(false);
  //           console.log("Success");
  //           setRegisterDone(true);
  //           setInputs(fromObject);
  //           setErrors(errorObject);
  //         } else {
  //           setLoaderTime(false);
  //           console.log("Error updating item");
  //           alert("Oops! Something went wrong.");
  //         }
  //       } else {
  //         setLoaderTime(false);
  //         console.log("Item not found");
  //         alert("Item not found.");
  //       }
  //     } else {
  //       setLoaderTime(false);
  //       console.log("Error fetching item");
  //       alert("Oops! Something went wrong.");
  //     }
  //   }
  // };

  // The GetDigest function remains the same as in your original code
  const GetDigest = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json; odata=verbose",
      },
    };

    const response = await fetch(
      `${VAR.REACT_APP_BUILD_URL}/_api/contextinfo`,
      requestOptions
    );
    const data = await response.json();
    return data.d.GetContextWebInformation.FormDigestValue;
  };

  // Validator Function
  const validator = (name, value) => {
    switch (name) {
      case "firstName":
        return firstNameValidator(value);
      case "email":
        return emailValidator(value);
      case "textarea":
        return textAreaValidator(value);
      case "phoneNumber":
        return phoneNumberValidator(value);
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

  return {
    handleSubmit,
    handleInputChange,
    inputs,
    errors,
    setErrors,
    setInputs,
  };
}
