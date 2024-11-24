import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useMetaParams } from "@vkontakte/vk-mini-apps-router";
import { useSearchResultsState } from "../hooks/useSearchResultsState";
import Pagination from "../ui/Pagination";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import displayicon from "../assets/displayicon.png";
import downicon from "../assets/downicon.png";

import fileicon1 from "../assets/fileicon1.png";
import fileicon2 from "../assets/fileicon2.png";
import fileicon3 from "../assets/fileicon3.png";
import backtosearchicon from "../assets/backtosearchicon.png";

import { List } from "@vkontakte/vkui";

const fileIcons = [fileicon3, fileicon2, fileicon1];

export default function ResultsSearchPage() {
  const routeNavigator = useRouteNavigator();
  const filters = useMetaParams();
  const { totalPages, onPageChange, currentItems } =
    useSearchResultsState(filters);

  const handleBack = () => {
    routeNavigator.back();
  };
  const handleCaseClick = (id) => {
    routeNavigator.push(
      "",
      {
        id,
      },
      {
        keepSearchParams: true,
      }
    );
  };

  return (
    <div className="app-wrapper">
      <Header />
      <main className="page-content">
        <h2 className="page-title">Результаты поиска</h2>
        <div className="FindPage-buttons" style={{ display: "flex" }}>
          <div
            className="backtosearch"
            onClick={handleBack}
            style={{
              marginRight: "10px",
              borderRadius: "5px",
              color: "#fff",
              padding: "0px 10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={backtosearchicon}
              style={{ height: "15px", padding: "2px 5px 0px 0px" }}
            />
            Вернуться к поиску
          </div>
          <div className="display-button">
            <img
              src={displayicon}
              alt="Отображение"
              style={{
                height: "14px",
                marginTop: "auto",
                marginBottom: "auto",
                marginLeft: "5px",
              }}
            />
            <button className="law-search-button">Отображение</button>
            <img
              src={downicon}
              alt="downicon"
              style={{
                height: "5px",
                marginTop: "auto",
                marginBottom: "auto",
                paddingRight: "5px",
              }}
            />
          </div>
          <Pagination totalPages={totalPages} onPageChange={onPageChange} />
        </div>

        <div className="FindPage-results">
          <div className="FindPage-sort-buttons">
            <div className="empty-div"></div>
            <div className="sort-button-left">
              <button
                style={{
                  color: "#5c5f6d",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Судебный акт
              </button>
            </div>
            <div className="sort-button-right">
              <button
                style={{
                  color: "#5c5f6d",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Суд
              </button>
            </div>
          </div>
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
                      style={{ height: "20px", padding: "2px 5px 0px 0px" }}
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
