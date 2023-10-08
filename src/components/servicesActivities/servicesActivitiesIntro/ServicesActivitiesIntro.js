//component
import ServicesActivitiesCardSection from "../../../common_components/servicesActivitiesCardSection/ServicesActivitiesCardSection";
// import { Scrollbars } from "react-custom-scrollbars";
// css
import styles from "./services-activities-intro.module.sass";
//BG
import Bg from "../../../assets/serviceActivities/Bg1.svg";

export default function ServicesActivitiesIntro() {
  return (
    <div
      className={`${styles.service_bg}`}
      // style={{
      //   backgroundImage: `url(${Bg})`,
      // }}
    >
      <div className={`${styles.service_container} pb-5`}>
        {/* <Scrollbars style={{ height: "692px" }}> */}
        <ServicesActivitiesCardSection />
        {/* </Scrollbars> */}
      </div>
    </div>
  );
}
