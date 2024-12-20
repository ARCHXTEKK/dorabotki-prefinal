import axios from "axios";
import { useEffect, useReducer, useState } from "react";

const caseTypes = ["решение", "приговор", "апелляционное постановление"];

export const useSearchResultsState = (filters) => {
  const [data, setData] = useState([]);

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

    filterData(newOptions);

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
    setTotalPages(0);
    setCurrentPage(0);
    forceUpdate();
    if (filters) {
      setCurrentItems([[], []]);
      console.log("idk");
      axios
        .post("https://lawrs.ru:8000/api/count_cases_add/search", {
          document_text: filters?.caseText,
          case_number: filters?.caseNumber,
          court: filters?.court,
          judge: filters?.judge,
          case_type: filters?.productionType,

          // court: filters.court ? filters.court : "",
          // judge: filters.judge ? filters.judge : "",
          // production_type: filters.production_type ? filters.judge : "",
          // disputant: filters.disputant ? filters.disputant : "",
        })
        .then((r) => {
          setTotalPages(Math.ceil(r.data.length / 4));
          setData(r.data);
          console.log(r);
          setCurrentItems([r.data, slicedContent(r.data, currentPage)]);
        })
        .catch((e) => {
          console.error(
            "Ошибка при получении данных useSearchResultsState ",
            e
          );
        });
    }
  }, [filters]);

  const filterData = (options) => {
    const filteredCaseTypes = caseTypes.filter((x, i) => options[i]);

    const newItems = data.filter((x) =>
      filteredCaseTypes.includes(x.case_type.toLowerCase())
    );

    const newTotalPages = Math.ceil(newItems.length / 4);

    setCurrentPage(0);
    setTotalPages(newTotalPages);
    setCurrentItems([newItems, slicedContent(newItems, 0)]);
  };

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
