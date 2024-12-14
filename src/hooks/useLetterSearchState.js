import { useEffect, useState } from "react";
import { useStore } from "./useStore";

export const useLetterSearchState = (letter) => {
  const { state, dispatch } = useStore();

  const [data, setData] = useState(state.keywordsData[letter]);

  useEffect(() => {
    setData(state.keywordsData[letter]);
  }, [letter, state.keywordsData]);

  const [searchValue, setSearchValue] = useState();

  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const filterData = (data) => {
    if (data && searchValue) {
      let newData = [...data];
      newData = newData.filter((x) =>
        x.toLowerCase().includes(searchValue.toLowerCase())
      );

      return newData;
    }
    return data;
  };

  const filteredData = filterData(data);

  return {
    data: filteredData,
    searchValue,
    onSearch,
  };
};
