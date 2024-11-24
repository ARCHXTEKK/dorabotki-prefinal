import axios from "axios";
import { useEffect, useState } from "react";
import { useStore } from "./useStore";

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

  const handleSubmit = () => {
    // передать значение searchValue
    axios.post("").then((resp) => {
      setDataByLetter(resp); // изменить так чтобы получать категории
    });
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
            setDataByLetter(response.data);
            dispatch({ type: "keywords-set", payload: response.data });
          });
      } catch {}
    }
  }, []);

  return {
    searchValue,
    onSearch,
    handleSubmit,
    selectedGroup,
    handleNextGroup,
    handlePrevGroup,
    onGroupSelect,
    dataByLetter,
  };
};
