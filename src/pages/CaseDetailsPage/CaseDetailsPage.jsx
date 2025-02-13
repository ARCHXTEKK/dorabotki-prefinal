import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import parse from "html-react-parser";

import AImodal from "./AIModal";
import { useCaseDetailsState } from "./useCaseDetailsState";

import Backtosearchicon from "../../assets/vectors/Backtosearchicon";
import IconAI from "../../assets/vectors/iconAI";
import SaveIcon from "../../assets/vectors/saveIcon";
import Page from "../../shared/Page/Page";

export default function CaseDetailsPage() {
  const routeNavigator = useRouteNavigator();

  const handleBack = () => {
    routeNavigator.back();
  };

  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState(" ");

  const { id } = useParams();
  console.log(id);

  const handleAi = () => {
    setShowModal(true);
    axios
      .post(`https://lawrs.ru/legal_main/api/count_cases_add/text_add/${id}`)
      .then((r) => {
        setText(r.data.text);
      })
      .catch((e) => {
        console.error(e);
      });
  };

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
      <Page forceActiveTab={0}>
        <h2 className="page-title case-details-page-title">
          Просмотр судебного акта
        </h2>
        <div className="LawPanel">
          <div className="LawPanel-buttons">
            <div className="LawPanel-buttons-left">
              <button
                className="uibtn uibtn--icon left casedetails-btn"
                onClick={() => handleBack()}
              >
                <Backtosearchicon className="uibtn__icon left" />
                <div className="mobile-sm-hidden">Вернуться к поиску</div>
                <div className="mobile-sm-show">Назад</div>
              </button>
            </div>
            <div className="LawPanel-buttons-right">
              <button
                className="uibtn uibtn--outline uibtn--icon left  casedetails-btn"
                onClick={() => handleAi()}
              >
                <IconAI className="uibtn__icon left AI-icon" />
                <div className="mobile-sm-hidden">Краткий пересказ</div>
              </button>
              <a
                className="uibtn uibtn--outline uibtn--icon left  casedetails-btn"
                href={caseData?.url?.replace("doc/", "doc/save/")}
              >
                <SaveIcon className="uibtn__icon left Save-icon" />
                <div className="mobile-sm-hidden">Скачать документ</div>
              </a>
            </div>
          </div>
          <div className="law-panel-content">
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
      </Page>
    </>
  );
}
