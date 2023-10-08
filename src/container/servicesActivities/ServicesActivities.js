//component
import Layout from "../layout/Layout";
import InnerPageTitleSection from "../../common_components/innerPageTitleSection/InnerPageTitleSection";

import ServicesActivitiesIntro from "../../components/servicesActivities/servicesActivitiesIntro/ServicesActivitiesIntro";
import VideoSection from "../../common_components/videoSection/VideoSection";
//css
import styles from "./services-activities.module.sass";
//BG
import hero from "../../assets/general/hero.svg";
import DottedLine from "../../assets/general/Dotted-line-path-301.svg";

export default function ServicesActivities() {
  return (
    <>
      <Layout>
        <div className={`position-relative`}>
          <div className={`${styles.bg_color}`}></div>
          <div
            className={`${styles.bg_pattern}`}
            style={{
              backgroundImage: `url(${hero}),url(${DottedLine})`,
            }}
          ></div>
          <InnerPageTitleSection title={"Activities"} />
          <ServicesActivitiesIntro />
        </div>
        <VideoSection />
      </Layout>
    </>
  );
}
