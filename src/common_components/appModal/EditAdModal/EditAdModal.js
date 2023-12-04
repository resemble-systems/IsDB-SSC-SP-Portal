import { useState, useEffect, useContext } from "react";
import { Modal, Row, Col, Select, Input } from "antd";
import $ from "jquery";
import axios from "axios";
import { CheckCircleOutlined } from "@ant-design/icons";
import { CONST } from "../../../constant/index";

// Common Components
import AppRoundedBtn from "../../appRoundedBtn/AppRoundedBtn";
import InputElement from "../../formElement/Input";
import DropdownElement from "../../formElement/Dropdown";
import useForm from "../../appForm/NewAd";
import ImageUpload from "../../formElement/Imageupload";
import TextArea from "../../formElement/TextArea";

// css
import styles from "./../newAdModal/new-ad.module.sass";
import { AppContext } from "../../../App";

// onCancel Handler
function onCancelHandler(
  setVisiblety,
  setErrors,
  setInputs,
  setRegisterDone,
  fromObject,
  errorObj
) {
  setVisiblety(false);
  setInputs(fromObject);
  setErrors(errorObj);
  setRegisterDone(false);
}

export default function EditAdModal({
  isEditModal,
  setIsEditModal,
  cardData,
  citems,
  setSelectedCategory,
  //   subitems,
  selectedCategory,
  setCallApi,
  callApi,
  adCategories,
}) {
  const { TextArea } = Input;
  const [loading, setLoaderTime] = useState(false);
  const [registerDone, setRegisterDone] = useState(false);
  const [selection, setSelection] = useState(
    cardData?.status === "Active" ? "Active" : "Sold"
  );
  // const [isSold, setIsSold] = useState(false);
  // Form Initial Objects
  const fromObject = {
    category: [],
    subcategory: [],
    adTitle: "",
    brand: "",
    price: "",
    email: "",
    phone: "",
    address: "",
    description: "",
  };
  // Error Initial Object
  const errorObj = {
    email: null,
    category: null,
    adTitle: null,
    phone: null,
    address: null,
    subcategory: null,
  };
  // const [isSold, setIsSold] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [subitems, setsubitems] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [Title, setTitle] = useState(
    cardData?.Title?.length > 0 ? cardData.Title : ""
  );

  const [Description, setDescription] = useState(
    cardData?.Description?.length > 0 ? cardData.Description : ""
  );
  const [Price, setPrice] = useState(
    cardData?.Price?.length > 0 ? cardData.Price : ""
  );
  const [Brand, setBrand] = useState(cardData?.Brand);
  const [Email, setEmail] = useState(
    cardData?.Email?.length > 0 ? cardData.Email : ""
  );
  // const [Country, setCountry] = useState(
  //   cardData?.Country?.length > 0 ? cardData.Country : ""
  // );
  // const [City, setCity] = useState(
  //   cardData?.City?.length > 0 ? cardData.City : ""
  // );
  const [Category, setCategory] = useState(cardData?.Category);
  const [SubCategory, setSubCategory] = useState(cardData?.SubCategory);
  const [Phone, setPhone] = useState(
    cardData?.Phone?.length > 0 ? cardData.Phone : ""
  );
  const [Address, setAddress] = useState(
    cardData?.Address?.length > 0 ? cardData?.Address : ""
  );
  const [Author0, setAuthor0] = useState(
    cardData?.Author0?.length > 0 ? cardData.Author0 : ""
  );
  const mode = "update";
  const inputString = cardData["odata.editLink"];

  const regex = /Items\((\d+)\)/;
  const listId = inputString.match(regex)[1];
  let updatedValues;
  updatedValues = {
    Title: Title,
    Description: Description,
    Price: Price,
    Brand: Brand,
    Email: Email,
    Category: Category,
    SubCategory: Category.toLowerCase() === "others" ? "" : SubCategory,
    Phone: Phone,
    Address: Address,
    Author0: cardData.Author0,
    //AuthorImage: user.data.UserProfileProperties[18].Value.replace(':443', ''),
    AuthorImage: cardData.AuthorImage,
    status: selection,
  };
  const {
    handleSubmit,
    handleInputChange,
    handleCategory,
    handleSubCategory,
    inputs,
    errors,
    setErrors,
    setInputs,
  } = useForm(
    fromObject,
    errorObj,
    setLoaderTime,
    setRegisterDone,
    itemId,
    mode,
    listId,
    updatedValues
  );

  setSelectedCategory(inputs?.category);

  useEffect(() => {
    //advertisement sub-categories api call
    axios
      .get(
        `${CONST.BASE_URL}${CONST.API.LIST(
          "AdvertisementSubCategory"
        )}${CONST.API.QUERY("id,Title,CategoryId")}`
      )
      .then((res) => {
        setSubCategoryList(res.data.value);
      })
      .catch((err) => console.log(err));
  }, [callApi]);

  //   useEffect(() => {
  //     if (isEditModal) {
  //       const url = CONST.BASE_URL + CONST.API.LIST("Advertisement");
  //       const stringifyPostData = JSON.stringify({
  //         __metadata: {
  //           type: "SP.Data.AdvertisementListItem",
  //         },
  //         Title: "",
  //         Description: "",
  //         Price: "",
  //         Brand: "",
  //         Email: "",
  //         Country: "",
  //         City: "",
  //         Category: "",
  //         SubCategory: "",
  //         Phone: "",
  //         Address: "",
  //         Author0: "",
  //         AuthorImage: "",
  //         status: "draft",
  //       });
  //       const configAxios = {
  //         headers: {
  //           accept: "application/json;odata=verbose",
  //           "content-type": "application/json;odata=verbose",
  //           "X-RequestDigest": $("#__REQUESTDIGEST").val(),
  //           "X-HTTP-Method": "POST",
  //           "IF-MATCH": "*",
  //         },
  //       };

  //       axios
  //         .post(url, stringifyPostData, configAxios)
  //         .then((r) => {
  //           // console.log("Id===", r.data.d.Id);
  //           setItemId(r.data.d.Id);
  //         })
  //         .catch((err) => {});
  //     }
  //   }, [isEditModal]);

  // useEffect(() => {
  //   if (cardData.status === "Active") {
  //     setIsSold(false);
  //   } else {
  //     setIsSold(true);
  //   }
  // }, [isSold]);

  useEffect(() => {
    if (Category?.length > 0) {
      adCategories.forEach((data) => {
        if (data.Title === Category) {
          let selectedSubCategory = subCategoryList.filter(
            (subCategory) => subCategory.CategoryId === data.ID.toString()
          );

          selectedSubCategory = selectedSubCategory.map(
            (subCategory) => subCategory.Title
          );

          if (selectedSubCategory && selectedSubCategory.length > 0)
            setsubitems(selectedSubCategory);
          else setsubitems([]);
        }
      });
    }
  }, [Category, adCategories, subCategoryList]);

  const handleValuChange = (value, name) => {
    switch (name) {
      case "category": {
        setCategory("");
        setCategory(value);
        setSubCategory("");
        break;
      }
      case "subcategory": {
        setSubCategory("");
        setSubCategory(value);
        break;
      }
      case "adTitle": {
        setTitle("");
        setTitle(value.target.value.trim());
        break;
      }
      case "brand": {
        setBrand("");
        setBrand(value.target.value.trim());
        break;
      }
      case "price": {
        setPrice("");
        setPrice(value.target.value.trim());
        break;
      }
      // case "country": {
      //   setCountry("");
      //   setCountry(value.target.value);
      //   break;
      // }
      // case "city": {
      //   setCity("");
      //   setCity(value.target.value);
      //   break;
      // }
      case "email": {
        setEmail("");
        setEmail(value.target.value);
        break;
      }
      case "phone": {
        setPhone("");
        setPhone(value.target.value);
        break;
      }
      case "address": {
        setAddress("");
        setAddress(value.target.value.trim());
        break;
      }
      case "description": {
        setDescription("");
        setDescription(value.target.value.trim());
        break;
      }
      default:
      // Handle other cases if needed
    }
  };

  let children = [];
  const { Option } = Select;
  if (citems && citems.length > 0) {
    citems.forEach((option, i) => {
      children.push(
        <Option value={option} key={i.toString(36) + i}>
          {option}
        </Option>
      );
    });
  }
  let subitemsChild = [];
  if (subitems && subitems?.length > 0) {
    subitems.forEach((option, i) => {
      subitemsChild.push(
        <Option value={option} key={i.toString(36) + i}>
          {option}
        </Option>
      );
    });
  }

  const handleSelectionChange = (event) => {
    setSelection(event.target.value);
  };

  return (
    <Modal
      centered
      onCancel={() => {
        setIsEditModal(false);
        setInputs(fromObject);
        setErrors(errorObj);
        setRegisterDone(false);
      }}
      open={isEditModal}
      closable={false}
      footer={null}
      width={800}
      bodyStyle={{ padding: "50px", marginTop: "170px", marginBottom: "10px" }}
      wrapClassName={`${styles.event_reg_modal}`}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          {/* If registration done */}
          {registerDone && (
            <div
              className={`d-flex align-items-center justify-content-center flex-column ${styles.done_container}`}
            >
              <div>
                <CheckCircleOutlined
                  className={`${styles.registration_success} text-success mb-4`}
                />
              </div>
              <div
                className={`d-flex align-items-center justify-content-center`}
              >
                <h3 className={`${styles.reg_title}  text-success`}>
                  Thank you.
                </h3>
              </div>

              <AppRoundedBtn
                text={"Done"}
                prefix={""}
                suffix={""}
                bg={"white"}
                outline={"dark"}
                long={false}
                href={"none"}
                disabled={loading}
                btnStyle={{ width: "200px", height: "50px" }}
                onClickHandler={() => {
                  onCancelHandler(
                    setIsEditModal,
                    setErrors,
                    setInputs,
                    setRegisterDone,
                    fromObject,
                    errorObj
                  );
                  setCallApi(!callApi);
                }}
              />
            </div>
          )}
        </Col>
        {/* Loading section */}
        {loading && (
          <div span={24} className={`${styles.loader_container}`}>
            <div className={`spinner-grow ${styles.loader}`} role="status">
              <span className={`sr-only `}>Loading...</span>
            </div>
          </div>
        )}
        {/* If registration is not done */}
        {!registerDone && (
          <>
            <Col span={24}>
              <h3 className={`${styles.modal_title}`}>Update Your Ad</h3>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              {/* <DropdownElement
                label={`Category`}
                mandatory={true}
                placeholder={`Select`}
                options={citems}
                onChange={handleCategory}
                // onChange={(e) => {
                //   handleValuChange(e);
                // }}
                name="category"
                disabled={loading}
                value={cardData?.Category ? cardData.Category : inputs.category}
                error={errors.category}
              /> */}
              <Row>
                <Col span={24}>
                  <label className={`${styles.label}`}>
                    {"Category"}
                    <span className={`text-danger mx-2`}>*</span>
                  </label>
                </Col>
                <Col span={24}>
                  <div
                    // style={style}
                    className={`${styles.dropDown_container_thick_border} ${
                      Category?.length === 0 ? "border border-danger" : ""
                    }`}
                  >
                    <Select
                      style={{ width: "100%" }}
                      placeholder={"Select"}
                      onChange={(value) => {
                        handleValuChange(value, "category");
                      }}
                      value={Category}
                      name={"category"}
                      bordered={false}
                      size={`large`}
                      disabled={loading}
                    >
                      {" "}
                      <option selected value="" style={{ color: "#f0f0f0" }}>
                        Select Category
                      </option>
                      {children}
                    </Select>
                  </div>
                </Col>
              </Row>
              {Category?.length === 0 && (
                <p className={`text-danger mt-2 mb-0 pl-4`}>
                  {"Please enter Category."}
                </p>
              )}
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              {/* <DropdownElement
                label={`Sub Category`}
                mandatory={
                  typeof selectedCategory === "string"
                    ? selectedCategory.toLowerCase() === "others"
                      ? false
                      : true
                    : true
                }
                placeholder={`Select`}
                options={subitems}
                onChange={handleSubCategory}
                name="subcategory"
                disabled={
                  typeof selectedCategory === "string"
                    ? selectedCategory.toLowerCase() === "others"
                      ? true
                      : loading
                    : loading
                }
                value={inputs.subcategory}
                error={errors.subcategory}
              /> */}
              <Row>
                <Col span={24}>
                  <label className={`${styles.label}`}>
                    {"Sub Category"}
                    <span className={`text-danger mx-2`}>*</span>
                  </label>
                </Col>
                <Col span={24}>
                  <div
                    // style={style}
                    className={`${styles.dropDown_container_thick_border} ${
                      SubCategory?.length === 0 && Category !== "Others"
                        ? "border border-danger"
                        : ""
                    }`}
                  >
                    <Select
                      style={{ width: "100%" }}
                      placeholder={"Select"}
                      onChange={(value) => {
                        handleValuChange(value, "subcategory");
                      }}
                      value={SubCategory}
                      name={"subcategory"}
                      bordered={false}
                      size={`large`}
                      disabled={
                        typeof Category === "string"
                          ? Category.toLowerCase() === "others"
                            ? true
                            : loading
                          : loading
                      }
                    >
                      <option selected value="">
                        Select SubCategory
                      </option>
                      {subitemsChild}
                    </Select>
                  </div>
                </Col>
              </Row>
              {SubCategory?.length === 0 && Category !== "Others" && (
                <p className={`text-danger mt-2 mb-0 pl-4`}>
                  {"Please enter Subcategory."}
                </p>
              )}
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              {/* <InputElement
                label={`Ad Title`}
                mandatory={true}
                placeholder={`Enter Ad Title`}
                name="adTitle"
                disabled={loading}
                onChange={handleInputChange}
                value={inputs.adTitle}
                error={errors.adTitle}
              /> */}
              <Row>
                <Col span={24}>
                  <label className={`${styles.label}`}>
                    {"Ad Title"}
                    {<span className={`text-danger mx-2`}>*</span>}
                  </label>
                </Col>
                <Col span={24}>
                  <div className={`${styles.input_container} `}>
                    <Input
                      placeholder={"Enter Ad Title"}
                      bordered={false}
                      name={"adTitle"}
                      value={Title}
                      onChange={(value) => {
                        handleValuChange(value, "adTitle");
                      }}
                      size={`large`}
                      disabled={loading}
                      className={`${styles.input}`}
                    />
                  </div>
                </Col>
              </Row>
              {Title?.length === 0 && (
                <p className={`text-danger mt-2 mb-0 pl-4`}>
                  {"Please enter a title."}
                </p>
              )}
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              {/* <InputElement
                label={`Brand`}
                mandatory={false}
                placeholder={`Enter Brand`}
                name="brand"
                disabled={loading}
                onChange={handleInputChange}
                value={inputs.brand}
                error={null}
              /> */}
              <Row>
                <Col span={24}>
                  <label className={`${styles.label}`}>
                    {"Brand"}
                    {/* {<span className={`text-danger mx-2`}>*</span>} */}
                  </label>
                </Col>
                <Col span={24}>
                  <div className={`${styles.input_container} `}>
                    <Input
                      placeholder={"Enter Brand"}
                      bordered={false}
                      name={"brand"}
                      value={Brand}
                      onChange={(value) => {
                        handleValuChange(value, "brand");
                      }}
                      size={`large`}
                      disabled={loading}
                      className={`${styles.input}`}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              {/* <InputElement
                label={`Expected Price`}
                mandatory={false}
                placeholder={`Enter Price`}
                name="price"
                disabled={loading}
                onChange={handleInputChange}
                value={inputs.price}
                error={null}
              /> */}
              <Row>
                <Col span={24}>
                  <label className={`${styles.label}`}>
                    {"Expected Price (SAR)"}
                    {<span className={`text-danger mx-2`}>*</span>}
                  </label>
                </Col>
                <Col span={24}>
                  <div className={`${styles.input_container} `}>
                    <Input
                      placeholder={"Enter Price"}
                      bordered={false}
                      name={"price"}
                      value={Price}
                      onChange={(value) => {
                        handleValuChange(value, "price");
                      }}
                      size={`large`}
                      disabled={loading}
                      className={`${styles.input}`}
                    />
                  </div>
                  {Price.length === 0 ||
                    (!/^[0-9]+(\.[0-9]{1,2})?$/.test(Price) && (
                      <p className={`text-danger mt-2 mb-0 pl-4`}>
                        {"Enter the Expected Price"}
                      </p>
                    ))}
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              {/* <InputElement
                label={`Country`}
                mandatory={false}
                placeholder={`Enter Country`}
                onChange={handleInputChange}
                name="country"
                disabled={loading}
                value={inputs.country}
                error={null}
              /> */}
              {/* <Row>
                <Col span={24}>
                  <label className={`${styles.label}`}>
                    {"Country"}

                  </label>
                </Col>
                <Col span={24}>
                  <div className={`${styles.input_container} `}>
                    <Input
                      placeholder={"Enter Country"}
                      bordered={false}
                      name={"country"}
                      value={Country}
                      onChange={(value) => {
                        handleValuChange(value, "country");
                      }}
                      size={`large`}
                      disabled={loading}
                      className={`${styles.input}`}
                    />
                  </div>
                </Col>
              </Row> */}
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              {/* <InputElement
                label={`City`}
                mandatory={false}
                placeholder={`Enter City`}
                name="city"
                disabled={loading}
                onChange={handleInputChange}
                value={inputs.city}
                error={null}
              /> */}
              {/* <Row>
                <Col span={24}>
                  <label className={`${styles.label}`}>{"City"}</label>
                </Col>
                <Col span={24}>
                  <div className={`${styles.input_container} `}>
                    <Input
                      placeholder={"Enter City"}
                      bordered={false}
                      name={"city"}
                      value={City}
                      onChange={(value) => {
                        handleValuChange(value, "city");
                      }}
                      size={`large`}
                      disabled={loading}
                      className={`${styles.input}`}
                    />
                  </div>
                </Col>
              </Row> */}
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              {/* <InputElement
                label={`Email Address`}
                mandatory={true}
                placeholder={`Enter Email Address`}
                name="email"
                disabled={loading}
                onChange={handleInputChange}
                value={inputs.email}
                error={errors.email}
              /> */}
              <Row>
                <Col span={24}>
                  <label className={`${styles.label}`}>
                    {"Email"}
                    {<span className={`text-danger mx-2`}>*</span>}
                  </label>
                </Col>
                <Col span={24}>
                  <div className={`${styles.input_container} `}>
                    <Input
                      placeholder={"Enter Price"}
                      bordered={false}
                      name={"email"}
                      value={Email}
                      onChange={(value) => {
                        handleValuChange(value, "email");
                      }}
                      size={`large`}
                      disabled={loading}
                      className={`${styles.input}`}
                    />
                  </div>
                </Col>
              </Row>
              {!Email.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              ) && (
                <p className={`text-danger mt-2 mb-0 pl-4`}>
                  {"Please enter a valid email."}
                </p>
              )}
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              {/* <InputElement
                label={`Phone Number`}
                mandatory={false}
                placeholder={`Enter Phone Number`}
                name="phone"
                disabled={loading}
                onChange={handleInputChange}
                value={inputs.phone}
                error={errors.phone}
              /> */}
              <Row>
                <Col span={24}>
                  <label className={`${styles.label}`}>
                    {"Phone Number"}
                    {/* {<span className={`text-danger mx-2`}>*</span>} */}
                  </label>
                </Col>
                <Col span={24}>
                  <div className={`${styles.input_container} `}>
                    <Input
                      placeholder={"Enter Phone Number"}
                      bordered={false}
                      name={"phone"}
                      value={Phone}
                      onChange={(value) => {
                        handleValuChange(value, "phone");
                      }}
                      size={`large`}
                      disabled={loading}
                      className={`${styles.input}`}
                    />
                  </div>
                </Col>
              </Row>
              {Phone?.length === 0 && (
                <p className={`text-danger mt-2 mb-0 pl-4`}>
                  {
                    "Enter a valid phone number or try adding your country code."
                  }
                </p>
              )}
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              {/* <TextArea
                label={`Address`}
                mandatory={true}
                placeholder={`Enter Address`}
                name="address"
                disabled={loading}
                // onChange={handleInputChange}

                value={inputs.description}
                error={errors.address}
              /> */}
              <Row>
                <Col span={24}>
                  <label className={`${styles.label}`}>
                    {"Address"}
                    {<span className={`text-danger mx-2`}>*</span>}
                  </label>
                </Col>
                <Col span={24}>
                  <div
                    className={`${styles.text_container} ${
                      Address?.length === 0 ? "border border-danger" : ""
                    }`}
                  >
                    <TextArea
                      placeholder={"Enter Address"}
                      bordered={false}
                      name={"address"}
                      value={Address}
                      onChange={(value) => {
                        handleValuChange(value, "address");
                      }}
                      size={`large`}
                      disabled={loading}
                      className={`${styles.input}`}
                      rows={3}
                    />
                  </div>
                </Col>
              </Row>
              {Address?.length === 0 && (
                <p className={`text-danger mt-2 mb-0 pl-4`}>
                  {"Enter Address."}
                </p>
              )}
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              {/* <TextArea
                label={`Description`}
                mandatory={false}
                placeholder={`Enter Description`}
                name="description"
                disabled={loading}
                onChange={handleInputChange}
                
                value={inputs.description}

                error={null}
              /> */}
              <Row>
                <Col span={24}>
                  <label className={`${styles.label}`}>{"Description"}</label>
                </Col>
                <Col span={24}>
                  <div className={`${styles.text_container}`}>
                    <TextArea
                      placeholder={"Enter Description"}
                      bordered={false}
                      name={"description"}
                      value={Description}
                      onChange={(value) => {
                        handleValuChange(value, "description");
                      }}
                      size={`large`}
                      disabled={loading}
                      className={`${styles.input}`}
                      rows={3}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <ImageUpload
                itemId={listId}
                listName={"Advertisement"}
                setLoaderTime={setLoaderTime}
                uploadedPic={cardData?.AttachmentFiles}
              />
            </Col>
            {/* For large screen */}
            <Col xs={0} sm={0} md={24} lg={24} xl={24}>
              <div className={`d-flex justify-content-end `}>
                <div
                  className="d-flex align-items-center mt-2"
                  style={{ fontWeight: "500" }}
                >
                  {/* <p>Selected option: {selection}</p> */}
                  <div>
                    <label
                      className={`${
                        selection === "Active" ? "text-primary" : ""
                      }`}
                    >
                      <input
                        className="mx-2"
                        type="radio"
                        name="selection"
                        value="Active"
                        checked={selection === "Active"}
                        onChange={handleSelectionChange}
                      />
                      Active
                    </label>
                  </div>
                  <div>
                    <label
                      className={`${
                        selection === "Sold" ? "text-primary" : ""
                      }`}
                    >
                      <input
                        className="mx-2"
                        type="radio"
                        name="selection"
                        value="Sold"
                        checked={selection === "Sold"}
                        onChange={handleSelectionChange}
                      />
                      Sold
                    </label>
                  </div>
                </div>
                <div className={`mx-3`}>
                  <AppRoundedBtn
                    text={"Cancel"}
                    prefix={""}
                    suffix={""}
                    bg={"white"}
                    outline={"dark"}
                    long={true}
                    href={"none"}
                    disabled={loading}
                    btnStyle={{ width: "235px", height: "60px" }}
                    onClickHandler={() => {
                      onCancelHandler(
                        setIsEditModal,
                        setErrors,
                        setInputs,
                        setRegisterDone,
                        fromObject,
                        errorObj
                      );
                    }}
                  />
                </div>
                <div className={`mx-3`}>
                  <AppRoundedBtn
                    text={"Update Ad"}
                    prefix={""}
                    suffix={""}
                    bg={"blue"}
                    outline={"dark"}
                    long={true}
                    href={"none"}
                    disabled={loading}
                    btnStyle={{ width: "235px", height: "60px" }}
                    onClickHandler={() => {
                      if (
                        Address?.length > 0 &&
                        Email.match(
                          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        ) &&
                        Category?.length > 0 &&
                        ((SubCategory?.length > 0 && Category !== "Others") ||
                          (SubCategory.length === 0 &&
                            Category === "Others")) &&
                        Title?.length > 0 &&
                        Price?.length > 0 &&
                        /^[0-9]+(\.[0-9]{1,2})?$/.test(Price)
                      ) {
                        setIsEditModal(true);
                        handleSubmit();
                      }
                    }}
                  />
                </div>
              </div>
            </Col>
            {/* For small screen */}
            <Col xs={24} sm={24} md={0} lg={0} xl={0}>
              <div className={`d-flex justify-content-center`}>
                {/* <div className={`d-flex justify-content-center p-2`}>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setIsSold(!isSold);
                    }}
                  >
                    {isSold === false ? "Active" : "Sold"}
                  </button>
                </div> */}
                <div>{"checkbox"}</div>
                <div className={`mx-3`}>
                  <AppRoundedBtn
                    text={"Cancel"}
                    prefix={""}
                    suffix={""}
                    bg={"white"}
                    outline={"dark"}
                    long={true}
                    href={"none"}
                    disabled={loading}
                    btnStyle={{ width: "235px", height: "60px" }}
                    onClickHandler={() =>
                      onCancelHandler(
                        setIsEditModal,
                        setErrors,
                        setInputs,
                        setRegisterDone,
                        fromObject,
                        errorObj
                      )
                    }
                  />
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={0} lg={0} xl={0}>
              <div className={`d-flex justify-content-center mt-3`}>
                <div className={`mx-3`}>
                  <AppRoundedBtn
                    text={"Update Ad"}
                    prefix={""}
                    suffix={""}
                    bg={"blue"}
                    outline={"dark"}
                    long={true}
                    href={"none"}
                    disabled={loading}
                    btnStyle={{ width: "235px", height: "60px" }}
                    onClickHandler={() => {
                      if (
                        Address?.length > 0 &&
                        Email?.match(
                          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        ) &&
                        Category?.length > 0 &&
                        SubCategory?.length > 0 &&
                        Title?.length > 0 &&
                        Price?.length > 0 &&
                        /^[0-9]+(\.[0-9]{1,2})?$/.test(Price)
                      ) {
                        setIsEditModal(true);
                        handleSubmit();
                      }
                    }}
                  />
                </div>
              </div>
            </Col>
          </>
        )}
      </Row>
    </Modal>
  );
}
