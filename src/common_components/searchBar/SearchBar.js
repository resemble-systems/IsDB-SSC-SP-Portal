import React from "react";
import { Input, Space } from "antd";
import styles from "./searchBar.module.sass";
import { useHistory } from "react-router-dom";

const SearchBar = () => {
  const { Search } = Input;
  const history = useHistory();

  console.log("searchBar");

  const onSearch = (value) => {
    if (value && value.length > 0) {
      // history.push({
      //   pathname: `/search?type=events&${value}`,
      //   state: {
      //     data: value,
      //   },
      // });
      // navigate(`/search?type=events&${value}`);
      history.push(`/search?type=events&${value}`);
    }
  };

  return (
    <div
      className={`position-relative d-flex justify-content-center ${styles.searchBar} ${styles.inputField}`}
    >
      <Space direction="vertical">
        <Search
          placeholder="search "
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </Space>
    </div>
  );
};

export default SearchBar;
