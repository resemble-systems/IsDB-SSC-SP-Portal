import React, { useState, useEffect, useContext, useRef } from "react";
import img1 from "../../../assets/upcomingEvent/Activities_Icons_Set2.svg";
import { Row, Col } from "antd";
import { AppContext } from "../../../App";
// component
import CommonSectionHeader from "../commonSectionHeader/CommonSectionHeader";
import AppMultiSlider from "../../../common_components/appMultiSlider/AppMultiSlider";
import EventsCard from "../../../common_components/eventsCard/EventsCard";
//service
import {
  setBackground,
  setEventBackground,
} from "../../../services/eventService";
//css
import styles from "./upcoming-events.module.sass";

// const responsive = {
//   0: { items: 1, itemsFit: "contain" },
//   768: { items: 2, itemsFit: "contain" },
//   1024: { items: 3, itemsFit: "contain" },
//   1440: { items: 5, itemsFit: "contain" },
// };

const responsive = {
  0: { items: 1, itemsFit: "contain" },
  768: { items: 2, itemsFit: "contain" },
  1024: { items: 2, itemsFit: "contain" },
  1440: { items: 4, itemsFit: "contain" },
  2560: { items: 6, itemsFit: "contain" },
};
let items = [];

function setItem(data, services) {
  items = [];
  data.forEach((item, i) => {
    let Type = { Type: item.EventType.ServiceType };
    let [bg, bgImage, boxShadow] = setEventBackground(Type, services);
    return items.push(
      <div
        className={`item my-4 ${styles.event_card_container}`}
        data-value={i.toString()}
      >
        <EventsCard
          data={item}
          bg={bg}
          bgImage={bgImage}
          boxShadow={boxShadow}
          btn={true}
        />
      </div>
    );
  });
}

export default function UpcomingEvents({ page }) {
  const { events, services } = useContext(AppContext);
  const eventsRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderFinalIndex, setSliderFinalIndex] = useState(3);
  const [prevBtn, setPrevBtn] = useState("disable");
  const [nextBtn, setNextBtn] = useState("enable");
  const [eventsData, setEventsData] = useState(null);
  const [title, setTitle] = useState("");
  const [finalIndex, setFinalIndex] = useState(0);

  useEffect(() => {
    if (events && events?.length > 0 && services && services?.length > 0) {
      let title = "Upcoming Events";
      let displayEventsData = events?.filter((eventData) => {
        return new Date(eventData.StartDate).getTime() > new Date().getTime();
      });
      if (displayEventsData && displayEventsData.length === 0) {
        title = "Recent Events";
        displayEventsData = events.filter(
          (eventData) =>
            new Date(eventData.StartDate).getTime() <= new Date().getTime() &&
            new Date(eventData.EndDate).getTime() >= new Date().getTime()
        );
      }
      if (displayEventsData && displayEventsData.length === 0) {
        title = "Past Events";
        displayEventsData = events.filter(
          (eventData) =>
            new Date(eventData.EndDate).getTime() < new Date().getTime()
        );
      }

      setFinalIndex(Math.floor(parseInt(displayEventsData?.length)));
      setTitle(title);

      setItem(displayEventsData, services);
      setEventsData(displayEventsData);
    }
  }, [events, services]);
  //upcomming events

  useEffect(() => {
    if (window.innerWidth >= 1440) setSliderFinalIndex(5);

    if (window.innerWidth < 1440 && window.innerWidth > 1024)
      setSliderFinalIndex(4);

    if (window.innerWidth <= 1024 && window.innerWidth >= 768)
      setSliderFinalIndex(2);

    if (window.innerWidth < 768) setSliderFinalIndex(1);
  }, []);
  // useEffect(() => {
  //   if (activeIndex === 0) setPrevBtn("disable");
  //   else setPrevBtn("enable");
  //   if (activeIndex === finalIndex /* - sliderFinalIndex */)
  //     setNextBtn("disable");
  //   else setNextBtn("enable");
  // }, [activeIndex, finalIndex]);
  useEffect(() => {
    // console.log("activeindexnews", activeIndex, finalIndex);
    if (activeIndex === 0) setPrevBtn("disable");
    else setPrevBtn("enable");
    if (activeIndex === finalIndex - sliderFinalIndex) setNextBtn("disable");
    else setNextBtn("enable");
  }, [activeIndex, finalIndex]);

  const slidePrev = () => {
    // if (activeIndex > 0) setActiveIndex(activeIndex - 1);
    eventsRef.current.slidePrev();
  };

  const slideNext = () => {
    // console.log(
    //   "finalIndex-->",
    //   activeIndex,
    //   finalIndex,
    //   sliderFinalIndex,
    //   activeIndex < finalIndex - sliderFinalIndex
    // );
    // if (activeIndex < finalIndex /* - sliderFinalIndex */)
    //   setActiveIndex(activeIndex + 1);
    eventsRef.current.slideNext();
  };

  const onSlideChanged = ({ item }) => setActiveIndex(item);
  let skeletonData = [
    {
      data: {},
      bg: "#999",
      bgImage: img1,
      boxShadow: "0px 3px 18px #99999940",
    },
  ];

  return eventsData && eventsData.length === 0 ? null : eventsData &&
    eventsData.length > 0 ? (
    <Row className={`pt-5`}>
      {/* <div className={`${styles.events_container}`}> */}
      <div className={`container`}>
        <CommonSectionHeader
          title={`${title} & Activities`}
          sliderSection={true}
          prevBtn={prevBtn}
          nextBtn={nextBtn}
          onClickPrev={slidePrev}
          onClickNext={slideNext}
        />
      </div>

      <AppMultiSlider
        responsive={responsive}
        items={items}
        activeIndex={activeIndex}
        onSlideChanged={onSlideChanged}
        paddingLeft={100}
        paddingRight={50}
        animationType={"slide"}
        disableDotsControls={true}
        sliderFrom={"Events"}
        refVariable={eventsRef}
        stopAnimation={nextBtn === "disable"}
      />
    </Row>
  ) : (
    <Row className={`pt-5`}>
      {skeletonData.map((sdata, index) => (
        <Col xs={24} sm={24} md={12} lg={6} xl={6} key={index}>
          <div className={`container`}>
            <EventsCard
              data={sdata.data}
              bg={sdata.bg}
              bgImage={sdata.bgImage}
              boxShadow={sdata.boxShadow}
              btn={true}
            />
          </div>
        </Col>
      ))}
    </Row>
  );
}
