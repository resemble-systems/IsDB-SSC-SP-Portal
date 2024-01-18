import Layout from "../layout/Layout";
import InnerPageTitleSection from "../../common_components/innerPageTitleSection/InnerPageTitleSection";

import StaffSocialClub from "../../components/aboutUs/staffSocialClub/StaffSocialClub";

//css
import styles from "./exeMembers.module.sass";
//bg
import Hero from "../../assets/general/hero.svg";
import Dotted from "../../assets/general/Dotted-line-path-301.svg";

export const ExeMembers = () => {
  return (
    <>
      <Layout>
        <div className={`position-relative`}>
          <div className={`${styles.bg_color}`}></div>
          <div
            className={`${styles.bg_pattern}`}
            style={{
              backgroundImage: `url(${Hero}),url(${Dotted})`,
            }}
          ></div>
          <div className="container">
            <InnerPageTitleSection title={"Executive Members"} />
          </div>
        </div>
        <div className={`${styles.align}`}>
          <StaffSocialClub page={"ExeMembers"} />
        </div>
      </Layout>
    </>
  );
};
