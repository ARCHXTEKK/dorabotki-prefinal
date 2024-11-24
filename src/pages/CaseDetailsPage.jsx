import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import backtosearchicon from "../assets/backtosearchicon.png";
import aiicon from "../assets/aiicon.png";
import saveicon from "../assets/saveicon.png";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import { useCaseDetailsState } from "../hooks/useCaseDetailsState";
import parse from "html-react-parser";

export default function CaseDetailsPage() {
  const routeNavigator = useRouteNavigator();

  const handleBack = () => {
    routeNavigator.back();
  };

  const handleAi = () => {};

  const { id } = useParams();

  const { caseData } = useCaseDetailsState(id);

  return (
    <div className="app-wrapper">
      <Header />
      <main className="page-content">
        <h2 className="page-title">Просмотр судебного акта</h2>
        <div className="LawPanel">
          <div className="LawPanel-buttons">
            <div className="LawPanel-buttons-left">
              <div
                style={{
                  fontSize: "14px",
                  borderRadius: "5px",
                  color: "#fff",
                  padding: "0px 10px 0px",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#3871e0",
                  height: "30px",
                }}
                onClick={() => handleBack()}
              >
                <img
                  src={backtosearchicon}
                  alt="back to search"
                  style={{ height: "15px", padding: "2px 5px 0px 0px" }}
                />
                Вернуться к поиску
              </div>
            </div>
            <div className="LawPanel-buttons-right">
              <div
                className="LawPanel-buttons-right-one"
                style={{
                  borderRadius: "5px",
                  color: "rgb(56, 113, 224)",
                  padding: "0px 10px 0px",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  height: "30px",
                }}
                onClick={handleAi}
              >
                <img
                  src={aiicon}
                  alt="summary"
                  style={{ height: "15px", padding: "0px 5px 0px 0px" }}
                />
                Краткий пересказ
              </div>
              <div
                className="LawPanel-buttons-right-two"
                style={{
                  borderRadius: "5px",
                  color: "rgb(56, 113, 224)",
                  padding: "0px 10px 0px",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  height: "30px",
                }}
              >
                <img
                  src={saveicon}
                  alt="save"
                  style={{ height: "15px", padding: "0px 5px 0px 0px" }}
                />
                <a href={caseData?.url?.replace("doc/", "doc/save/")}>
                  Скачать документ
                </a>
              </div>
            </div>
          </div>
          <div className="law-panel-content">
            <div className="law-panel-content-top">
              {caseData.section_title}
            </div>
            <div className="law-panel-content-text">
              <h1>{caseData.court}</h1>
              <h1>
                {caseData.case_type}
                <br></br> от {caseData.case_date}
              </h1>
              <div className="text-right">
                <p>Дело N {caseData.case_number}</p>
              </div>
              <div className="bottom-text">
                <div>
                  {caseData.document_text && parse(caseData.document_text)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
