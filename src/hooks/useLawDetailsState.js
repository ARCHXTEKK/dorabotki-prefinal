import { useEffect, useReducer, useState } from "react";
import { useStore } from "./useStore";
import axios from "axios";

export const useLawDetailsState = (id) => {
  const { state, dispatch } = useStore();

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const [searchContent, setSearchContent] = useState("");

  const [selectedLaw, setSelectedLaw] = useState({});

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

  const onSearch = (e) => {
    setSearchContent(e.target.value);
  };

  const onClickOutside = (e) => {
    const el1 = e.target.closest(".display-button-details");
    const el3 = e.target.closest(".options-container");
    if (!el1 && !el3) {
      setShowDisplayOptions(false);
    }
  };

  useEffect(() => {
    // if (id) {
    //   axios
    //     .post(
    //       "https://lawrs.ru:8000/api/count_cases_add/get_document_court_list/" +
    //         id
    //     )
    //     .then((r) => {
    //       setSelectedLaw(r.data);
    //       console.log(r);
    //     });
    // }
    setSelectedLaw(state.lawsData.find((x) => x.id === parseInt(id)));
  }, [state.lawsData, id]);

  return {
    searchContent,
    onSearch,
    showDisplayOptions,
    onDisplayOptionsClick,
    selectedLaw,
    displayOptionsState,
    onDisplayOptionToggle,
    onClickOutside,
  };
};
