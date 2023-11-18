import { useState, useEffect, useContext } from "react";
import { Row, Col } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { AppContext } from "../../../App";

// component
import AppBtn from "../../../common_components/appBtn/AppBtn";
import NewsPublicationsCard from "../../../common_components/newsPublicationsCard/NewsPublicationsCard";
//Css
import styles from "./all-news.module.sass";

export default function NewsSection({ routePath }) {
  const { newsLib } = useContext(AppContext);
  const [seeAll, setSeeAll] = useState(false);
  const [newsData, setNewsData] = useState(null);

  useEffect(() => {
    if (newsLib && newsLib?.length > 0) {
      const filterLib = newsLib.filter(
        (data) => data.ID.toString() !== routePath.id
      );
      if (seeAll) {
        setNewsData(filterLib);
      } else {
        setNewsData(filterLib.slice(0, 3));
      }
    }
  }, [seeAll, newsLib, routePath]);

  return (
    <div className={`${styles.news_bg}`}>
      <div className={`${styles.news_container}`}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <h3 className={`${styles.news_tilte} mb-3`}>News</h3>
          </Col>
          {newsData &&
            newsData?.length > 0 &&
            newsData.map((newsObject, index) => (
              <Col xs={24} sm={24} md={8} lg={8} xl={8} key={index}>
                <NewsPublicationsCard data={newsObject} />
              </Col>
            ))}
          <div className={`d-flex w-100 justify-content-end`}>
            <AppBtn
              text={seeAll ? `See Less` : `See All`}
              prefix={""}
              suffix={<ArrowRightOutlined className={`ml-2 pt-1`} />}
              mode={"dark"}
              onClick={seeAll ? () => setSeeAll(false) : () => setSeeAll(true)}
            />
          </div>
        </Row>
      </div>
    </div>
  );
}
