import React from "react";
import Layout from "../layout/Layout";
import InnerPageTitleSection from "../../common_components/innerPageTitleSection/InnerPageTitleSection";
//BG
import Hero from "../../assets/general/hero.svg";
import Dotted from "../../assets/general/Dotted-line-path-301.svg";
//css
import styles from "./otherInitiatives.module.sass";
import OtherInitiativesComp from "../../components/otherInitiatives";

const OtherInitiavites = () => {
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
            <InnerPageTitleSection title={"Other Initiatives"} />
          </div>
          {/* <OfferComp /> */}
          <OtherInitiativesComp />
        </div>
      </Layout>
    </>
  );
};

export default OtherInitiavites;
