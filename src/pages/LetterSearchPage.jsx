import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Cell, List } from "@vkontakte/vkui";
import { Icon28SearchOutline } from "@vkontakte/icons";
import backtosearchicon from "../assets/backtosearchicon.png";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { useLetterSearchState } from "../hooks/useLetterSearchState";
import { groupedAlphabet } from "../lib/consts";
import triangleIcon from "./../assets/triangleIcon";

export default function LetterSearchPage() {
  const { letter } = useParams();

  const { data, searchValue, onSearch } = useLetterSearchState(letter);

  const routeNavigator = useRouteNavigator();

  const handleBack = () => {
    routeNavigator.back();
  };

  const alph = groupedAlphabet.join().replaceAll(",", "");
  const handleNextLetter = () => {
    routeNavigator.replace("/keywordsearch/:letter", {
      letter: alph[alph.indexOf(letter) + 1],
    });
  };
  const handlePrevLetter = () => {
    routeNavigator.replace("/keywordsearch/:letter", {
      letter: alph[alph.indexOf(letter) - 1],
    });
  };

  const handleSubmit = () => {};

  return (
    <div className="app-wrapper">
      <Header />
      <main className="page-content">
        <div className="row">
          <h2 className="page-title">
            Поиск по ключевым словам (буква {letter})
          </h2>
          <div className="alphabet-input-wrapper">
            <Icon28SearchOutline
              className="search-icon"
              style={{ margin: "0px 0px 0px 2px" }}
            />
            <input
              className="alphabet-input"
              type="text"
              placeholder="Начните вводить ключевое слово"
              value={searchValue}
              onChange={onSearch}
            />
          </div>
        </div>

        <div className="word-list">
          <div className="inAlphabet-nav">
            <div className="inAlphabet-buttons">
              <button className="btn btn-active" onClick={handleBack}>
                <img
                  src={backtosearchicon}
                  alt="search"
                  style={{ height: "12px", padding: "2px 5px 0px 0px" }}
                />
                Вернуться к алфавиту
              </button>
              <button
                className="letter-search__letter"
                onClick={handlePrevLetter}
                disabled={letter === "А"}
              >
                {triangleIcon("reversed")} Предыдущая буква
              </button>
              <button
                className="letter-search__letter"
                onClick={handleNextLetter}
                disabled={letter === "Я"}
              >
                Следующая буква {triangleIcon("")}
              </button>
            </div>
          </div>
          <List gap="20px">
            {data?.map((word, index) => (
              <div className="word-list-block" key={index}>
                <button
                  className="letter-search__word-text"
                  key={index}
                  onClick={() => handleSubmit(word)}
                >
                  {word}
                </button>
                <button text=">" className="btn-2">
                  {">"}
                </button>
              </div>
            ))}
          </List>
          <div style={{ display: "flex", justifyContent: "center" }}></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
