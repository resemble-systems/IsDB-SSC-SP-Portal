import { useEffect, useState } from "react";
import { Row, Col, Pagination, Select } from "antd";
// CSS
import styles from "./gallery-footer.module.sass";

const { Option } = Select;

function onSizeChange(value, setListSize, setPageNumber) {
  setPageNumber(1);
  setListSize(parseInt(value));
}

export default function GalleryFooter({
  listData,
  listSize,
  pageNumber,
  setListSize,
  setPageNumber,
  entryOptions,
  defaultValue,
}) {
  const [total, setTotal] = useState(listData?.length);

  useEffect(() => {
    if (listData && listData?.length > 0) setTotal(listData?.length);
  }, [total, listData]);
  return (
    <div className={`${styles.footer_container} d-flex align-items-center`}>
      <Row className={`w-100`}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <div className={`d-flex justify-content-between`}>
            <div
              className={`${styles.list_size_container} d-flex align-items-center`}
            >
              Showing{" "}
              <div
                className={`${styles.list_size} d-flex align-items-center mx-2`}
              >
                <Select
                  style={{ width: "60px" }}
                  bordered={false}
                  defaultValue={defaultValue}
                  onChange={(value) =>
                    onSizeChange(value, setListSize, setPageNumber)
                  }
                >
                  {entryOptions?.map((count) => (
                    <Option value={count.toString()}>{count}</Option>
                  ))}
                </Select>
              </div>{" "}
              of {total} Entries
            </div>
            <div>
              <Pagination
                className={`${styles.pagination}`}
                onChange={(pageNumber) => setPageNumber(pageNumber)}
                total={total}
                hideOnSinglePage={true}
                pageSize={listSize}
                current={pageNumber}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
