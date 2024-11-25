import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import backtosearchicon from "../assets/backtosearchicon.png";
import aiicon from "../assets/aiicon.png";
import saveicon from "../assets/saveicon.png";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import { useCaseDetailsState } from "../hooks/useCaseDetailsState";
import parse from "html-react-parser";
import Backtosearchicon from "../assets/Backtosearchicon";
import AImodal from "../modals/AImodal";
import axios from "axios";

export default function CaseDetailsPage() {
  const routeNavigator = useRouteNavigator();

  const handleBack = () => {
    routeNavigator.back();
  };

  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState(" ");

  const handleAi = () => {
    setShowModal(true);
    axios
      .post("https://lawrs.ru:8000/api/count_cases_add/text_add/" + id)
      .then((r) => {
        setText(r.data.text);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const { id } = useParams();

  const { caseData } = useCaseDetailsState(id);

  return (
    <>
      <AImodal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        id={id}
        text={text}
      />
      <div className="app-wrapper">
        <Header forceActiveTab={0} />
        <main className="page-content">
          <h2 className="page-title">Просмотр судебного акта</h2>
          <div className="LawPanel">
            <div className="LawPanel-buttons">
              <div className="LawPanel-buttons-left">
                <div
                  className="uibtn uibtn--icon left casedetails-btn"
                  onClick={() => handleBack()}
                >
                  <Backtosearchicon className="uibtn__icon left" />
                  Вернуться к поиску
                </div>
              </div>
              <div className="LawPanel-buttons-right">
                <button
                  className="uibtn uibtn--outline uibtn--icon left  casedetails-btn"
                  onClick={() => handleAi()}
                >
                  <img
                    src={aiicon}
                    alt="summary"
                    className="uibtn__icon left"
                    height={15}
                  />
                  Краткий пересказ
                </button>
                <a
                  className="uibtn uibtn--outline uibtn--icon left  casedetails-btn"
                  href={caseData?.url?.replace("doc/", "doc/save/")}
                >
                  <img
                    src={saveicon}
                    alt="save"
                    className="uibtn__icon left"
                    height={15}
                  />
                  Скачать документ
                </a>
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
    </>
  );
}
