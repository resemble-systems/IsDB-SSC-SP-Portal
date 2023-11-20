import React, { useContext } from "react";
import { Row, Col, Menu, Empty, Pagination, Select } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { PlusSquareOutlined } from "@ant-design/icons";

import AppRoundedBtn from "../../../common_components/appRoundedBtn/AppRoundedBtn";

import BuySellCard from "../buySellCard/BuySellCard";
import NewAdModal from "../../../common_components/appModal/newAdModal/NewAdModal";
import { CONST } from "../../../constant/index";
//css
import styles from "./buysell-section.module.sass";
import filterimg from "../../../assets/eventsActivities/filter.svg";
import { AppContext } from "../../../App";
import GalleryFooter from "../../gallery/gallertBannerPage/galleryLayout/galleryFooter/GalleryFooter";

const { SubMenu } = Menu;
const { Option } = Select;

let ddmenu;
function setDDMenu(setSubMenu, adCategories, subCategoryList) {
  ddmenu = (
    <Menu>
      <Menu.Item>
        <a
          className={`${styles.dropDownList} py-3`}
          onClick={() => setSubMenu("All")}
        >
          All
        </a>
      </Menu.Item>
      {adCategories &&
        subCategoryList &&
        adCategories.length > 0 &&
        subCategoryList.length > 0 &&
        adCategories.map((data) => (
          <>
            <Menu.Divider />
            <SubMenu
              title={data.Title}
              className={`${styles.dropDownList} py-3`}
            >
              {subCategoryList
                .filter((subData) => subData.CategoryId === data.ID.toString())
                .map((finalData) => (
                  <>
                    <Menu.Item>
                      <a
                        className={`${styles.dropDownList} py-3`}
                        onClick={() => setSubMenu(finalData.Title)}
                      >
                        {finalData.Title}
                      </a>
                    </Menu.Item>
                    <Menu.Divider />
                  </>
                ))}
            </SubMenu>
          </>
        ))}
      <Menu.Divider />
      <Menu.Item>
        <a
          className={`${styles.dropDownList} py-3`}
          onClick={() => setSubMenu("Others")}
        >
          Others
        </a>
      </Menu.Item>
    </Menu>
  );
}

