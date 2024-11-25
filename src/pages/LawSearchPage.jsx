import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Icon28SearchOutline } from "@vkontakte/icons";
import { useLawSearchState } from "../hooks/useLawSearchState";

import displayicon from "../assets/displayicon.png";
import downicon from "../assets/downicon.png";
import sorticon from "../assets/sorticon.png";
import popupicon1 from "../assets/popupicon1.png";
import popupicon2 from "../assets/popupicon2.png";
import popupicon3 from "../assets/popupicon3.png";
import Pagination from "../ui/Pagination";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import constitution from "../assets/constitution.png";
import fileicon from "../assets/fileicon.png";
import bookicon from "../assets/bookicon.png";
import ShowIcon from "./../assets/ShowIcon";

export default function LawSearchPage() {
  const {
    searchContent,
    onSearch,
    showDisplayOptions,
    onDisplayOptionsClick,
    displayOptionsState,
    onDisplayOptionToggle,
    showSortOptions,
    onSortOptionsClick,
    onSortOptionToggle,
    totalPages,
    onPageChange,
    content,
    onClickOutside,
  } = useLawSearchState();

  const routeNavigator = useRouteNavigator();

  const handleLawClick = (id) => {
    routeNavigator.push("/lawsearch/lawdetails/:id", {
      id,
    });
  };

  return (
    <div className="app-wrapper" onClick={onClickOutside}>
      <Header />
      <main className="page-content">
        <div className="row">
          <h2 className="page-title">Поиск по норме права</h2>

          <div className="law-search-input-wrapper">
            <Icon28SearchOutline style={{ paddingLeft: "6px" }} />
            <input
              type="text"
              placeholder="Начните вводить статью..."
              value={searchContent}
              onChange={onSearch}
              className="law-search-input"
            />
          </div>
        </div>
        <div className="law-search-controls">
          <div className="law-search-buttons">
            <div className="display-button-details">
              <button
                onClick={onDisplayOptionsClick}
                className="uibtn uibtn--outline uibtn--select"
              >
                Отображение
                <ShowIcon className="uibtn__icon left show-icon " />
                <img
                  src={downicon}
                  alt="downicon"
                  className={
                    "uibtn__select-icon" +
                    (!showDisplayOptions ? " rotated" : "")
                  }
                  height={6}
                />
              </button>
              <div
                className={
                  "options-container fade-top " +
                  (!showDisplayOptions && "hidden-animate-fade-top")
                }
              >
                <ul>
                  <li>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={displayOptionsState[0]}
                        onChange={() => onDisplayOptionToggle(0)}
                      />
                      <span className="switch" />
                      <span style={{ width: "95px" }}>Конституция</span>
                    </label>
                  </li>
                  <li>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={displayOptionsState[1]}
                        onChange={() => onDisplayOptionToggle(1)}
                      />
                      <span className="switch" />
                      <span style={{ width: "95px" }}>Кодексы</span>
                    </label>
                  </li>
                  <li>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={displayOptionsState[2]}
                        onChange={() => onDisplayOptionToggle(2)}
                      />
                      <span className="switch" />
                      <span style={{ width: "95px" }}>Законы</span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>

            <div className="display-button-details">
              <button
                onClick={onSortOptionsClick}
                className="uibtn uibtn--outline uibtn--select"
              >
                Сортировать
                <img
                  src={sorticon}
                  alt="Сортировка"
                  className="uibtn__icon left"
                  height={10}
                  width={19}
                />
                <img
                  src={downicon}
                  alt="downicon"
                  className={
                    "uibtn__select-icon" + (!showSortOptions ? " rotated" : "")
                  }
                  height={6}
                />
              </button>
              <div
                className={
                  "options-container2 fade-top " +
                  (!showSortOptions && "hidden-animate-fade-top")
                }
              >
                <ul>
                  <li onClick={() => onSortOptionToggle(0)}>
                    <img src={popupicon1} alt="Юридическая сила" />
                    <button>По юридической силе</button>
                  </li>
                  <li onClick={() => onSortOptionToggle(1)}>
                    <img src={popupicon2} alt="Популярность" />
                    <button>По популярности</button>
                  </li>
                  <li onClick={() => onSortOptionToggle(2)}>
                    <img src={popupicon3} alt="Алфавит" />
                    <button>По алфавиту</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Pagination
            initialPage={0}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
        <div className="law-search-list">
          {content?.map((law) => (
            <button
              className="law-search-block"
              key={law.id}
              onClick={() => handleLawClick(law.id)}
            >
              {law.icon === "constitution" ? (
                <img
                  src={constitution}
                  alt="Конституция"
                  className="law-search-block__img"
                  style={{
                    height: "16px",
                    width: "16px",
                    marginBottom: "auto",
                    marginTop: "auto",
                  }}
                />
              ) : law.icon === "book" ? (
                <img
                  src={bookicon}
                  alt="book"
                  className="law-search-block__img"
                  style={{
                    height: "16px",
                    marginBottom: "auto",
                    marginTop: "auto",
                  }}
                />
              ) : (
                <img
                  src={fileicon}
                  alt="file"
                  className="law-search-block__img"
                  style={{
                    height: "16px",
                    marginBottom: "auto",
                    marginTop: "auto",
                  }}
                />
              )}
              {law.title}
            </button>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
