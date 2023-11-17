// component
import CommonSectionHeader from "../commonSectionHeader/CommonSectionHeader";
import ServicesActivitiesCardSection from "../../../common_components/servicesActivitiesCardSection/ServicesActivitiesCardSection";
import ServiceBg from "../../../assets/background/ServicesActivities.svg";

//css
import styles from "./services-activities.module.sass";

export default function ServicesActivities() {
  return (
    <div
      style={{
        backgroundImage: `url(${ServiceBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPositionY: "-250px",
      }}
      className={`${styles.service_bg}`}
    >
      <div className={`${styles.service_container} py-5`}>
        <CommonSectionHeader
          title={"Services & Activities"}
          sliderSection={false}
        />
        <ServicesActivitiesCardSection />
      </div>
    </div>
  );
}
