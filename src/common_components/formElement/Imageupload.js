import { useState } from "react";
import { Row, Col } from "antd";
import { v4 as uuidv4 } from "uuid";
import styles from "./form-element.module.sass";
import camera from "../../assets/update/camera.svg";
import deleteicon from "../../assets/update/trash.svg";
import $ from "jquery";

function handleFileSelect(evt, id, itemId, listName, setLoaderTime) {
  // Loop through the FileList and render image files as thumbnails.
  setLoaderTime(true);
  for (const file of evt.target.files) {
    //Attacfile code
    var getFileBuffer = function (file) {
      var deferred = $.Deferred();
      var reader = new FileReader();
      reader.onload = function (e) {
        deferred.resolve(e.target.result);
      };
      reader.onerror = function (e) {
        deferred.reject(e.target.error);
      };
      reader.readAsArrayBuffer(file);
      return deferred.promise();
    };

    const GetDigest = async () => {
      const requestOptions = {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Accept: "application/json; odata=verbose",
        },
      };
      console.log(
        "process.env.REACT_APP_BUILD_URL-->",
        process.env.REACT_APP_BUILD_URL
      );
      const response = await fetch(
        `${process.env.REACT_APP_BUILD_URL}/_api/contextinfo`,
        requestOptions
      );

      const data = await response.json();
      $("#__REQUESTDIGEST").val(
        data.d.GetContextWebInformation.FormDigestValue
      );

      return data.d.GetContextWebInformation.FormDigestValue;
    };
    console.log("itemID2--->", itemId);
    // getFileBuffer(file).then(function (buffer) {
    //   // GetDigest().then((digest) => {
    //   // console.log("digestVal-->", digest);
    //   $.ajax({
    //     url: `/_api/web/lists/getbytitle('${listName}')/items(${itemId})/AttachmentFiles/add(FileName='${file.name}')`,
    //     type: "POST",
    //     cache: false,
    //     contentType: false,
    //     method: "POST",
    //     data: buffer,
    //     processData: false,
    //     headers: {
    //       Accept: "application/json; odata=verbose",
    //       "content-type": "application/json; odata=verbose",
    //       "X-RequestDigest": $("#__REQUESTDIGEST").val(),
    //       // "X-RequestDigest": digest,
    //     },
    //     success: function (data, textStatus, jqXHR) {
    //       setLoaderTime(false);
    //       console.log("Img uploaded successfully");
    //     },
    //     error: function (jqXHR, textStatus, errorThrown) {
    //       setLoaderTime(false);
    //       console.log("ERRORS: " + textStatus);
    //     },
    //   });
    //   // });
    // });
    getFileBuffer(file).then(function (buffer) {
      GetDigest().then((digest) => {
        // console.log("digestVal-->", digest);
        console.log("file-->", file);
        $.ajax({
          url: `/_api/web/lists/getbytitle('${listName}')/items(${itemId})/AttachmentFiles/add(FileName='${file.name}')`,
          type: "POST",
          async: false,
          data: buffer,
          headers: {
            accept: "application/json;odata=verbose",
            "X-RequestDigest": digest,
            "Content-Type": "application/json;odata=verbose",
            "X-Http-Method": "MERGE",
            "IF-MATCH": file.ListItemAllFields.__metadata.etag,
          },
          success: function (data, textStatus, jqXHR) {
            setLoaderTime(false);
            console.log("Img uploaded successfully");
          },
          error: function (jqXHR, textStatus, errorThrown) {
            setLoaderTime(false);
            console.log("ERRORS: " + textStatus);
          },
        });
      });
    });
    // Render thumbnail.
    //const span = document.createElement('span')
    const src = URL.createObjectURL(file);

    document.getElementById(id).innerHTML = `<div><Image
            src=${deleteicon}
            alt="Img_Item"
            width=20
            height=20
            style=position:absolute top: 20px left:20px
        /><Image
            src=${src}
            alt="Img_Item"
            width=70
            height=70
        /></div>`;
    let temp = document.getElementById(id);
    console.log(temp.firstChild);
    temp.firstChild.addEventListener("click", function (event) {
      hideDiv(id, itemId, file.name, listName);
    });
  }
}

