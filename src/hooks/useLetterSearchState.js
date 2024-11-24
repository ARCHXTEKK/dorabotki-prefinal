import { useState } from "react";
import { useStore } from "./useStore";

export const useLetterSearchState = (letter) => {
  const { state, dispatch } = useStore();
  const data = state.keywordsData[letter];

  const [searchValue, setSearchValue] = useState();

  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return {
    data,
    searchValue,
    onSearch,
  };
};
