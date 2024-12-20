import React from "react";
import { useAdvancedSearchState } from "./hooks/useAdvancedSearchState";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import DatePicker, { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";

import "react-datepicker/dist/react-datepicker.css";

import downicon from "../../assets/images/downicon.png";
import dataicon from "../../assets/images/dataicon.png";
import Page from "../../shared/Page/";
import Title from "./components/Title";
import Warning from "./components/Warning";
import { AdvancedStoreProvider } from "./hooks/useAdvancedStore";
import AdvancedButtons from "./components/AdvancedButtons";
import AdvancedForm from "./components/AdvancedForm";

registerLocale("ru", ru);

// caseText,
// onCaseTextChange,
// productionType,
// onProductionTypeChange,
// caseNumber,
// onCaseNumberChange,
// uid,
// onUidChange,
// filters,
// handleFilterChange,
// startDate,
// setStartDate,
// endDate,
// setEndDate,
// singleDate,
// setSingleDate,
// court,
// setCourt,
// judge,
// setJudge,
// setSelectedRole,
// selectState,
// setSelectState,
// selectState2,
// setSelectState2,
// selectState3,
// setSelectState3,
// selectState4,
// setSelectState4,

export default function AdvancedSearchPage() {
  const {
    selectedFilter,
    productionTypes,
    courts,
    judges,
    disputant,
    setDisputant,
    handleClear,
    selectedRole,
    roles,
    //---------------------------------------
    // --------------------------------------
    caseText,
    onCaseTextChange,
    productionType,
    onProductionTypeChange,
    caseNumber,
    onCaseNumberChange,
    uid,
    onUidChange,
    filters,
    handleFilterChange,
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
    setSelectedRole,
    selectState,
    setSelectState,
    selectState2,
    setSelectState2,
    selectState3,
    setSelectState3,
    selectState4,
    setSelectState4,
  } = useAdvancedSearchState();

  const routeNavigator = useRouteNavigator();

  const handleSubmit = () => {
    routeNavigator.push(
      "/searchresults",
      {
        state: {
          selectedFilter,
          caseText,
          productionType,
          caseNumber,
          startDate,
          endDate,
          singleDate,
          court,
          judge,
          disputant,
          uid,
          selectedRole,
        },
      },
      { keepSearchParams: true }
    );
  };

  return (
    <AdvancedStoreProvider>
      <Page>
        <Title />
        <Warning />
        <AdvancedForm />
        <AdvancedButtons
          handleClear={handleClear}
          handleSubmit={handleSubmit}
        />
      </Page>
    </AdvancedStoreProvider>
  );
}
