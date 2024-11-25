import { useEffect, useState } from "react";
import { useStore } from "./useStore";
import axios from "axios";

const filters = ["date-range", "exact-date", "earlier-than", "later-than"];
const roles = ["Участник", "Истец", "Ответчик"];

export const useAdvancedSearchState = () => {
  const { state, dispatch } = useStore();

  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [caseText, setCaseText] = useState("");
  const [productionTypes, setProductionTypes] = useState([""]);
  const [productionType, setProductionType] = useState(productionTypes[0]);

  const [caseNumber, setCaseNumber] = useState();
  const [uid, setUid] = useState();

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [singleDate, setSingleDate] = useState();

  const [courts, setCourts] = useState([""]);
  const [court, setCourt] = useState(courts[0]);
  const [judges, setJudges] = useState([""]);
  const [judge, setJudge] = useState(judges[0]);

  const [disputant, setDisputant] = useState("");

  const [selectedRole, setSelectedRole] = useState(roles[0]);

  const onCaseTextChange = (e) => {
    setCaseText(e.target.value);
  };

  const onProductionTypeChange = (e) => {
    setProductionType(e.target.value);
    console.log(e.target.value);
  };

  const onCaseNumberChange = (e) => {
    setCaseNumber(e.target.value);
  };

  const onUidChange = (e) => {
    setUid(e.target.value);
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const handleClear = () => {
    setCourt(courts[0]);
    setJudge(judges[0]);
    setDisputant("");
    setSingleDate("");
    setStartDate("");
    setEndDate("");
    setSelectedFilter(filters[0]);
    setCaseNumber("");
    setCaseText("");
    setProductionType(productionTypes[0]);
    setUid("");
  };

  // Фетч данных
  useEffect(() => {
    if (state.judges.length === 0) {
      try {
        axios
          .post("https://lawrs.ru:8000/api/count_cases_add/search", {
            list_judge: true,
          })
          .then((r) => {
            dispatch({
              type: "judges-set",
              payload: ["", ...r.data.map((x) => x.judge)],
            });
            setJudges(["", ...r.data.map((x) => x.judge)]);
          });
      } catch (e) {
        console.log("Ошибка при получении данных useAdvancedSearchState ", e);
      }
    } else {
      setJudges(state.judges);
    }

    if (state.courts.length === 0) {
      try {
        axios
          .post("https://lawrs.ru:8000/api/count_cases_add/search", {
            list_court: true,
          })
          .then((r) => {
            dispatch({
              type: "courts-set",
              payload: ["", ...r.data.map((x) => x.court)],
            });
            setCourts(["", ...r.data.map((x) => x.court)]);
          });
      } catch (e) {
        console.log("Ошибка при получении данных useAdvancedSearchState ", e);
      }
    } else {
      setCourts(state.courts);
    }
  }, []);

  return {
    selectedFilter,
    caseText,
    onCaseTextChange,
    productionType,
    onProductionTypeChange,
    productionTypes,
    caseNumber,
    onCaseNumberChange,
    uid,
    onUidChange,
    handleFilterChange,
    filters,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    singleDate,
    setSingleDate,
    court,
    setCourt,
    judge,
    setJudge,
    courts,
    judges,
    disputant,
    setDisputant,
    handleClear,
    selectedRole,
    setSelectedRole,
    roles,
  };
};
