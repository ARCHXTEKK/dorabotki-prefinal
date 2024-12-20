import React from "react";
import SearchIcon from "../../../assets/vectors/searchIcon";
import ClearIcon from "../../../assets/vectors/ClearIcon";

export default function AdvancedButtons({ handleSubmit, handleClear }) {
  return (
    <div className="advanced-search-buttons">
      <button onClick={handleSubmit} className="uibtn uibtn--icon left">
        <SearchIcon className="uibtn__icon left search-icon" />
        Найти
      </button>
      <button
        onClick={handleClear}
        className="uibtn uibtn--outline uibtn--icon left"
      >
        <ClearIcon className="uibtn__icon left clear-icon" />
        Очистить все поля
      </button>
    </div>
  );
}
