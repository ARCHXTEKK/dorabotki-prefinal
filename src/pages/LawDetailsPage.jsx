import React, { useReducer, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import backtosearchicon from "../assets/backtosearchicon.png";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import displayicon from "../assets/displayicon.png";
import downicon from "../assets/downicon.png";
import { useLawDetailsState } from "../hooks/useLawDetailsState";
import { Icon28SearchOutline } from "@vkontakte/icons";
import Expandicon from "./../assets/Expandicon";
import Backtosearchicon from "../assets/Backtosearchicon";
import ShowIcon from "./../assets/ShowIcon";

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
    <div className="app-wrapper" onClick={onClickOutside}>
      <Header forceActiveTab={2} />
      <main className="page-content">
        <div className="row">
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
              <div
                className="uibtn uibtn--icon left casedetails-btn"
                onClick={() => handleBack()}
              >
                <Backtosearchicon className="uibtn__icon left" />
                Вернуться к поиску
              </div>
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
                      "uibtn__select-icon" + showDisplayOptions
                        ? " rotated"
                        : ""
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
                  <div key={index} className="section">
                    <h3
                      className="law-section"
                      onClick={() => toggleSection(index)}
                    >
                      {expandedSections.includes(index) ? (
                        <div className="expand-icon">
                          <Expandicon />
                        </div>
                      ) : (
                        <div className="expand-icon">
                          <Expandicon rotated={true} />
                        </div>
                      )}
                      {section.title}
                    </h3>
                    {expandedSections.includes(index) && (
                      <ul className="law-chapters">
                        {section.child_list
                          .filter((chapter) =>
                            filterPoint(chapter, searchContent)
                          )
                          .map((chapter, chapterIndex) => (
                            <li key={chapterIndex}>{chapter.title}</li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// export default function LawDetailsPage() {
//   return <div></div>;
// }
