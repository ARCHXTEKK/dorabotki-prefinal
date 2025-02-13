import React, { useEffect } from "react";

import {
  useActiveVkuiLocation,
  useGetPanelForView,
} from "@vkontakte/vk-mini-apps-router";

import { Panel, Root, View } from "@vkontakte/vkui";

import WelcomePage from "./pages/WelcomePage";
import RubricatorPage from "./pages/RubricatorPage";
import KeywordSearchPage from "./pages/KeywordSearchPage";
import LawSearchPage from "./pages/LawSearchPage";
import AdvancedSearchPage from "./pages/AdvancedSearchPage";
import ResultsSearchPage from "./pages/ResultsSearchPage";
import CaseDetailsPage from "./pages/CaseDetailsPage";
import LawDetailsPage from "./pages/LawDetailsPage";
import axios from "axios";

import { useStore } from "./lib/store/useStore";
import LetterSearchPage from "./pages/LetterSearchPage";

import "./styles.css";
import { setupCache } from "axios-cache-adapter";

export default function App() {
  const { dispatch } = useStore();

  const activePanel = useGetPanelForView("default_view");
  const { view: activeView } = useActiveVkuiLocation();

  const cache = setupCache({
    maxAge: 2 * 60 * 60 * 1000
  })

  useEffect(() => {
    axios
      .get("https://lawrs.ru/legal_main/api/categories/?page=1", { adapter: cache.adapter })
      .then((r) => {
        dispatch({ type: "categories-set", payload: r.data.results });
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <Root activeView={activeView}>
      <View nav="default_view" activePanel={activePanel}>
        <Panel nav="welcome-panel">
          <WelcomePage />
        </Panel>
        <Panel nav="rubricator-panel">
          <RubricatorPage />
        </Panel>
        <Panel nav="case-details-panel">
          <CaseDetailsPage />
        </Panel>
        <Panel nav="keyword-search-panel">
          <KeywordSearchPage />
        </Panel>
        <Panel nav="keyword-letter-panel">
          <LetterSearchPage />
        </Panel>
        <Panel nav="law-search-panel">
          <LawSearchPage />
        </Panel>
        <Panel nav="law-details-panel">
          <LawDetailsPage />
        </Panel>
        <Panel nav="advanced-search-panel">
          <AdvancedSearchPage />
        </Panel>
        <Panel nav="search-results-panel">
          <ResultsSearchPage />
        </Panel>
      </View>
    </Root>
  );
}
