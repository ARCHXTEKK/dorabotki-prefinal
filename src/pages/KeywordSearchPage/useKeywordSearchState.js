import axios from "axios";
import { useEffect, useState } from "react";
import { useStore } from "../../lib/store/useStore";

export const useKeywordSearchState = () => {
  const { state, dispatch } = useStore();

  const [searchValue, setSearchValue] = useState("");

  const isKeywordsUnassigned = Object.keys(state.keywordsData).length === 0;

  const [dataByLetter, setDataByLetter] = useState(
    isKeywordsUnassigned ? {} : state.keywordsData
  );

  const [selectedGroup, setSelectedGroup] = useState(0);

  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredData = (data, searchQuery) => {
    let newData = {};

    for (let letter in data) {
      newData[letter] = data[letter].filter(
        (y) =>
          y.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          searchQuery === ""
      );
    }

    return newData;
  };

  const handlePrevGroup = () => {
    setSelectedGroup((prev) => prev - 1);
  };

  const handleNextGroup = () => {
    setSelectedGroup((prev) => prev + 1);
  };

  const onGroupSelect = (index) => {
    setSelectedGroup(index);
  };

  useEffect(() => {
    if (isKeywordsUnassigned) {
      try {
        axios
          .post(`https://lawrs.ru:8000/api/count_cases_add/word`, {
            word: true,
          })
          .then((response) => {
            console.log(response);
            setDataByLetter(response.data);
            dispatch({ type: "keywords-set", payload: response.data });
          });
      } catch {}
    }
  }, []);

  return {
    searchValue,
    onSearch,
    selectedGroup,
    handleNextGroup,
    handlePrevGroup,
    onGroupSelect,
    // dataByLetter: filteredData(dataByLetter, searchValue),
    dataByLetter,
  };
};
