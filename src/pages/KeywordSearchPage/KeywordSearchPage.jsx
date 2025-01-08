import React from "react";
import { Button, Cell, Div } from "@vkontakte/vkui";
import { Icon28SearchOutline } from "@vkontakte/icons";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import { useKeywordSearchState } from "./useKeywordSearchState";
import { groupedAlphabet } from "../../lib/other/consts";
import Page from "../../shared/Page/Page";

export default function KeywordSearchPage() {
  const {
    searchValue,
    onSearch,
    handlePrevGroup,
    handleNextGroup,
    selectedGroup,
    onGroupSelect,
    dataByLetter,
  } = useKeywordSearchState();

  const handleShowAllWordsByLetter = (letter) => {
    routeNavigator.push("/keywordsearch/:letter", {
      letter,
    });
  };

  const routeNavigator = useRouteNavigator();

  const handleSubmit = (word) => {
    routeNavigator.replace("/searchresults", {
      state: {
        caseText: word,
      },
    });
  };

  return (
    <Page className="keyword-search-page-content">
      <div className="mobile-column">
        <h2 className="page-title">Поиск по ключевому слову</h2>
        <div className="Keywordsearch-wrapper">
          <Icon28SearchOutline className="search-icon" />
          <input
            className="Keywordsearch-input"
            type="text"
            placeholder="Введите ключевое слово, фразу или номер дела"
            value={searchValue}
            onChange={onSearch}
          />
          <button
            className="uibtn keywordsearch-uibtn"
            mode="secondary"
            onClick={() => handleSubmit(searchValue)}
          >
            Найти
          </button>
        </div>
      </div>
      <div className="alphabet-nav-wrapper">
        <div className="alphabet-nav">
          <button
            className="alphabet-nav-button"
            size="m"
            mode="secondary"
            onClick={handlePrevGroup}
            disabled={selectedGroup === 0}
          >
            Назад
          </button>
          <div className="alphabet-groups">
            {groupedAlphabet.map((group, index) => (
              <Button
                key={index}
                size="m"
                mode="secondary"
                onClick={() => onGroupSelect(index)}
                className={
                  selectedGroup === index
                    ? "alphabet-group active"
                    : "alphabet-group"
                }
              >
                {group.join("")}
              </Button>
            ))}
          </div>
          <button
            className="alphabet-nav-button"
            size="m"
            mode="secondary"
            onClick={handleNextGroup}
            disabled={selectedGroup === groupedAlphabet.length - 1}
          >
            Вперед
          </button>
        </div>
      </div>

      <div className="list-alphabet">
        {groupedAlphabet[selectedGroup].map((letter, index) => {
          return (
            dataByLetter[letter]?.length > 0 && (
              <Div key={index} className="alphabet-category-cell">
                <div className="card-header">
                  <span className="card-title">{letter}</span>
                  <button
                    size="s"
                    mode="secondary"
                    onClick={() => handleShowAllWordsByLetter(letter)}
                    className="show-all-button"
                  >
                    Показать полностью
                  </button>
                </div>
                {dataByLetter[letter] &&
                  dataByLetter[letter].slice(0, 5).map((word, idx) => (
                    <Cell
                      onClick={() => handleSubmit(word)}
                      style={{
                        color: "#818181",
                        fontSize: "13px",
                        fontWeight: "400",
                      }}
                      key={idx}
                    >
                      {word}
                    </Cell>
                  ))}
              </Div>
            )
          );
        })}
      </div>
    </Page>
  );
}