// function handleFileSelect(evt, id, itemId, listName, setLoaderTime) {
//   // Loop through the FileList and render image files as thumbnails.
//   setLoaderTime(true);

//   const uploadFile = async (file) => {
//     try {
//       const digest = await getFormDigest();
//       const buffer = await getFileBuffer(file);

//       await uploadAttachment(
//         digest,
//         file,
//         buffer,
//         id,
//         itemId,
//         listName,
//         setLoaderTime
//       );
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       setLoaderTime(false);
//     }
//   };

//   for (const file of evt.target.files) {
//     uploadFile(file);
//   }
// }

// async function getFormDigest() {
//   try {
//     const response = await fetch("/sites/ssc/_api/contextinfo", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json; odata=verbose",
//       },
//     });

//     const data = await response.json();
//     const digest = data.d.GetContextWebInformation.FormDigestValue;
//     $("#__REQUESTDIGEST").val(digest); // Update the digest in your form
//     return digest;
//   } catch (error) {
//     throw new Error("Error fetching FormDigestValue: " + error);
//   }
// }

// async function getFileBuffer(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       resolve(e.target.result);
//     };

//     reader.onerror = (e) => {
//       reject(e.target.error);
//     };

//     reader.readAsArrayBuffer(file);
//   });
// }

// async function uploadAttachment(
//   digest,
//   file,
//   buffer,
//   id,
//   itemId,
//   listName,
//   setLoaderTime
// ) {
//   const headers = {
//     Accept: "application/json; odata=verbose",
//     "X-RequestDigest": digest,
//   };

//   const endpoint = `/_api/web/lists/getbytitle('${listName}')/items(${itemId})/AttachmentFiles/add(FileName='${file.name}')`;

//   try {
//     const response = await fetch(endpoint, {
//       method: "POST",
//       headers,
//       body: buffer,
//     });

//     if (response.ok) {
//       setLoaderTime(false);
//       console.log("File uploaded successfully.");
//     } else {
//       throw new Error(`Error uploading file: ${response.statusText}`);
//     }
//   } catch (error) {
//     throw new Error("Error uploading attachment: " + error);
//   }
// }

function hideDiv(id, itemId, filename, listName) {
  //Function to hide the elements
  var myobj = document.getElementById(id);
  myobj.remove();
  //alert(id)

  //Deleteattacment fn
  var Url = `/_api/web/lists/GetByTitle('${listName}')/GetItemById(${itemId})/AttachmentFiles/getByFileName('${filename}') `;
  $.ajax({
    url: Url,
    type: "POST",
    contentType: "application/json;odata=verbose",
    headers: {
      "X-RequestDigest": $("#__REQUESTDIGEST").val(),
      "X-HTTP-Method": "DELETE",
      Accept: "application / json; odata = verbose",
    },

    success: function (data) {
      console.log("Image Deleted");
    },
    error: function (error) {
      console.log("Error deleteing file", JSON.stringify(error));
    },
  });
}

