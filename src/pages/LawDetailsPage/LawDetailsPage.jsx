import React, { useState } from "react";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Icon28SearchOutline } from "@vkontakte/icons";

import { useLawDetailsState } from "./useLawDetailsState";
import Page from "../../shared/Page/Page";

import downicon from "../../assets/images/downicon.png";
import Expandicon from "../../assets/vectors/Expandicon";
import Backtosearchicon from "../../assets/vectors/Backtosearchicon";
import ShowIcon from "../../assets/vectors/ShowIcon";

const filterSection = (section, searchQuery) => {
  if (section) {
    if (!searchQuery) return true;
    return (
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.child_list.some((point) =>
        point.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }
};

const filterPoint = (point, searchQuery) => {
  if (!searchQuery) return true;
  return point.title.toLowerCase().includes(searchQuery.toLowerCase());
};

export default function LawDetailsPage() {
  const routeNavigator = useRouteNavigator();

  const handleBack = () => {
    routeNavigator.back();
  };

  const { id } = useParams();

  const {
    searchContent,
    onSearch,
    showDisplayOptions,
    onDisplayOptionsClick,
    displayOptionsState,
    onDisplayOptionToggle,
    selectedLaw,
    onClickOutside,
  } = useLawDetailsState(id);

  const [expandedSections, setExpandedSections] = useState([]);

  const toggleSection = (ind) => {
    let newExpandedSections = [...expandedSections];

    if (expandedSections.includes(ind)) {
      newExpandedSections = newExpandedSections.filter((x) => x !== ind);
    } else {
      newExpandedSections.push(ind);
    }
    setExpandedSections(newExpandedSections);
  };

  return (
    <Page forceActiveTab={2}>
      <div className="row mobile-center mobile-column">
        <h2 className="page-title">Поиск по норме права</h2>

        <div className="law-search-input-wrapper">
          <Icon28SearchOutline style={{ paddingLeft: "6px" }} />
          <input
            type="text"
            placeholder="Введите номер статьи..."
            value={searchContent}
            onChange={onSearch}
            className="law-search-input"
          />
        </div>
      </div>
      <div className="law-detail">
        <div className="law-search-controls">
          <div className="law-search-buttons">
            <button
              className="uibtn uibtn--icon left lawdetails-btn"
              onClick={() => handleBack()}
            >
              <Backtosearchicon className="uibtn__icon left" />
              Вернуться к поиску
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
          </div>
        </div>
        <div className="selectedLaw-content">
          <h2 className="selectedLaw__title">{selectedLaw?.title}</h2>
          <p>{selectedLaw?.content}</p>
          <div className="sections">
            {selectedLaw?.child_list
              ?.filter((section) => filterSection(section, searchContent))
              ?.map((section, index) => (
                <div key={index} className="lawsection">
                  <h3
                    className={"law-section"}
                    onClick={() => toggleSection(index)}
                  >
                    {expandedSections.includes(index) ? (
                      <div className="expand-icon ">
                        <Expandicon />
                      </div>
                    ) : (
                      <div className="expand-icon rotated">
                        <Expandicon />
                      </div>
                    )}
                    {section.title}
                  </h3>
                  <ul
                    className={
                      "law-chapters " +
                      (expandedSections.includes(index) ? "active " : "")
                    }
                  >
                    {section?.child_list
                      ?.filter((chapter) => filterPoint(chapter, searchContent))
                      .map((chapter, chapterIndex) => (
                        <li key={chapterIndex}>{chapter.title}</li>
                      ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Page>
  );
}
