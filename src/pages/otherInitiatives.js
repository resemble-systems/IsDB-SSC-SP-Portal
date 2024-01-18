// import React from "react";

// import OfferContainer from "../container/offers/offers";

// function Offers() {

//   return (
//     <>
//       <Helmet>
//         <title>Discounts & Offers</title>
//         <meta property="og:title" content="IsDB - Offers" />
//         <meta property="og:image" content={Logo} />
//       </Helmet>
//       <OfferContainer />
//     </>
//   );
// }

// export default Offers;
import React from "react";
import { Helmet } from "react-helmet";
import Logo from "../assets/Image/header/IsDB _ EN _ logo _ primary _ colour.png";
import OtherInitiavites from "../container/otherInitiatives/OtherInitiavites";
const OtherInitiatives = () => {
  return (
    <>
      <Helmet>
        <title>Other Initiatives</title>
        <meta property="og:title" content="IsDB - Other Initiatives" />
        <meta property="og:image" content={Logo} />
      </Helmet>
      <OtherInitiavites />
    </>
  );
};

export default OtherInitiatives;
