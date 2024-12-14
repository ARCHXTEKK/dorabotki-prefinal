import React, { useState } from "react";
import { PanelHeader } from "@vkontakte/vkui";
import clearlogo from "../../assets/clearlogo.png";
import {
  useGetPanelForView,
  useRouteNavigator,
} from "@vkontakte/vk-mini-apps-router";
import BurgerIcon from "../../assets/burgerIcon";

export default function Header({ forceActiveTab = null }) {
  const routeNavigator = useRouteNavigator();
  const activePanel = useGetPanelForView("default_view");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleClickOutside = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div
      className={
        "header-center buttons-group " + (mobileMenuOpen ? "active" : "")
      }
    >
      <div className="outside-content" onClick={handleClickOutside}></div>
      <div className="header-left">
        <img src={clearlogo} alt="Logo" className="logo" />
      </div>
      <div className={"header-navigation " + (mobileMenuOpen ? "active" : "")}>
        <div className="button-wrapper">
          <div
            size="m"
            mode={
              activePanel === "rubricator-panel" || forceActiveTab === 0
                ? "primary"
                : "secondary"
            }
            onClick={() => routeNavigator.push("/rubricator")}
            className={
              "header-button " +
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
              "header-button " +
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
              "header-button " +
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
              "header-button " +
              (activePanel === "advanced-search-panel" || forceActiveTab === 3
                ? "primary"
                : "secondary")
            }
          >
            Расширенный поиск
          </div>
        </div>
      </div>
      <button
        className={"mobile-burger " + (mobileMenuOpen ? "active" : "")}
        onClick={() => setMobileMenuOpen((prev) => !prev)}
      >
        <BurgerIcon />
      </button>
    </div>
  );
}
