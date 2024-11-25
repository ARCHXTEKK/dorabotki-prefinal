<>
  <div
    className="uibtn uibtn--icon left casedetails-btn"
    onClick={() => handleBack()}
  >
    <Backtosearchicon className="uibtn__icon left" />
    Вернуться к поиску
  </div>
  ;
  <button
    onClick={onDisplayOptionsClick}
    className="uibtn uibtn--outline uibtn--select"
  >
    Отображение
    <ShowIcon className="uibtn__icon left show-icon " />
    <img
      src={downicon}
      alt="downicon"
      className={"uibtn__select-icon" + (!showDisplayOptions ? " rotated" : "")}
      height={6}
    />
  </button>
</>;
