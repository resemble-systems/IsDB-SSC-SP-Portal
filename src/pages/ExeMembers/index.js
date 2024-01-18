import { Helmet } from "react-helmet";
//component
//Logo
import Logo from "../../assets/Image/header/IsDB _ EN _ logo _ primary _ colour.png";
import { ExeMembers } from "../../container/exeMembers/ExeMembers";

export default function ExecutiveMembers() {
  return (
    <>
      <Helmet>
        <title>Executive Members</title>
        <meta property="og:title" content="IsDB - About Us" />
        <meta property="og:image" content={Logo} />
      </Helmet>
      <ExeMembers />
    </>
  );
}
