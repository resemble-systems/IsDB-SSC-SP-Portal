import { Row, Col, Skeleton } from "antd";
import quote from "../../../assets/context/testimonialsDoubleQuote.svg";
import quoteRight from "../../../assets/context/QuoteRight.svg";
import quoteLeft from "../../../assets/context/QuoteLeft.svg";
// css
import styles from "./testimonials.module.sass";
import Scrollbars from "react-custom-scrollbars";

export default function ResponsiveView({ view, testimonialsData }) {
  const formattedText = testimonialsData?.TestimonialsDescription?.replace(
    /\n/g,
    "<br>"
  );
  return (
    <div
      className="w-100 container d-flex gap-5 align-items-center"
      style={{ height: "458px" }}
    >
      <div className="flex-fill">
        <h3 className={`${styles.testimonials_title}`}>Testimonials</h3>
        <div className="d-flex gap-3">
          <div>
            <img src={quoteLeft} width={"64px"} height={"64px"} />
          </div>
          <div className="w-100 flex-fill">
            <div className={`${styles.testimonials_des}`}>
              {testimonialsData && testimonialsData.TestimonialsDescription ? (
                <p className={`${styles.event_details_des}`}>
                  <Scrollbars style={{ height: "100%", width: "100%" }}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: formattedText,
                      }}
                    />
                  </Scrollbars>
                </p>
              ) : (
                <Skeleton style={{ width: 500 }} />
              )}
            </div>
          </div>
          <div className="d-flex align-items-end">
            <img src={quoteRight} width={"64px"} height={"64px"} />
          </div>
        </div>
        <h5 className={`${styles.testimonials_author} pt-3`}>
          {testimonialsData && testimonialsData.Title ? (
            testimonialsData.Title
          ) : (
            <Skeleton.Input style={{ width: 500 }} />
          )}
        </h5>
      </div>
      <div className={`${styles.image_container}`}>
        <div className={`${styles.testimonials_image_box}`}>
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
        </div>
      </div>
    </div>
  );
}
