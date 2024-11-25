import axios from "axios";
import { useEffect, useReducer, useState } from "react";

export const useSearchResultsState = (filters) => {
  const [currentItems, setCurrentItems] = useState([[], []]);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [showDisplayOptions, setShowDisplayOptions] = useState(false);

  const [displayOptionsState, setDisplayOptionsState] = useState([
    true,
    true,
    true,
  ]);

  const onDisplayOptionToggle = (num) => {
    let newOptions = displayOptionsState;
    newOptions[num] = !newOptions[num];
    setDisplayOptionsState(newOptions);
    forceUpdate(0);
  };

  const onDisplayOptionsClick = () => {
    setShowDisplayOptions((prev) => !prev);
  };

  const onClickOutside = (e) => {
    const el1 = e.target.closest(".display-button-details");
    const el3 = e.target.closest(".options-container");
    if (!el1 && !el3) {
      console.log("that must be false");
      setShowDisplayOptions(false);
    }
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
    setCurrentItems([currentItems[0], slicedContent(currentItems[0], page)]);
  };

  const slicedContent = (content, page) => {
    return content.slice(4 * page, 4 * (page + 1));
  };

  useEffect(() => {
    try {
      axios
        .post("https://lawrs.ru:8000/api/count_cases_add/search", {
          params: {
            document_text: filters.caseText,
            court: filters.court,
            judge: filters.judge,
          },
        })
        .then((r) => {
          setTotalPages(Math.ceil(r?.data.length / 4));
          setCurrentItems([r.data, slicedContent(r.data, currentPage)]);
        });
    } catch (e) {
      console.error("Ошибка при получении данных useSearchResultsState ", e);
    }
  }, [filters]);

  return {
    currentItems: currentItems[1],
    totalPages,
    onPageChange,
    showDisplayOptions,
    onDisplayOptionsClick,
    displayOptionsState,
    onDisplayOptionToggle,
    onClickOutside,
  };
};
