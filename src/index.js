import React from "react";
import { createRoot } from "react-dom/client";
import bridge from "@vkontakte/vk-bridge";

import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  usePlatform,
} from "@vkontakte/vkui";

import {
  createHashParamRouter,
  RouterProvider,
} from "@vkontakte/vk-mini-apps-router";
import { useInsets } from "@vkontakte/vk-bridge-react";

import App from "./App";
import PassContextProvider from "./lib/other/passContext";
import { StoreProvider } from "./lib/store/useStore";

import "./styles.css";

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

const Root = () => {
  const vkBridgeInsets = useInsets();
  const platform = usePlatform();

  return (
    <ConfigProvider appearance="light" platform={platform}>
      <AdaptivityProvider>
        <AppRoot mode="full" safeAreaInsets={vkBridgeInsets}>
          <RouterProvider router={router}>
            <StoreProvider>
              <PassContextProvider>
                <App />
              </PassContextProvider>
            </StoreProvider>
          </RouterProvider>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

root.render(<Root />);
