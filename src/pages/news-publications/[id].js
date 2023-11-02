import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { Helmet } from "react-helmet";
//Components
import NewsDetails from "../../container/newsPublications/NewsDetails";
//Logo
import Logo from "../../assets/Image/header/IsDB _ EN _ logo _ primary _ colour.png";
import { useLocation } from "react-router-dom";

export default function NewsTypes({ routePath }) {
  const location = useLocation();
  const { newsLib } = useContext(AppContext);
  let data = window.location.href.split("/");
  // let itemId = data[data.length - 1];
  const [itemId, setItemId] = useState(null);

  useEffect(() => {
    let data = location.pathname.split("/");
    let itemId = data[data.length - 1];
    setItemId(itemId);
  }, [location.pathname, itemId]);
  console.log("activitesID", itemId);

  return (
    <>
      <Helmet>
        <title>News</title>
        <meta property="og:title" content="IsDB - News Details" />
        <meta property="og:image" content={Logo} />
      </Helmet>
      {itemId?.length > 0 && (
        <NewsDetails
          routePath={{ id: itemId }}
          newsDetails={newsLib}
          news={newsLib}
        />
      )}
    </>
  );
}
