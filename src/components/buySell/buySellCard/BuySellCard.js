import { Row, Col, Button } from "antd";
import ViewAdModal from "../../../common_components/appModal/viewAdModal/ViewAdModal";
import { useState } from "react";
import noimg from "../../../assets/buySell/No_Image_Available.jpg";
//css
import styles from "./buy-sell.module.sass";
//Library
import moment from "moment";
import NewAdModal from "../../../common_components/appModal/newAdModal/NewAdModal";
import EditAdModal from "../../../common_components/appModal/EditAdModal/EditAdModal";

export default function BuySellCard({
  cardData,
  setSelectedCategory,
  subitems,
  selectedCategory,
  callApi,
  setCallApi,
  citems,
  adCategories,
  user,
}) {
  //process.env.BASE_URL +
  const [viewAdModal, setViewAdModal] = useState(false);
  const [eventId, setEventId] = useState("");
  const [isEditModal, setIsEditModal] = useState(false);

  return (
    <>
      <div className={`${styles.buysell_card} my-2`}>
        <div
          className={`${styles.buysell_mainImgConatiner} d-flex justify-content-center align-items-center overflow-hidden`}
        >
          {cardData &&
          cardData.AttachmentFiles.length > 0 &&
          cardData.AttachmentFiles[0].ServerRelativeUrl ? (
            <img
              src={cardData.AttachmentFiles[0].ServerRelativeUrl}
              alt="card-img"
              // height="100%"
              width="100%"
            />
          ) : (
            <img src={noimg} alt="card-img" height="100%" width="280px" />
          )}
        </div>
        <div className={"pl-3 pr-3"}>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div className={`${styles.buysell_text} p-2`}>
                {cardData.Title}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div
                className={`${styles.buysell_card_text} pl-2 pr-2 pt-2 pb-1`}
              >
                {cardData.Description}
              </div>
            </Col>
          </Row>
          <Row className={"pr-2 pl-2 "}>
            <Col
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              className={`${styles.buysell_PriceText}`}
            >
              {"Price"}
            </Col>
            <Col
              xs={19}
              sm={19}
              md={19}
              lg={19}
              xl={19}
              className={`${styles.buysell_price} pl-2`}
            >
              {cardData.Price ? cardData.Price : "N/A"}
            </Col>
          </Row>
          <Row className={"pr-2 pl-2 "}>
            <Col
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              className={`${styles.buysell_PriceText}`}
            >
              {"Modified"}
            </Col>
            <Col
              xs={19}
              sm={19}
              md={19}
              lg={19}
              xl={19}
              className={`${styles.buysell_price} pl-2`}
            >
              {moment(cardData.Modified).format("D MMM YYYY")}
            </Col>
          </Row>
          {/* <Row className={"pr-2 pl-2 p-1"}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div className={`${styles.buysell_PriceText}`}>
                Modified{" "}
                <span className={`${styles.buysell_price}`}>
                  {moment(cardData.Modified).format("D MMM YYYY")}
                </span>
              </div>
            </Col>
          </Row> */}
          <Row className={"pr-2 pl-2 p-1"}>
            <Col
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              className={`${styles.buysell_card_bottomimage_container}`}
            >
              {cardData && cardData.AuthorImage && (
                <img
                  src={cardData.AuthorImage}
                  alt="card-img"
                  layout={`fill`}
                  className={`${styles.buysell_card_bottomimage_round}`}
                />
              )}
            </Col>
            <Col xs={14} sm={14} md={14} lg={14} xl={14}>
              <Row>
                <Col className={`${styles.buysell_card_username}`}>
                  {cardData.Author0}
                </Col>
              </Row>
              <Row>
                <Col className={`${styles.buysell_card_date}`}>
                  {moment(cardData.Created).format("D MMM YYYY")}
                </Col>
              </Row>
            </Col>
            <Col xs={5} sm={5} md={5} lg={5} xl={5}>
              <div className="d-flex">
                <Button
                  onClick={(e) => {
                    setViewAdModal(true);
                  }}
                  className={`${styles.buysell_linkBtn} mx-1`}
                  icon={
                    <i
                      className={`fa fa-external-link `}
                      aria-hidden="true"
                    ></i>
                  }
                ></Button>
                {cardData?.Author0 === user && (
                  <Button
                    onClick={(e) => {
                      setIsEditModal(true); // Make sure it's correctly defined and obtained from useState.
                    }}
                    className={`${styles.buysell_linkBtn} `}
                    icon={<i className={`fa fa-pencil`} aria-hidden="true"></i>}
                  ></Button>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <ViewAdModal
        setVisiblety={setViewAdModal}
        visible={viewAdModal}
        eventId={eventId}
        cardData={cardData}
      />
      {isEditModal && (
        <EditAdModal
          isEditModal={isEditModal}
          setIsEditModal={setIsEditModal}
          setSelectedCategory={setSelectedCategory}
          subitems={subitems}
          selectedCategory={selectedCategory}
          callApi={callApi}
          setCallApi={setCallApi}
          citems={citems}
          cardData={cardData}
          adCategories={adCategories}
        />
      )}
    </>
  );
}