export default function BuysellSection() {
  const { user } = useContext(AppContext);
  const [paginatedListData, setPaginatedListData] = useState([]);
  const [subMenu, setSubMenu] = useState("All");
  const [newAdModal, setNewAdModal] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [adCategories, setAdCategories] = useState([]);

  const [cItems, setCitems] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);

  const [subitems, setsubitems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cardsData, setcardsData] = useState(null);
  const [callApi, setCallApi] = useState(null);
  const [yourAds, setYourAds] = useState(false);
  const [changeColor, setChangeColor] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [total, setTotal] = useState(filterData?.length);
  const [listSize, setListSize] = useState(9);

  useEffect(() => {
    if (filterData && filterData?.length > 0) {
      setTotal(filterData?.length);
    }
  }, [total, filterData]);

  useEffect(() => {
    //advertisement api call

    axios
      .get(
        `${CONST.BASE_URL}${CONST.API.LIST("Advertisement")}${CONST.API.QUERY(
          "Title,Description,Address,Author0,Created,AuthorImage,Price,Brand,Email,Category,SubCategory,Phone,AttachmentFiles,Modified,status&$orderby=ID desc"
        )} ${CONST.API.ATTACHMENT} `
      )

      .then((res) => {
        setcardsData(res.data.value);
      })
      .catch((err) => console.log(err));

    //advertisement categories api call
    axios
      .get(
        `${CONST.BASE_URL}${CONST.API.LIST(
          "AdvertisementCategory"
        )}${CONST.API.QUERY("id,Title")}`
      )
      .then((res) => {
        let categoriesList = res.data.value.map((data) => data.Title);
        categoriesList.push("Others");
        setCitems(categoriesList);
        setAdCategories(res.data.value);
      })
      .catch((err) => console.log(err));

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

  useEffect(() => {
    adCategories.forEach((data) => {
      if (data.Title === selectedCategory) {
        let selectedSubCategory = subCategoryList?.filter(
          (subCategory) => subCategory?.CategoryId === data.ID.toString()
        );
        selectedSubCategory = selectedSubCategory?.map(
          (subCategory) => subCategory?.Title
        );
        if (selectedSubCategory && selectedSubCategory?.length > 0)
          setsubitems(selectedSubCategory);
        else setsubitems([]);
      }
    });
  }, [selectedCategory]);

  useEffect(() => {
    if (yourAds === false) {
      if (subMenu.toLowerCase() === "all") {
        setFilterData(cardsData?.filter((data) => data?.status === "Active"));
      } else if (subMenu.toLowerCase() === "others") {
        let filteredData = cardsData?.filter(
          (data) =>
            data.Category?.toLowerCase() === subMenu?.toLowerCase() &&
            data.status === "Active"
        );
        setFilterData(filteredData);
      } else {
        let filteredData = cardsData?.filter(
          (data) =>
            data.SubCategory &&
            data.SubCategory?.toLowerCase() === subMenu?.toLowerCase() &&
            data.status === "Active"
        );
        setFilterData(filteredData);
      }
      setDDMenu(setSubMenu, adCategories, subCategoryList);
    }
  }, [subMenu, cardsData, adCategories, subCategoryList, yourAds]);

  useEffect(() => {
    if (yourAds === true /* && user && user?.length > 0 */) {
      if (subMenu?.toLowerCase() === "all") {
        let filterAll = cardsData?.filter(
          (data) =>
            data.Author0 === user?.data?.DisplayName &&
            (data?.status === "Active" || data?.status === "Sold")
        );
        setFilterData(filterAll);
      } else if (subMenu?.toLowerCase() === "others") {
        let filteredData = cardsData?.filter(
          (data) =>
            data.Category?.toLowerCase() === subMenu?.toLowerCase() &&
            data.Author0 === user?.data?.DisplayName &&
            (data?.status === "Active" || data?.status === "Sold")
        );
        setFilterData(filteredData);
      } else {
        let filteredData = cardsData?.filter(
          (data) =>
            data.SubCategory &&
            data.SubCategory?.toLowerCase() === subMenu?.toLowerCase() &&
            data.Author0 === user?.data?.DisplayName &&
            (data?.status === "Active" || data?.status === "Sold")
        );
        setFilterData(filteredData);
      }
      setDDMenu(setSubMenu, adCategories, subCategoryList);
    }
  }, [yourAds, subMenu, user]);

  useEffect(() => {
    if (filterData && filterData?.length > 0)
      setPaginatedListData(paginationService(filterData, listSize, pageNumber));
  }, [listSize, pageNumber, filterData]);

  function onSizeChange(value /* setListSize */ /* setPageNumber */) {
    setPageNumber(1);
    setListSize(parseInt(value));
  }

  function paginationService(filterData, listSize, pageNumber) {
    return filterData?.slice(
      (pageNumber - 1) * listSize,
      listSize * pageNumber
    );
  }

  return (
    <>
      <div className={`${styles.buysellsetion_section_bg}`}>
        <div className={`${styles.buysellsetion_section_container}`}>
          <Row className={"mb-4"}>
            <Col xs={24} sm={24} md={16} lg={18} xl={18} className={"mb-4"}>
              <div className="d-flex">
                <h3
                  className={`${styles.buysellsection_section_tilte} mb-0 d-flex h-100 align-items-center`}
                >
                  All Items for Sale ({subMenu})
                </h3>
                <div
                  className={`d-flex h-100 mx-2 mt-1 align-items-center justify-content-between`}
                >
                  <AppRoundedBtn
                    text={yourAds === false ? "View My Ads" : "Show All"}
                    prefix={""}
                    suffix={""}
                    bg={"white"}
                    outline={"dark"}
                    long={false}
                    href={"none"}
                    onClickHandler={() => {
                      setYourAds(!yourAds);
                      setChangeColor(!changeColor);
                    }}
                    changeColor={""}
                    // dropDown={true}
                    // dropDownData={ddmenu}
                  />
                </div>
              </div>
            </Col>
            <Col xs={16} sm={16} md={8} lg={6} xl={6}>
              <div
                className={`d-flex h-100 align-items-center w-75 justify-content-between`}
              >
                <AppRoundedBtn
                  text={"Sell"}
                  prefix={
                    <PlusSquareOutlined
                      className={`d-flex align-items-center mx-2`}
                    />
                  }
                  suffix={""}
                  bg={"yellow"}
                  outline={"none"}
                  long={false}
                  href={"none"}
                  onClickHandler={(e) => {
                    setNewAdModal(true);
                    // setEventId(1);
                  }}
                />
                <AppRoundedBtn
                  text={" "}
                  prefix={
                    <img
                      src={filterimg}
                      alt={"fliter-icon"}
                      width={20}
                      height={20}
                    />
                  }
                  suffix={""}
                  bg={"blue"}
                  outline={"dark"}
                  long={false}
                  href={"none"}
                  onClickHandler={() => {}}
                  dropDown={true}
                  dropDownData={ddmenu}
                />
              </div>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            {paginatedListData && paginatedListData?.length > 0 ? (
              paginatedListData?.map((data, index) => {
                return (
                  <Col
                    xs={24}
                    sm={24}
                    md={12}
                    lg={8}
                    xl={8}
                    className={"pb-3"}
                    key={index}
                  >
                    <BuySellCard
                      cardData={data}
                      citems={cItems}
                      setSelectedCategory={setSelectedCategory}
                      subitems={subitems}
                      selectedCategory={selectedCategory}
                      setCallApi={setCallApi}
                      callApi={callApi}
                      adCategories={adCategories}
                      user={user?.data?.DisplayName}
                    />
                  </Col>
                );
              })
            ) : (
              <Col span={24}>
                <div
                  className={`${styles.no_data_height} d-flex justify-content-center align-items-center`}
                >
                  <Empty className={`mb-4`} />
                </div>
              </Col>
            )}
          </Row>
          {/* <div className={`d-flex justify-content-between`}>
            <div
              className={`${styles.list_size_container} d-flex align-items-center`}
            >
              Showing{" "}
              <div
                className={`${styles.list_size} d-flex align-items-center mx-2`}
              >
                <Select
                  style={{ width: "60px" }}
                  bordered={false}
                  defaultValue={10}
                  onChange={(value) =>
                    onSizeChange(value)
                  }
                >
                  <Option value="5">5</Option>
                  <Option value="10">10</Option>
                  <Option value="15">15</Option>
                  <Option value="20">20</Option>
                </Select>
              </div>{" "}
              of {total} Entries
            </div>
            <div>
              <Pagination
                className={`${styles.pagination}`}
                onChange={(pageNumber) => {
                  console.log("page", pageNumber);
                  setPageNumber(pageNumber);
                }}
                total={total}
                hideOnSinglePage={true}
                pageSize={listSize}
                current={pageNumber}
              />
            </div>
          </div> */}

          <GalleryFooter
            listData={filterData}
            listSize={listSize}
            pageNumber={pageNumber}
            setListSize={setListSize}
            setPageNumber={setPageNumber}
            entryOptions={[9, 18, 27, 36]}
            defaultValue={9}
          />

          <div className="text-danger" style={{ fontWeight: "800" }}>
            {
              "IsDB Group and SSC assume no responsibility or liability whatsoever for any negotiation(s), dealing(s) and/or transaction(s) between the Staff members initiated through this Buy & Sell App, for further informaion please contact us: SSC@isdb.org"
            }
          </div>
        </div>
      </div>
      {newAdModal && (
        <NewAdModal
          setVisiblety={setNewAdModal}
          visible={newAdModal}
          citems={cItems}
          setSelectedCategory={setSelectedCategory}
          subitems={subitems}
          selectedCategory={selectedCategory}
          setCallApi={setCallApi}
          callApi={callApi}
        />
      )}
    </>
  );
}
