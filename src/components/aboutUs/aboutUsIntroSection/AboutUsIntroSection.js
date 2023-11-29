import { Row, Col } from "antd";
import AppSlider from "../../../common_components/appSlider/AppSlider";
import img1 from "../../../assets/aboutUs/objective1234.svg";
import img2 from "../../../assets/aboutUs/Group_448.svg";
//css
import styles from "./about-us-intro-section.module.sass";
import { useEffect, useState } from "react";
import { CONST } from "../../../constant";
import axios from "axios";

export default function AboutUsIntroSection() {
  const [introDetails, setIntroDetails] = useState("");
  const image = [
    {
      url: img1,
    },
    {
      url: img2,
    },
  ];

  useEffect(() => {
    axios
      .get(
        `${CONST.BASE_URL}${CONST.API.LIST(
          "AboutUsDescription"
        )}${CONST.API.QUERY("Description")}`
      )
      .then((res) => {
        setIntroDetails(res.data.value);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={`${styles.introduction_bg}`}>
      <div className={`${styles.introduction_container} py-5`}>
        <Row>
          <Col xs={0} sm={0} md={0} lg={8} xl={8}>
            <div className={`${styles.image_container}`}>
              <AppSlider
                showIndicators={false}
                autoPlay={true}
                setAutoPlay={() => {}}
                stopOnHover={false}
                // fade={true}
                swipeable={false}
              >
                {image &&
                  image.map((img, index) => (
                    <img
                      src={img.url}
                      alt="ISDB"
                      width="342px"
                      height="350px"
                      key={index}
                    />
                  ))}
              </AppSlider>
            </div>
          </Col>
          {/* For small tab display view */}
          <Col xs={24} sm={24} md={24} lg={0} xl={0}>
            <div className={`${styles.image_container}`}>
              <AppSlider
                showIndicators={false}
                autoPlay={true}
                setAutoPlay={() => {}}
                stopOnHover={false}
                // fade={true}
                swipeable={false}
              >
                {image &&
                  image.map((img, index) => (
                    <img
                      src={img.url}
                      alt="ISDB"
                      width="300px"
                      height="300px"
                      key={index}
                    />
                  ))}
              </AppSlider>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={16} xl={16}>
            <ul className={`pt-4 pl-3 ${styles.bullet}`}>
              {introDetails?.length > 0 &&
                introDetails?.map((data) => (
                  <li className={`mb-4`}>{data.Description}</li>
                ))}
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  );
}