export default function TestUpload({
  itemId,
  listName,
  setLoaderTime,
  uploadedPic,
}) {
  const [count, setCount] = useState(0);

  var elements = [];
  for (var i = 0; i < count; i++) {
    let p = uuidv4();

    let colid = "H" + p;
    let fid = "files" + p;
    // push the component to elements!
    elements.push(
      <Col id={colid} className={`${styles.imageDiv}`}>
        <label htmlFor={fid} className={`${styles.labelStyle}`}>
          <img src={camera} alt="Img_Item" width={20} height={20} />
          <input
            type="file"
            className={`${styles.fileStyle}`}
            accept="image/*"
            id={fid}
            multiple
            onChange={(e) =>
              handleFileSelect(e, colid, itemId, listName, setLoaderTime)
            }
          />
        </label>
      </Col>
    );
  }
  console.log("attachment-->", itemId, uploadedPic);
  return (
    <>
      {uploadedPic?.length > 0 ? (
        <>
          <Row id="mainBG">
            <Col span={24}>
              <label className={`${styles.label}`}>Upload Pictures</label>
            </Col>
            <Col>
              <Row>
                {uploadedPic?.map((data, index) => (
                  <Col id={"H" + (index + 1)} className={`${styles.imageDiv}`}>
                    {/* <label for="files" className={`${styles.labelStyle}`}>
                      <img src={camera} alt="Img_Item" width={20} height={20} />
                      <input
                        type="file"
                        className={`${styles.fileStyle}`}
                        accept="image/*"
                        id="files"
                        multiple
                        onChange={(e) =>
                          handleFileSelect(
                            e,
                            "H1",
                            itemId,
                            listName,
                            setLoaderTime
                          )
                        }
                      />
                    </label> */}
                    <div
                      onClick={() =>
                        hideDiv(
                          "H" + (index + 1),
                          itemId,
                          data.FileName,
                          listName
                        )
                      }
                    >
                      <img
                        src={deleteicon}
                        alt="Img_Item"
                        width={20}
                        height={20}
                        style={{
                          position: "absolute",
                          top: "20px",
                          left: "20px",
                        }}
                      />
                      <img
                        src={
                          /* "resembleae.sharepoint.com" + */ data?.ServerRelativeUrl
                        }
                        alt={"Img_Item"}
                        width={70}
                        height={70}
                      />
                    </div>
                  </Col>
                ))}

                {elements}
              </Row>
            </Col>
            <Col className={`${styles.sPadding}`}>
              <b
                style={{ cursor: "pointer" }}
                onClick={() => setCount(count + 1)}
              >
                Add more1
              </b>{" "}
            </Col>
          </Row>
        </>
      ) : (
        <Row id="mainBG">
          <Col span={24}>
            <label className={`${styles.label}`}>Upload Pictures</label>
          </Col>
          <Col p-3>
            <Row>
              <Col id="H1" className={`${styles.imageDiv}`}>
                <label for="files" className={`${styles.labelStyle}`}>
                  <img src={camera} alt="Img_Item" width={20} height={20} />
                  <input
                    type="file"
                    className={`${styles.fileStyle}`}
                    accept="image/*"
                    id="files"
                    multiple
                    onChange={(e) =>
                      handleFileSelect(e, "H1", itemId, listName, setLoaderTime)
                    }
                  />
                </label>
              </Col>
              <Col id="H2" className={`${styles.imageDiv}`}>
                <label for="files1" className={`${styles.labelStyle}`}>
                  <img src={camera} alt="Img_Item" width={20} height={20} />
                  <input
                    type="file"
                    className={`${styles.fileStyle}`}
                    accept="image/*"
                    id="files1"
                    multiple
                    onChange={(e) =>
                      handleFileSelect(e, "H2", itemId, listName, setLoaderTime)
                    }
                  />
                </label>
              </Col>

              <Col id="H3" className={`${styles.imageDiv}`}>
                <label for="files2" className={`${styles.labelStyle}`}>
                  <img src={camera} alt="Img_Item" width={20} height={20} />
                  <input
                    type="file"
                    className={`${styles.fileStyle}`}
                    accept="image/*"
                    id="files2"
                    multiple
                    onChange={(e) =>
                      handleFileSelect(e, "H3", itemId, listName, setLoaderTime)
                    }
                  />
                </label>
              </Col>
              {elements}
            </Row>
          </Col>
          <Col className={`${styles.sPadding}`}>
            <b
              style={{ cursor: "pointer" }}
              onClick={() => setCount(count + 1)}
            >
              Add more1
            </b>{" "}
          </Col>
        </Row>
      )}
    </>
  );
}
