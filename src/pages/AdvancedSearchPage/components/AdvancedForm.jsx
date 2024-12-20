import React from "react";

const renderDatePicker = () => {
  switch (selectedFilter) {
    case filters[0]:
      return (
        <>
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
        </>
      );
    case filters[1]:
      return (
        <>
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
        </>
      );
    case filters[2]:
      return (
        <>
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
        </>
      );
    case filters[3]:
      return (
        <>
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
        </>
      );
    default:
      return null;
  }
};

export default function AdvancedForm() {
  return (
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
                  onFocus={() => setSelectState(true)}
                  onBlur={() => setSelectState(false)}
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
                  height={6}
                  className={
                    "uibtn__select-icon" + (!selectState ? " rotated" : "")
                  }
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
            <div className="advanced-title">Уникальный идентификатор (УИД)</div>
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
        <div className="advanced-search-input-group">
          <div className="advancedsearch-date-wrapper">
            {renderDatePicker()}
          </div>
        </div>
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
                onFocus={() => setSelectState2(true)}
                onBlur={() => setSelectState2(false)}
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
                height={6}
                className={
                  "uibtn__select-icon" + (!selectState2 ? " rotated" : "")
                }
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
                onFocus={() => setSelectState3(true)}
                onBlur={() => setSelectState3(false)}
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
                height={6}
                className={
                  "uibtn__select-icon" + (!selectState3 ? " rotated" : "")
                }
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
                onFocus={() => setSelectState4(true)}
                onBlur={() => setSelectState4(false)}
              >
                {roles.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <img
                src={downicon}
                height={6}
                className={
                  "uibtn__select-icon" + (!selectState4 ? " rotated" : "")
                }
                alt="down icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
