import React, { useEffect, useState } from "react";
import { Button, Col, Row, Skeleton } from "antd";

import axios from "axios";
import { CONST } from "../../constant/index";
import styles from "./index.module.sass";
import Scrollbars from "react-custom-scrollbars";

export default function OtherInitiativesComp() {
  const [OtherInitiativesData, setOtherInitiativesData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${CONST.BASE_URL}${CONST.API.LIST(
          "OtherInitiatives"
        )}${CONST.API.QUERY("Title,Description,Priority,AttachmentFiles")} ${
          CONST.API.ATTACHMENT
        }`
      )
      .then((res) => {
        let sortedOfferData = res.data.value.sort(function (x, y) {
          return x.Priority - y.Priority;
        });
        setOtherInitiativesData(sortedOfferData);
        // console.log("Offer Data", res.data.value);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Row className={`container h-100 `}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <div className={`${styles.offers_container}`}>
            <div
            // className={`d-flex justify-content-center align-items-center flex-column`}
            >
              {OtherInitiativesData && OtherInitiativesData?.length > 0 ? (
                OtherInitiativesData?.map((data, index) => (
                  <>
                    <h3 className={`${styles.event_details_title} mb-2  `}>
                      {data?.Title && data?.Title}
                    </h3>
                    {data?.Description && (
                      <p className={`${styles.event_details_des} pr-4`}>
                        <Scrollbars style={{ height: "120px" }}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: data?.Description?.replace(/\n/g, "<br>"),
                            }}
                          />
                        </Scrollbars>
                      </p>
                    )}
                    <div
                      className={`mb-4 d-flex justify-content-center align-items-center`}
                      key={index}
                    >
                      <img
                        src={data?.AttachmentFiles[0]?.ServerRelativeUrl}
                        alt={"Reward Application Demo"}
                        className={`${styles.image}`}
                      />
                    </div>
                    {/* <div className="d-flex justify-content-center align-items-center mb-4">
                      <Button
                        shape="round"
                        size={"large"}
                        className={`${styles.text_button}`}
                        onClick={() => window.open(data.OfferLink)}
                      >
                        {"Click Here"}
                      </Button>
                    </div> */}
                  </>
                ))
              ) : (
                <Skeleton.Input style={{ width: 1000, height: 400 }} active />
              )}
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
