import React from "react";
import { createRoot } from "react-dom/client";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import "./styles.css";
import { AdaptivityProvider, AppRoot, ConfigProvider } from "@vkontakte/vkui";

import {
  createHashParamRouter,
  RouterProvider,
} from "@vkontakte/vk-mini-apps-router";
import { StoreProvider } from "./hooks/useStore";

// Инициализация VK Bridge
bridge.send("VKWebAppInit");

const root = createRoot(document.getElementById("root"));

const router = createHashParamRouter([
  {
    path: "/",
    panel: "welcome-panel",
    view: "default_view",
  },
  {
    path: "/rubricator",
    panel: "rubricator-panel",
    view: "default_view",
  },
  {
    path: "/rubricator/casedetails/:id",
    panel: "case-details-panel",
    view: "default_view",
  },
  {
    path: "/keywordsearch",
    panel: "keyword-search-panel",
    view: "default_view",
  },
  {
    path: "/keywordsearch/:letter",
    panel: "keyword-letter-panel",
    view: "default_view",
  },
  {
    path: "/lawsearch",
    panel: "law-search-panel",
    view: "default_view",
  },
  {
    path: "/lawsearch/lawdetails/:id",
    panel: "law-details-panel",
    view: "default_view",
  },
  {
    path: "/advancedsearch",
    panel: "advanced-search-panel",
    view: "default_view",
  },
  {
    path: "/searchresults",
    panel: "search-results-panel",
    view: "default_view",
  },
]);

root.render(
  <ConfigProvider appearance="light">
    <AdaptivityProvider>
      <AppRoot mode="embedded">
        <RouterProvider router={router}>
          <StoreProvider>
            <App />
          </StoreProvider>
        </RouterProvider>
      </AppRoot>
    </AdaptivityProvider>
  </ConfigProvider>
);
