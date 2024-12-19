import React from "react";
import { Icon28SearchOutline } from "@vkontakte/icons";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import { useLawSearchState } from "./useLawSearchState";
import Page from "../../shared/Page/Page";
import PreLoader from "../../shared/PreLoader";
import Pagination from "../../shared/Pagination";

import downicon from "../../assets/images/downicon.png";
import sorticon from "../../assets/images/sorticon.png";
import popupicon1 from "../../assets/images/popupicon1.png";
import popupicon2 from "../../assets/images/popupicon2.png";
import popupicon3 from "../../assets/images/popupicon3.png";

import constitution from "../../assets/images/constitution.png";
import fileicon from "../../assets/images/fileicon.png";
import bookicon from "../../assets/images/bookicon.png";
import ShowIcon from "../../assets/vectors/ShowIcon";

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
    <Page className="page-content--flex" onClickOutside={onClickOutside}>
      <div className="row mobile-column mobile-center">
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
              className="uibtn uibtn--icon uibtn--outline uibtn--select"
            >
              <ShowIcon className="uibtn__icon left show-icon " />

              <div className="mobile-sm-hidden">Отображение</div>
              <div className="mobile-sm-show">Фильтр</div>
              <img
                src={downicon}
                alt="downicon"
                className={
                  "uibtn__select-icon" + (!showDisplayOptions ? " rotated" : "")
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
              className="uibtn uibtn--icon uibtn--outline uibtn--select"
            >
              <img
                src={sorticon}
                alt="Сортировка"
                className="uibtn__icon left"
                height={10}
                width={19}
              />

              <div className="uibtn__text">Сортировать</div>

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
      <div className="law-search-wrapper">
        {content.length > 0 ? (
          <div className="law-search-list">
            {content.map((law) => (
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
                  />
                ) : law.icon === "book" ? (
                  <img
                    src={bookicon}
                    alt="book"
                    className="law-search-block__img"
                  />
                ) : (
                  <img
                    src={fileicon}
                    alt="file"
                    className="law-search-block__img"
                  />
                )}
                <div className="law-text">{law.title}</div>
              </button>
            ))}
          </div>
        ) : (
          <div style={{ width: "100%", paddingTop: "10%" }}>
            <PreLoader />
          </div>
        )}
      </div>
    </Page>
  );
}
