import {
  useActiveVkuiLocation,
  useGetPanelForView,
  useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";
import {
  ModalCard,
  ModalRoot,
  Panel,
  Root,
  SplitLayout,
  View,
} from "@vkontakte/vkui";
import React, { useEffect } from "react";
import "./styles.css";
import WelcomePage from "./pages/WelcomePage";
import RubricatorPage from "./pages/RubricatorPage";
import KeywordSearchPage from "./pages/KeywordSearchPage";
import LawSearchPage from "./pages/LawSearchPage";
import AdvancedSearchPage from "./pages/AdvancedSearchPage";
import ResultsSearchPage from "./pages/ResultsSearchPage";
import CaseDetailsPage from "./pages/CaseDetailsPage";
import LawDetailsPage from "./pages/LawDetailsPage";
import axios from "axios";

import { useStore } from "./hooks/useStore";
import LetterSearchPage from "./pages/LetterSearchPage";

export default function App() {
  const { dispatch } = useStore();

  const activePanel = useGetPanelForView("default_view");
  const { view: activeView } = useActiveVkuiLocation();

  useEffect(() => {
    try {
      axios.get("https://lawrs.ru:8000/api/categories/?page=1").then((r) => {
        dispatch({ type: "categories-set", payload: r.data.results });
      });
    } catch {}
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
