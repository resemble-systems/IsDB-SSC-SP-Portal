//component
import Scrollbars from "react-custom-scrollbars";
import ServicesActivitiesCardSection from "../../../common_components/servicesActivitiesCardSection/ServicesActivitiesCardSection";
// import { Scrollbars } from "react-custom-scrollbars";
// css
import styles from "./services-activities-intro.module.sass";
import { AppContext } from "../../../App";
import { useContext } from "react";
//BG

export default function ServicesActivitiesIntro() {
  const { services } = useContext(AppContext);
  return (
    <div
      className={`${styles.service_bg}`}
      // style={{
      //   backgroundImage: `url(${Bg})`,
      // }}
    >
      {/* <div className={`${styles.service_container} pb-5`}> */}

      <div className={`container pb-5 pt-5`}>
        {services?.length > 6 ? (
          <Scrollbars style={{ height: "592px" }}>
            <ServicesActivitiesCardSection />
          </Scrollbars>
        ) : (
          <ServicesActivitiesCardSection />
        )}
      </div>
    </div>
  );
}
