import React from "react";
import { useMetaParams } from "@vkontakte/vk-mini-apps-router";
import { List } from "@vkontakte/vkui";
import { useSearchResultsState } from "./useSearchResultsState";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import Pagination from "../../shared/Pagination";
import Page from "../../shared/Page/Page";
import PreLoader from "../../shared/PreLoader";

import downicon from "../../assets/images/downicon.png";
import fileicon1 from "../../assets/images/fileicon1.png";
import fileicon2 from "../../assets/images/fileicon2.png";
import fileicon3 from "../../assets/images/fileicon3.png";
import Backtosearchicon from "../../assets/vectors/Backtosearchicon";
import ShowIcon from "../../assets/vectors/ShowIcon";

const fileIcons = [fileicon3, fileicon2, fileicon1];

export default function ResultsSearchPage() {
  const routeNavigator = useRouteNavigator();
  const filters = useMetaParams();

  const {
    totalPages,
    onPageChange,
    currentItems,
    showDisplayOptions,
    onDisplayOptionsClick,
    displayOptionsState,
    onDisplayOptionToggle,
    onClickOutside,
  } = useSearchResultsState(filters);

  const handleBack = () => {
    routeNavigator.back();
  };
  const handleCaseClick = (id) => {
    routeNavigator.push("/rubricator/casedetails/:id", {
      id: id,
    });
  };

  return (
    <Page forceActiveTab={0} onClickOutside={onClickOutside}>
      <h2 className="page-title results-title">Результаты поиска</h2>

      <div className="row mobile-column results-row mobile-center">
        <Pagination
          initialPage={0}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
        <div className="law-search-buttons results-page-buttons">
          <button
            className="uibtn uibtn--icon left"
            onClick={() => handleBack()}
          >
            <Backtosearchicon className="uibtn__icon left" />
            <div className="mobile-sm-hidden">Вернуться к поиску</div>
            <div className="mobile-sm-show">Назад</div>
          </button>

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
                    <span style={{ width: "95px" }}>Решения</span>
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
                    <span style={{ width: "95px" }}>Приговоры</span>
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
                    <span style={{ width: "95px" }}>Постановления</span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="FindPage-results">
        <div className="FindPage-sort-buttons">
          <div className="sort-button-left">
            <button className="sort-button-sud-act">Судебный акт</button>
          </div>
          <div className="sort-button-right">
            <button className="sort-button-sud-act">Суд</button>
          </div>
        </div>
        {currentItems.length > 0 ? (
          <List>
            {currentItems.map((res, index) => (
              <div
                key={res.id}
                className="FindPage-item-container"
                onClick={() => handleCaseClick(res.id)}
              >
                <div className="FindPage-item">
                  <div className="FindPage-item-icon">
                    <img
                      src={fileIcons[index % fileIcons.length]}
                      alt={`icon-${index % fileIcons.length}`}
                      style={{ height: "20px" }}
                    />
                  </div>
                  <div className="FindPage-item-text">
                    <div className="FindPage-item-text-title">{res.title}</div>
                    <div className="FindPage-item-text-desc">
                      {res.document_text}
                    </div>
                  </div>
                  <div className="FindPage-item-court">{res.court}</div>
                </div>
              </div>
            ))}
          </List>
        ) : (
          <div className="center">
            <PreLoader />
          </div>
        )}
      </div>
    </Page>
  );
}
