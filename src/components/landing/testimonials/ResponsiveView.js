import { Row, Col, Skeleton } from "antd";
import quote from "../../../assets/context/testimonialsDoubleQuote.svg";
// css
import styles from "./testimonials.module.sass";
import Scrollbars from "react-custom-scrollbars";

export default function ResponsiveView({ view, testimonialsData }) {
  return (
    <div className={`${styles.testimonials_container}`}>
      <div
        className={`${styles.testimonials_subcontainer} ${
          view === "desktop" ? "px-3" : "px-1"
        }`}
      >
        <Row>
          <Col xs={0} sm={0} md={16} lg={16} xl={16}>
            <Row /* className={`w-100`} */ gutter={[0, 20]}>
              <Col span={24}>
                <h3 className={`${styles.testimonials_title}`}>Testimonials</h3>
              </Col>
              <Col span={3}>
                <div
                  className={`${styles.before_des_img}`}
                  style={{
                    backgroundImage: `url(${quote})`,
                  }}
                ></div>
              </Col>
              <Col span={18} style={{ width: "700px" }}>
                <div className={`${styles.testimonials_des} `}>
                  {testimonialsData &&
                  testimonialsData.TestimonialsDescription ? (
                    <div className={`${styles.event_details_des} `}>
                      <Scrollbars style={{ height: "100%", width: "100p%" }}>
                        {testimonialsData.TestimonialsDescription}
                      </Scrollbars>
                    </div>
                  ) : (
                    <Skeleton style={{ width: 500 }} />
                  )}
                </div>
              </Col>
              <Col span={3}>
                <div
                  className={`${styles.after_des_img}`}
                  style={{
                    backgroundImage: `url(${quote})`,
                  }}
                ></div>
              </Col>
              <Col span={24}>
                <h5 className={`${styles.testimonials_author}`}>
                  {testimonialsData && testimonialsData.Title ? (
                    testimonialsData.Title
                  ) : (
                    <Skeleton.Input style={{ width: 500 }} />
                  )}
                </h5>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={0} lg={0} xl={0}>
            <Row className={`w-100`}>
              <Col span={24}>
                <h3 className={`${styles.testimonials_title}`}>Testimonials</h3>
              </Col>
              <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                <div
                  className={`${styles.before_des_img}`}
                  style={{
                    backgroundImage: `url(${quote})`,
                  }}
                ></div>
              </Col>
              <Col xs={18} sm={18} md={18} lg={18} xl={18}>
                <p className={`${styles.testimonials_des} w-100`}>
                  {testimonialsData &&
                  testimonialsData.TestimonialsDescription ? (
                    testimonialsData.TestimonialsDescription
                  ) : (
                    <Skeleton style={{ width: 500 }} />
                  )}
                </p>
              </Col>
              <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                <div
                  className={`${styles.after_des_img}`}
                  style={{
                    backgroundImage: `url(${quote})`,
                  }}
                ></div>
              </Col>
              <Col span={24}>
                <h5 className={`${styles.testimonials_author}`}>
                  {testimonialsData && testimonialsData.Title ? (
                    testimonialsData.Title
                  ) : (
                    <Skeleton.Input style={{ width: 500 }} />
                  )}
                </h5>
              </Col>
            </Row>
          </Col>
          <Col xs={0} sm={0} md={8} lg={8} xl={8}>
            <div
              className={`${styles.image_container} d-flex`}
              // style={{ marginLeft: "20px" }}
            >
              <div className={`${styles.testimonials_image_box}`}>
                {/* <div
                  className={`d-flex justify-content-center align-items-center overflow-hidden h-100`}
                > */}
                {testimonialsData &&
                testimonialsData.AttachmentFiles &&
                testimonialsData.AttachmentFiles.length > 0 ? (
                  <img
                    src={testimonialsData.AttachmentFiles[0].ServerRelativeUrl}
                    alt="card-img"
                    width={100}
                    height={200}
                  ></img>
                ) : (
                  <Skeleton.Image />
                )}
                {/* </div> */}
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={0} lg={0} xl={0}>
            <div className={`${styles.image_container} w-100`}>
              <div className={`${styles.testimonials_image_box}`}>
                {/* <div
                  className={`d-flex justify-content-center align-items-center overflow-hidden h-100`}
                > */}
                {testimonialsData &&
                testimonialsData.AttachmentFiles &&
                testimonialsData.AttachmentFiles.length > 0 ? (
                  <img
                    src={testimonialsData.AttachmentFiles[0].ServerRelativeUrl}
                    alt="card-img"
                    width={600}
                    height={600}
                  ></img>
                ) : (
                  <Skeleton.Image />
                )}
                {/* </div> */}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
