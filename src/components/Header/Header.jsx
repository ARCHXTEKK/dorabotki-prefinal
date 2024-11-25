import React from "react";
import { PanelHeader } from "@vkontakte/vkui";
import clearlogo from "../../assets/clearlogo.png";
import {
  useGetPanelForView,
  useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";

export default function Header({ forceActiveTab = null }) {
  const routeNavigator = useRouteNavigator();
  const activePanel = useGetPanelForView("default_view");

  return (
    <PanelHeader delimiter="auto">
      <div className="header-center buttons-group">
        <div className="header-left">
          <img src={clearlogo} alt="Logo" className="logo" />
        </div>
        <div className="header-navigation button-wrapper">
          <div
            size="m"
            mode={
              activePanel === "rubricator-panel" || forceActiveTab === 0
                ? "primary"
                : "secondary"
            }
            onClick={() => routeNavigator.push("/rubricator")}
            className={
              "left-button " +
              (activePanel === "rubricator-panel" || forceActiveTab === 0
                ? "primary"
                : "secondary")
            }
          >
            Рубрикатор
          </div>
          <div
            size="m"
            mode={
              activePanel === "keyword-search-panel" || forceActiveTab === 1
                ? "primary"
                : "secondary"
            }
            onClick={() => routeNavigator.push("/keywordsearch")}
            className={
              "button-keyword " +
              (activePanel === "keyword-search-panel" || forceActiveTab === 1
                ? "primary"
                : "secondary")
            }
          >
            Поиск по ключевым словам
          </div>
          <div
            size="m"
            mode={
              activePanel === "law-search-panel" || forceActiveTab === 2
                ? "primary"
                : "secondary"
            }
            onClick={() => routeNavigator.push("/lawsearch")}
            className={
              "button-lawsearch " +
              (activePanel === "law-search-panel" || forceActiveTab === 2
                ? "primary"
                : "secondary")
            }
          >
            Поиск по норме права
          </div>
          <div
            size="m"
            mode={
              activePanel === "advanced-search-panel" || forceActiveTab === 3
                ? "primary"
                : "secondary"
            }
            onClick={() => routeNavigator.push("/advancedsearch")}
            className={
              "right-button " +
              (activePanel === "advanced-search-panel" || forceActiveTab === 3
                ? "primary"
                : "secondary")
            }
          >
            Расширенный поиск
          </div>
        </div>
      </div>
    </PanelHeader>
  );
}
