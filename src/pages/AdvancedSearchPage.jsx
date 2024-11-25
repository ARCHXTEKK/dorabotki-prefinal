import React from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { Group } from "@vkontakte/vkui";
import { useAdvancedSearchState } from "../hooks/useAdvancedSearchState";
import downicon from "../assets/downicon.png";
import dataicon from "../assets/dataicon.png";
import DatePicker, { registerLocale } from "react-datepicker";
import findicon from "../assets/findicon.png";
import clearicon from "../assets/clearicon.png";

import "react-datepicker/dist/react-datepicker.css";

import { ru } from "date-fns/locale/ru";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

registerLocale("ru", ru);

export default function AdvancedSearchPage() {
  const {
    selectedFilter,
    caseText,
    onCaseTextChange,
    productionType,
    onProductionTypeChange,
    productionTypes,
    caseNumber,
    onCaseNumberChange,
    uid,
    onUidChange,
    filters,
    handleFilterChange,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    singleDate,
    setSingleDate,
    court,
    setCourt,
    judge,
    setJudge,
    courts,
    judges,
    disputant,
    setDisputant,
    handleClear,
    selectedRole,
    roles,
    setSelectedRole,
  } = useAdvancedSearchState();

  const routeNavigator = useRouteNavigator();

  const handleSubmit = () => {
    routeNavigator.push(
      "/searchresults",
      {
        state: {
          selectedFilter,
          caseText,
          productionType,
          caseNumber,
          startDate,
          endDate,
          singleDate,
          court,
          judge,
          disputant,
          uid,
          selectedRole,
        },
      },
      { keepSearchParams: true }
    );
  };

  const renderDatePicker = () => {
    switch (selectedFilter) {
      case filters[0]:
        return (
          <div className="advanced-search-input-group">
            <div className="advancedsearch-date-wrapper">
              <div className="advancedsearch-date-left">
                <div className="advanced-title">с</div>

                <div
                  className="data-input-left"
                  style={{ border: "1px solid #f0f0f0" }}
                >
                  <DatePicker
                    locale="ru"
                    dateFormat="dd.MM.yyyy"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="advanced-date-picker"
                  />
                  <img src={dataicon} alt="" />
                </div>
              </div>

              <div className="advancedsearch-date-right">
                <div className="advanced-title">по</div>
                <div className="data-input-right">
                  <DatePicker
                    locale="ru"
                    dateFormat="dd.MM.yyyy"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    className="advanced-date-picker"
                  />
                  <img src={dataicon} />
                </div>
              </div>
            </div>
          </div>
        );
      case filters[1]:
        return (
          <div className="advanced-search-input-group">
            <div className="advancedsearch-date-wrapper">
              <div className="advancedsearch-date-left">
                <div className="advanced-title">Дата:</div>
                <div
                  className="data-input-left"
                  style={{ border: "1px solid #f0f0f0" }}
                >
                  <DatePicker
                    locale="ru"
                    dateFormat="dd.MM.yyyy"
                    selected={singleDate}
                    onChange={(date) => setSingleDate(date)}
                    className="advanced-date-picker"
                  />
                  <img src={dataicon} />
                </div>
              </div>
            </div>
          </div>
        );
      case filters[2]:
        return (
          <div className="advanced-search-input-group">
            <div className="advancedsearch-date-wrapper">
              <div className="advancedsearch-date-left">
                <div className="advanced-title">Ранее чем:</div>
                <div
                  className="data-input-left"
                  style={{ border: "1px solid #f0f0f0" }}
                >
                  <DatePicker
                    locale="ru"
                    dateFormat="dd.MM.yyyy"
                    selected={singleDate}
                    onChange={(date) => setSingleDate(date)}
                    className="advanced-date-picker"
                  />
                  <img src={dataicon} />
                </div>
              </div>
            </div>
          </div>
        );
      case filters[3]:
        return (
          <div className="advanced-search-input-group">
            <div className="advancedsearch-date-wrapper">
              <div className="advancedsearch-date-left">
                <div className="advanced-title">Позднее чем:</div>
                <div
                  className="data-input-left"
                  style={{ border: "1px solid #f0f0f0" }}
                >
                  <DatePicker
                    locale="ru"
                    dateFormat="dd.MM.yyyy"
                    selected={singleDate}
                    onChange={(date) => setSingleDate(date)}
                    className="advanced-date-picker"
                  />
                  <img src={dataicon} />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-wrapper">
      <Header />
      <div className="page-content">
        <div className="page-title">Расширенный поиск</div>
        <Group>
          <div className="advanced-search-container">
            <div className="advanced-search-input-group">
              <div className="advansedsearch1-block">
                <div className="advansedsearch1-wrapper">
                  <div className="advansedsearch1-left">
                    <div className="advanced-title">Текст судебного акта</div>
                    <input
                      style={{
                        display: "flex",
                        backgroundcolor: "#fff",
                        borderradius: "5px",
                        border: "1px solid #f0f0f0",
                        padding: "0px",
                        height: "25px",
                        borderRadius: "5px",
                      }}
                      type="text"
                      placeholder=""
                      value={caseText}
                      onChange={onCaseTextChange}
                      сlassName="text-act"
                    />
                  </div>
                  <div className="advansedsearch1-right">
                    <div className="advanced-title">Вид производства</div>
                    <div className="inputdropicon">
                      <select
                        className="advanced-select"
                        style={{
                          display: "flex",
                          backgroundColor: "#fff",
                          borderRadius: "5px",
                          border: "none",
                          color: "#5c5f6d",
                          height: "33px",
                        }}
                        value={productionType}
                        onChange={onProductionTypeChange}
                      >
                        {productionTypes.map((item, index) => (
                          <option key={index} value={index}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <img
                        src={downicon}
                        alt=""
                        style={{
                          height: "5px",
                          marginTop: "auto",
                          marginBottom: "auto",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <span className="advancedsearch-desc">
                  Поиск будет осуществлен по точному слову или фразе
                </span>
              </div>
              <div className="advancedsearch2-wrapper">
                <div className="advancedsearch2-left">
                  <div className="advanced-title">Номер дела</div>
                  <input
                    style={{
                      display: "flex",
                      backgroundcolor: "#fff",
                      borderradius: "5px",
                      border: "1px solid #f0f0f0",
                      padding: "0px",
                      height: "25px",
                      borderRadius: "5px",
                    }}
                    type="text"
                    placeholder=""
                    value={caseNumber}
                    onChange={onCaseNumberChange}
                  />
                </div>
                <div className="advancedsearch2-right">
                  <div className="advanced-title">
                    Уникальный идентификатор (УИД)
                  </div>
                  <input
                    style={{
                      display: "flex",
                      backgroundcolor: "#fff",
                      borderradius: "5px",
                      border: "1px solid #f0f0f0",
                      padding: "0px",
                      height: "25px",
                      borderRadius: "5px",
                    }}
                    type="text"
                    placeholder=""
                    value={uid}
                    onChange={onUidChange}
                  />
                </div>
              </div>
            </div>
            <div className="advancedsearchdata-wrapper">
              <div className="advancedsearchdata-top">
                <div className="advanced-title" style={{ paddingLeft: "20px" }}>
                  Дата судебного акта:
                </div>
                <div className="advanced-title-switches">
                  <div className="radio-switch">
                    <input
                      type="radio"
                      id="date-range"
                      name="date-filter"
                      value={filters[0]}
                      checked={selectedFilter === filters[0]}
                      onChange={handleFilterChange}
                    />
                    <label htmlFor="date-range">Дата с... по...</label>
                  </div>

                  <div className="radio-switch">
                    <input
                      type="radio"
                      id="exact-date"
                      name="date-filter"
                      value={filters[1]}
                      checked={selectedFilter === filters[1]}
                      onChange={handleFilterChange}
                    />
                    <label htmlFor="exact-date">Точная дата</label>
                  </div>

                  <div className="radio-switch">
                    <input
                      type="radio"
                      id="earlier-than"
                      name="date-filter"
                      value={filters[2]}
                      checked={selectedFilter === filters[2]}
                      onChange={handleFilterChange}
                    />
                    <label htmlFor="earlier-than">Ранее чем</label>
                  </div>

                  <div className="radio-switch">
                    <input
                      type="radio"
                      id="later-than"
                      name="date-filter"
                      value={filters[3]}
                      checked={selectedFilter === filters[3]}
                      onChange={handleFilterChange}
                    />
                    <label htmlFor="later-than">Позднее чем</label>
                  </div>
                </div>
              </div>
              {renderDatePicker()}
            </div>
            <div className="advanced-search-input-group">
              <div className="advancedsearch3-wrapper">
                <div className="advancedsearch3-left">
                  <div className="advanced-title">Суд</div>
                  <div className="inputdropicon">
                    <select
                      className="advanced-select"
                      style={{
                        display: "flex",
                        backgroundColor: "#fff",
                        padding: "0px",
                        borderRadius: "5px",
                        border: "none",
                        color: "#5c5f6d",
                      }}
                      value={court}
                      onChange={(e) => setCourt(e.target.value)}
                    >
                      {courts.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <img
                      src={downicon}
                      alt=""
                      style={{
                        height: "5px",
                        marginTop: "auto",
                        marginBottom: "auto",
                      }}
                    />
                  </div>
                </div>
                <div className="advancedsearch3-right">
                  <div className="advanced-title">Судья</div>
                  <div className="inputdropicon">
                    <select
                      className="advanced-select"
                      style={{
                        display: "flex",
                        backgroundColor: "#fff",
                        padding: "0px",
                        borderRadius: "5px",
                        border: "none",
                        color: "#5c5f6d",
                      }}
                      value={judge}
                      onChange={(e) => setJudge(e.target.value)}
                    >
                      {judges.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <img
                      src={downicon}
                      alt=""
                      style={{
                        height: "5px",
                        marginTop: "auto",
                        marginBottom: "auto",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="advancedsearch4-wrapper">
                <div className="advanced-title">Участник спора</div>
                <div
                  className="inputdropicon"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "38px",
                  }}
                >
                  <input
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "5px",
                      border: "none",
                      width: "73%",
                      color: "#5c5f6d",
                    }}
                    className="advanced-select"
                    value={disputant}
                    onChange={(e) => setDisputant(e.target.value)}
                  ></input>
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <select
                      value={selectedRole}
                      className="advanced-select"
                      onChange={(e) => setSelectedRole(e.target.value)}
                      style={{
                        border: "none",
                        borderLeft: "1px solid #f0f0f0",
                        height: "34px",
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        padding: "0px 5px",
                        color: "#5c5f6d",
                        width: "25%",
                        minWidth: "120px",
                      }}
                    >
                      {roles.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <img
                      src={downicon}
                      style={{
                        height: "5px",
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                      alt="down icon"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="advanced-search-buttons">
            <button onClick={handleSubmit} className="uibtn uibtn--icon left">
              <img
                src={findicon}
                height={15}
                className="uibtn__icon left"
                style={{ left: "16px" }}
              />
              Найти
            </button>
            <button
              onClick={handleClear}
              className="uibtn uibtn--outline uibtn--icon left"
            >
              <img
                src={clearicon}
                className="uibtn__icon left"
                height={15}
                style={{ left: "16px" }}
              />
              Очистить все поля
            </button>
          </div>
        </Group>
      </div>
      <Footer />
    </div>
  );
}
