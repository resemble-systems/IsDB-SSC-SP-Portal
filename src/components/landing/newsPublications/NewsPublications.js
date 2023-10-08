import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Row, Col, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
// component
import AppBtn from "../../../common_components/appBtn/AppBtn";
import AppMultiSlider from "../../../common_components/appMultiSlider/AppMultiSlider";
import CommonSectionHeader from "../commonSectionHeader/CommonSectionHeader";
import NewsPublicationsCard from "../../../common_components/newsPublicationsCard/NewsPublicationsCard";
//css
import styles from "./news-publications.module.sass";
import { AppContext } from "../../../App";

const responsive = {
  0: { items: 1 },
  568: { items: 1 },
  1000: { items: 1 },
  1024: { items: 1 },
  1440: { items: 1 },
};

const items = [];
const itemsTab = [];
const itemMobile = [];

function setItem(data) {
  data.forEach((item, index) => {
    if ((index + 1) % 3 === 0) {
      items.push(
        <div className={`${styles.news_container}`} data-value="1">
          <Row gutter={[16, 16]}>
            <Col span={8} className={`d-flex justify-content-center my-4`}>
              <NewsPublicationsCard data={data[index - 2]} />
            </Col>
            <Col span={8} className={`d-flex justify-content-center my-4`}>
              <NewsPublicationsCard data={data[index - 1]} />
            </Col>
            <Col span={8} className={`d-flex justify-content-center my-4`}>
              <NewsPublicationsCard data={data[index]} />
            </Col>
          </Row>
        </div>
      );
      itemsTab.push(
        <div className={`${styles.news_container}`} data-value="1">
          <Row gutter={[8, 8]}>
            <Col span={8} className={`d-flex justify-content-center my-4`}>
              <NewsPublicationsCard data={data[index - 2]} />
            </Col>
            <Col span={8} className={`d-flex justify-content-center my-4`}>
              <NewsPublicationsCard data={data[index - 1]} />
            </Col>
            <Col span={8} className={`d-flex justify-content-center my-4`}>
              <NewsPublicationsCard data={data[index]} />
            </Col>
          </Row>
        </div>
      );
    }
    itemMobile.push(
      <div className={`${styles.news_container}`} data-value="1">
        <Row gutter={[8, 8]}>
          <Col span={24} className={`d-flex justify-content-center my-4 px-3`}>
            <NewsPublicationsCard data={item} />
          </Col>
        </Row>
      </div>
    );
  });
}

export default function NewsPublications() {
  const { news } = useContext(AppContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevBtn, setPrevBtn] = useState("disable");
  const [nextBtn, setNextBtn] = useState("enable");
  const [newsData, setNewsData] = useState(null);
  let finalIndex;
  useEffect(() => {
    if (news && news.length > 0) {
      finalIndex = Math.floor(parseInt(news.length) / 3);
      setItem(news);
      setNewsData(news);
    }
  }, [news]);

  const slidePrev = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  const slideNext = () => {
    if (activeIndex < finalIndex - 1) setActiveIndex(activeIndex + 1);
  };

  const onSlideChanged = ({ item }) => setActiveIndex(item);

  useEffect(() => {
    if (activeIndex === 0) setPrevBtn("disable");
    else setPrevBtn("enable");
    if (activeIndex === finalIndex - 1) setNextBtn("disable");
    else setNextBtn("enable");
  }, [activeIndex]);

  return (
    <div className={`${styles.news_container} py-5`}>
      <CommonSectionHeader
        title={"News & Publications"}
        sliderSection={true}
        prevBtn={prevBtn}
        nextBtn={nextBtn}
        onClickPrev={slidePrev}
        onClickNext={slideNext}
      />
      <Row>
        <Col xs={0} sm={0} md={0} lg={24} xl={24}>
          {news && news.length > 0 ? (
            <AppMultiSlider
              responsive={responsive}
              items={items}
              activeIndex={activeIndex}
              onSlideChanged={onSlideChanged}
              paddingLeft={0}
              paddingRight={0}
              animationType={"fadeout"}
              disableDotsControls={true}
            />
          ) : (
            <div className={`${styles.news_container}`} data-value="1">
              <Row gutter={[16, 16]}>
                <Col span={8} className={`d-flex justify-content-center my-4`}>
                  <NewsPublicationsCard data={{}} />
                </Col>
                <Col span={8} className={`d-flex justify-content-center my-4`}>
                  <NewsPublicationsCard data={{}} />
                </Col>
                <Col span={8} className={`d-flex justify-content-center my-4`}>
                  <NewsPublicationsCard data={{}} />
                </Col>
              </Row>
            </div>
          )}
        </Col>
        <Col xs={0} sm={0} md={24} lg={0} xl={0}>
          {news && news.length > 0 ? (
            <AppMultiSlider
              responsive={responsive}
              items={itemsTab}
              activeIndex={activeIndex}
              onSlideChanged={onSlideChanged}
              paddingLeft={0}
              paddingRight={0}
              animationType={"slide"}
              disableDotsControls={true}
            />
          ) : (
            <div className={`${styles.news_container}`} data-value="1">
              <Row gutter={[8, 8]}>
                <Col span={8} className={`d-flex justify-content-center my-4`}>
                  <NewsPublicationsCard data={{}} />
                </Col>
                <Col span={8} className={`d-flex justify-content-center my-4`}>
                  <NewsPublicationsCard data={{}} />
                </Col>
                <Col span={8} className={`d-flex justify-content-center my-4`}>
                  <NewsPublicationsCard data={{}} />
                </Col>
              </Row>
            </div>
          )}
        </Col>
        <Col xs={24} sm={24} md={0} lg={0} xl={0}>
          {news && news.length > 0 ? (
            <AppMultiSlider
              responsive={responsive}
              items={itemMobile}
              activeIndex={activeIndex}
              onSlideChanged={onSlideChanged}
              paddingLeft={0}
              paddingRight={0}
              animationType={"slide"}
              disableDotsControls={true}
            />
          ) : (
            <div className={`${styles.news_container}`} data-value="1">
              <Row gutter={[8, 8]}>
                <Col
                  span={24}
                  className={`d-flex justify-content-center my-4 px-3`}
                >
                  <NewsPublicationsCard data={{}} />
                </Col>
              </Row>
            </div>
          )}
        </Col>
        <div className={`d-flex w-100 justify-content-end`}>
          <AppBtn
            text={`See All`}
            prefix={""}
            suffix={<ArrowRightOutlined className={`ml-2 pt-1`} />}
            mode={"dark"}
            href={"/news-publications"}
          />
        </div>
      </Row>
    </div>
  );
}
