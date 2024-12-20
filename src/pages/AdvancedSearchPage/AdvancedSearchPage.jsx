import React from "react";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import "react-datepicker/dist/react-datepicker.css";

import Page from "../../shared/Page/";
import Title from "./components/Title";
import Warning from "./components/Warning";
import AdvancedForm from "./components/AdvancedForm";

export default function AdvancedSearchPage() {
  const routeNavigator = useRouteNavigator();

  const handleSubmit = (e) => {
    const formData = new FormData(e.target);
    const {
      caseText,
      disputant,
      productionType,
      uid,
      caseNumber,
      court,
      judge,
      startDate,
      endDate,
      singleDate,
    } = Object.fromEntries(formData);

    routeNavigator.push(
      "/searchresults",
      {
        state: {
          caseText,
          disputant,
          productionType,
          uid,
          caseNumber,
          court,
          judge,
          startDate,
          endDate,
          singleDate,
        },
      },
      { keepSearchParams: true }
    );
  };

  return (
    <Page>
      <Title />
      <Warning />
      <AdvancedForm handleSubmit={handleSubmit} />
    </Page>
  );
}
