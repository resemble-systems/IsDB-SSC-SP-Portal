// Common Components
import Layout from "../layout/Layout";
import CommonInnerPagesTitleBg from "../../common_components/commonInnerPagesTitleBg/CommonInnerPagesTitleBg";
import InnerPageTitleSection from "../../common_components/innerPageTitleSection/InnerPageTitleSection";

// Components
import ContactUsSection from "../../components/contactUs/contactUsSection/ContactUsSection";
//css
import styles from "./contact-us.module.sass";
//Bg
import Hero from "../../assets/general/hero.svg";
import Dotted from "../../assets/general/Dotted-line-path-301.svg";
import GalleryBg from "../../assets/gallery/gallery.svg";

export default function ContactUs() {
  return (
    <>
      <div className={`position-relative`}>
        <div className={`${styles.bg_color}`}></div>
        <div
          className={`${styles.bg_pattern}`}
          style={{
            backgroundImage: `url(${Hero}),url(${Dotted})`,
          }}
        >
          <Layout>
            <InnerPageTitleSection title={"Contact Us"} />
            <ContactUsSection />
          </Layout>
        </div>
      </div>
    </>
  );
}
