import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import useDeepCompareEffect from "../../lib/hooks/useDeepCompareEffect";

const caseTypes = ["решение", "приговор", "апелляционное постановление"];

export const useSearchResultsState = (initFilters) => {

  if (!initFilters) {
    initFilters = {}
  }

  const [data, setData] = useState([]);

  const [filters, setFilters] = useState(initFilters);

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

  let productionTypes = [];

  caseTypes.some((x) => x === filters.productionType) &&
    productionTypes.push(caseTypes.find((x) => x === filters.productionType));

  displayOptionsState[0] && productionTypes.push(caseTypes[0]);
  displayOptionsState[1] && productionTypes.push(caseTypes[1]);
  displayOptionsState[2] && productionTypes.push(caseTypes[2]);

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

  const onPageChange = (page, forceNew = false) => {
    page += 1;
    setCurrentPage(page);

    setCurrentItems([currentItems[0], []])


    if (currentItems[0][page] && !forceNew) {
      setCurrentItems([currentItems[0], currentItems[0][page]]);
    } else {
      let params = {}
      if (filters.caseText) {
        params.document_text = filters.caseText.charAt(0).toUpperCase() + filters.caseText.slice(1)
      }
      if (filters.caseNumber) {
        params.case_number = filters.caseNumber
      }
      if (filters.court) {
        params.court = filters.court
      }
      if (filters.judge) {
        params.judge = filters.judge
      }
      if (filters.productionType) {
        params.case_type = filters.productionType
      }


      axios
        .post(
          `https://lawrs.ru/legal_main/api/count_cases_add/search?page=${page}&size=4`,
          params
        )
        .then((r) => {
          let newCached = currentItems[0] ? [...currentItems[0]] : [];
          newCached[page] = r.data.data;
          setCurrentItems([newCached, r.data.data]);
        });
    }
    // setCurrentItems([currentItems[0], slicedContent(currentItems[0], page)]);
  };

  /* const slicedContent = (content, page) => {
  //   return content.slice(4 * page, 4 * (page + 1));
  // };
  // useEffect(() => {
  //   setTotalPages(0);
  //   setCurrentPage(0);
  //   forceUpdate();
  //   if (filters) {
  //     setCurrentItems([[], []]);
  //     axios
  //       .post(
  //         "https://lawrs.ru/legal_main/api/count_cases_add/search?page=1&size=1",
  //         {
  //           document_text: filters?.caseText,
  //           case_number: filters?.caseNumber,
  //           court: filters?.court,
  //           judge: filters?.judge,
  //           case_type: filters?.productionType,

  //           // court: filters.court ? filters.court : "",
  //           // judge: filters.judge ? filters.judge : "",
  //           // production_type: filters.production_type ? filters.judge : "",
  //           // disputant: filters.disputant ? filters.disputant : "",
  //         }
  //       )
  //       .then((r) => {
  //         setTotalPages(Math.ceil(r.data.length / 4));
  //         setData(r.data);
  //         console.log(r);
  //         setCurrentItems([r.data, slicedContent(r.data, currentPage)]);
  //       })
  //       .catch((e) => {
  //         console.error(
  //           "Ошибка при получении данных useSearchResultsState ",
  //           e
  //         );
  //       });
  //   }
  // }, [filters]);*/

  /**
   * deepCompare для того чтобы избежать лишнего вызова эффекта из за изменения ссылки на объект в зависимостях.
  */
  useDeepCompareEffect(() => {

    setTotalPages(1);
    setCurrentPage(1);

    setCurrentItems([currentItems[0], []])



    if (Object.keys(initFilters).length !== 0) {

      let params = {}
      if (filters.caseText) {
        params.document_text = filters.caseText.charAt(0).toUpperCase() + filters.caseText.slice(1)
      }
      if (filters.caseNumber) {
        params.case_number = filters.caseNumber
      }
      if (filters.court) {
        params.court = filters.court
      }
      if (filters.judge) {
        params.judge = filters.judge
      }
      if (filters.productionType) {
        params.case_type = filters.productionType.charAt(0).toUpperCase() + filters.productionType.slice(1)
      }

      axios
        .post(
          "https://lawrs.ru/legal_main/api/count_cases_add/search?page=1&size=4",
          params

        )
        .then((r) => {
          setTotalPages(Math.ceil(r.data.count / 4));
          let newCached = currentItems[0] ? [...currentItems[0]] : [];
          newCached[1] = r.data.data;
          setCurrentItems([newCached, r.data.data]);
        });
    }

  }, [initFilters, displayOptionsState]);

  const filterData = (options) => {
    setFilters((prev) => {
      return { ...prev };
    });
    // const filteredCaseTypes = caseTypes.filter((x, i) => options[i]);
    //
    // const newItems = data.filter((x) =>
    //   filteredCaseTypes.includes(x.case_type.toLowerCase())
    // );
    //
    // const newTotalPages = Math.ceil(newItems.length / 4);
    //
    // setCurrentPage(0);
    // setTotalPages(newTotalPages);
    // setCurrentItems([newItems, slicedContent(newItems, 0)]);
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
