import { Row, Col } from "antd";
import useInView from "react-cool-inview";
//animation
import { slideInLeft } from "react-animations";
import { StyleSheet, css } from "aphrodite";
//BG
import Group from "../../../assets/aboutUs/Group_881.svg";
import Ssc from "../../../assets/aboutUs/sscbg2.svg";
import Mission from "../../../assets/aboutUs/missionBg.svg";
//css
import styles from "./our-objective.module.sass";
import { useEffect, useState } from "react";
import { CONST } from "../../../constant";
import axios from "axios";

const animationStyles = StyleSheet.create({
  slideInLeft: {
    animationName: slideInLeft,
    animationDuration: "1.5s",
  },
});

export default function OurObjectiveSection() {
  const [objDetails, setObjDetails] = useState("");

  useEffect(() => {
    axios
      .get(
        `${CONST.BASE_URL}${CONST.API.LIST(
          "AboutUsObjective"
        )}${CONST.API.QUERY("Objective")}`
      )
      .then((res) => {
        setObjDetails(res.data.value);
      })
      .catch((err) => console.log(err));
  }, []);
  const { observe, inView } = useInView({
    threshold: 0.25, // Default is 0
    onChange: ({ inView, scrollDirection, entry, observe, unobserve }) => {
      // Triggered whenever the target meets a threshold, e.g. [0.25, 0.5, ...]

      unobserve(); // To stop observing the current target element
      observe(); // To re-start observing the current target element
    },
    onEnter: ({ scrollDirection, entry, observe, unobserve }) => {
      // Triggered when the target enters the viewport
    },
    onLeave: ({ scrollDirection, entry, observe, unobserve }) => {
      // Triggered when the target leaves the viewport
    },
    // More useful options...
  });

  return (
    <div
      className={`${styles.mission_bg}`}
      style={{
        backgroundImage: `url(${Group}),url(${Ssc}),url(${Mission})`,
        backgroundRepeat: `no-repeat,no-repeat,no-repeat`,
        backgroundPosition: `113% 50%,0% 40%,0 60%`,
      }}
    >
      <div className={`${styles.mission_container} py-5`} ref={observe}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <h3 className={`${styles.mission_title} mb-4`}>Our Objective</h3>
          </Col>
          {/* For small screen */}
          <Col xs={24} sm={24} md={0} lg={0} xl={0}>
            {objDetails?.length > 0 &&
              objDetails.map((data) => (
                <div className={`${styles.mission_list} px-4 ml-5 mb-4`}>
                  {data.Objective}
                </div>
              ))}
          </Col>
          {/* For large screen */}
          <Col xs={0} sm={0} md={16} lg={16} xl={16}>
            {objDetails?.length > 0 &&
              objDetails.map((data) => (
                <div className={inView ? css(animationStyles.slideInLeft) : ""}>
                  <div className={`${styles.mission_list} px-4 mb-4`}>
                    {data.Objective}
                  </div>
                </div>
              ))}
          </Col>
        </Row>
      </div>
    </div>
  );
}
