import { useEffect, useState } from "react";
import axios from "axios";
import { useStore } from "../../../lib/store/useStore";

const filters = ["date-range", "exact-date", "earlier-than", "later-than"];
const roles = ["", "Истец", "Ответчик"];

export const useAdvancedSearchState = () => {
  const { state, dispatch } = useStore();

  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [productionTypes, setProductionTypes] = useState([""]);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [singleDate, setSingleDate] = useState();

  const [courts, setCourts] = useState([""]);

  const [judges, setJudges] = useState([""]);

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const handleClear = () => {
    setSingleDate("");
    setStartDate("");
    setEndDate("");
    setSelectedFilter(filters[0]);
  };

  // const [selectState, setSelectState] = useState([false, false, false, false]);

  // const onSelect = (ind) => {
  //   let newState = [...selectState];

  //   newState[ind] = !newState[ind];

  //   setSelectState(newState);
  // };

  // Фетч данных
  const timeout = 5000;

  useEffect(() => {
    if (state.judges.length === 0) {
      axios
        .post(
          "https://lawrs.ru:8000/api/count_cases_add/search",
          {
            list_judge: true,
          },
          { timeout }
        )
        .then((r) => {
          dispatch({
            type: "judges-set",
            payload: ["", ...r.data.map((x) => x.judge)],
          });
          setJudges(["", ...r.data.map((x) => x.judge)]);
        })
        .catch((e) => {
          console.log("Ошибка при получении данных useAdvancedSearchState ", e);
        });
    } else {
      setJudges(state.judges);
    }
    if (state.courts.length === 0) {
      axios
        .post(
          "https://lawrs.ru:8000/api/count_cases_add/search",
          {
            list_court: true,
          },

          { timeout }
        )
        .then((r) => {
          dispatch({
            type: "courts-set",
            payload: ["", ...r.data.map((x) => x.court)],
          });
          setCourts(["", ...r.data.map((x) => x.court)]);
        })
        .catch((e) => {
          console.log("Ошибка при получении данных useAdvancedSearchState ", e);
        });
    } else {
      setCourts(state.courts);
    }
    if (productionTypes.length < 2) {
      axios
        .get(`https://lawrs.ru:8000/api/categories/?page=1`, { timeout })
        .then((response) => {
          let res = [];
          response.data.results.forEach((el) => {
            res.push(el.name);
            el.subcategories.forEach((el_2) => {
              res.push(el_2.name);
            });
          });
          dispatch({ type: "production-types-set", payload: ["", ...res] });
          setProductionTypes(["", ...res]);
        })
        .catch((e) => {
          console.log("Ошибка при получении данных useAdvancedSearchState ", e);
        });
    } else {
      setProductionTypes(state.productionTypes);
    }
  }, []);

  return {
    selectedFilter,
    productionTypes,
    handleFilterChange,
    filters,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    singleDate,
    setSingleDate,
    courts,
    judges,
    handleClear,
    roles,
  };
};
