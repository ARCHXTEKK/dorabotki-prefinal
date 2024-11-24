import { useEffect, useState } from "react";

const filters = ["date-range", "exact-date", "earlier-than", "later-than"];
const roles = ["Участник", "Истец", "Ответчик"];

export const useAdvancedSearchState = () => {
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [caseText, setCaseText] = useState("");
  const [productionTypes, setProductionTypes] = useState([
    "",
    "Вид 1",
    "Вид 2",
  ]);
  const [productionType, setProductionType] = useState(productionTypes[0]);

  const [caseNumber, setCaseNumber] = useState();
  const [uid, setUid] = useState();

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [singleDate, setSingleDate] = useState();

  const [courts, setCourts] = useState(["", "Суд 1", "Суд 2"]);
  const [court, setCourt] = useState(courts[0]);
  const [judges, setJudges] = useState(["", "Судья 1", "судья 2"]);
  const [judge, setJudge] = useState(judges[0]);

  const [disputants, setDisputants] = useState(["", 0, 1, 2, 3]);
  const [disputant, setDisputant] = useState(disputants[0]);

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
    setDisputant(disputants[0]);
    setSingleDate("");
    setStartDate("");
    setEndDate("");
    setSelectedFilter(filters[0]);
    setCaseNumber("");
    setCaseText("");
    setProductionType(productionTypes[0]);
    setUid("");
  };

  // Фетч данных о видах судопроизводства
  useEffect(() => {}, []);

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
    disputants,
    disputant,
    setDisputant,
    handleClear,
    selectedRole,
    setSelectedRole,
    roles,
  };
};
