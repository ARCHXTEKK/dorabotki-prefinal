import { useState } from "react";
import { useStore } from "./useStore";

export const useLetterSearchState = (letter) => {
  const { state, dispatch } = useStore();
  const data = state.keywordsData[letter];

  const [searchValue, setSearchValue] = useState();

  const [filteredData, setFilteredData] = useState(data);

  const onSearch = (e) => {
    setSearchValue(e.target.value);
    let newData = [...data];
    newData = newData.filter((x) =>
      x.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(newData);
  };

  return {
    data: filteredData,
    searchValue,
    onSearch,
  };
};
