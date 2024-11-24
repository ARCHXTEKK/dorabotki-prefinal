import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Button, Cell, Div, Group } from "@vkontakte/vkui";
import { Icon28SearchOutline } from "@vkontakte/icons";
import { useKeywordSearchState } from "../hooks/useKeywordSearchState";
import { groupedAlphabet } from "./../lib/consts";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

export default function KeywordSearchPage() {
  const {
    searchValue,
    onSearch,
    handlePrevGroup,
    handleNextGroup,
    selectedGroup,
    onGroupSelect,
    dataByLetter,
    handleSubmit,
  } = useKeywordSearchState();

  const handleShowAllWordsByLetter = (letter) => {
    routeNavigator.push("/keywordsearch/:letter", {
      letter,
    });
  };

  const routeNavigator = useRouteNavigator();

  return (
    <div className="app-wrapper">
      <Header />
      <main className="page-content">
        <h2 className="page-title">Поиск по ключевому слову</h2>
        <Group>
          <div className="alphabet-page">
            <div className="alphabet-nav-wrapper">
              <div className="Keywordsearch-wrapper">
                <Icon28SearchOutline
                  className="search-icon"
                  style={{ margin: "5px 0px 0px 2px" }}
                />
                <input
                  className="Keywordsearch-input"
                  type="text"
                  placeholder="Введите ключевое слово, фразу или номер дела"
                  value={searchValue}
                  onChange={onSearch}
                />
                <button
                  className="Keywordsearch-find"
                  size="m"
                  mode="secondary"
                  onClick={handleSubmit}
                  disabled={selectedGroup === 0}
                >
                  Найти
                </button>
              </div>
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
                      dataByLetter[letter].map((word, idx) => (
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
                );
              })}
            </div>
          </div>
        </Group>
      </main>
      <Footer />
    </div>
  );
}
