import $ from "jquery";
import { VAR } from "../../env";

const getDigest = async () => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json; odata=verbose",
    },
  };
  const response = await fetch(
    `${VAR?.REACT_APP_BUILD_URL}/_api/contextinfo`,
    requestOptions
  );
  const data = await response.json();
  $("#__REQUESTDIGEST").val(data.d.GetContextWebInformation.FormDigestValue);
  return data.d.GetContextWebInformation.FormDigestValue;
};

export default getDigest;
