import React from "react";
import { Input, Space } from "antd";
import { useHistory } from "react-router-dom";

const SearchBar = ({ styleApply, search }) => {
  const { Search } = Input;
  const history = useHistory();

  const onSearch = (value) => {
    const trimmedValue = value.trim();

    if (trimmedValue) {
      history.push(
        search === "events"
          ? `/search?type=events&${trimmedValue}`
          : search === "news"
          ? `/search?type=news&${trimmedValue}`
          : ""
      );
    }
  };

  return (
    <div>
      <Space direction="vertical">
        <Search
          placeholder={`search ${search}`}
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </Space>
    </div>
  );
};

export default SearchBar;
