import { useEffect, useState } from "react";
import lawsData from "./../lib/lawsData";
import axios from "axios";

export const useLawSearchState = () => {
  const [searchContent, setSearchContent] = useState("");

  const [showDisplayOptions, setShowDisplayOptions] = useState(false);
  const [displayOptionsState, setDisplayOptionsState] = useState([
    true,
    true,
    true,
  ]);

  const [showSortOptions, setShowSortOptions] = useState(false);
  const [content, setContent] = useState([[], []]);

  const [currentPage, setCurrentPage] = useState(0);

  const slicedContent = (content, page) => {
    return content.slice(33 * page, 33 * (page + 1)).filter((x) => {
      if (
        displayOptionsState[0] &&
        displayOptionsState[1] & displayOptionsState[2]
      ) {
        return true;
      } else if (displayOptionsState[0] && x.icon === "constitution") {
        return true;
      } else if (displayOptionsState[1] && x.icon === "book") {
        return true;
      } else if (displayOptionsState[2] && x.icon === "file") {
        return true;
      } else {
        return false;
      }
    });
  };

  // -------------------- Кнопочки и инпуты ----------------------------

  const onSearch = (e) => {
    setSearchContent(e.target.value);
  };

  const onDisplayOptionsClick = () => {
    setShowDisplayOptions((prev) => !prev);
  };

  const onDisplayOptionToggle = (optionIndex) => {
    let newOptionsState = displayOptionsState;
    newOptionsState[optionIndex] = !newOptionsState[optionIndex];

    setDisplayOptionsState(newOptionsState);
    setContent([content[0], slicedContent(content[0], currentPage)]);
  };

  const onSortOptionsClick = () => {
    setShowSortOptions((prev) => !prev);
  };

  const onSortOptionToggle = (optionIndex) => {
    switch (optionIndex) {
      case 0:
        // by legal strength
        const newContent = content[0].sort((a, b) => {
          if (a.legalStrength < b.legalStrength) {
            return 1;
          } else if (a.legalStrength > b.legalStrength) {
            return -1;
          }
          return 0;
        });
        setContent([newContent, slicedContent(content[0], currentPage)]);

        break;
      case 1:
        // by popularity
        const newContent1 = content[0].sort((a, b) => {
          if (a.popularity < b.popularity) {
            return 1;
          } else if (a.popularity > b.popularity) {
            return -1;
          }
          return 0;
        });
        setContent([newContent1, slicedContent(content[0], currentPage)]);

        break;
      case 2:
        // by alphabet
        const newContent2 = content[0].sort((a, b) => {
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
          } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
          }
          return 0;
        });
        setContent([newContent2, slicedContent(content[0], currentPage)]);

        break;
      default:
        setContent([content[0], slicedContent(content[0], currentPage)]);

        break;
    }
  };
  /**
   * @description КОСТЫЛЬ!!!!! обязательно в дальнейшем исправить
   */
  const onClickOutside = (e) => {
    const el1 = document.querySelector(".display-button");
    const el2 = document.querySelector(".sort-button");
    const el3 = document.querySelector(".options-container");
    const el4 = document.querySelector(".options-container2");
    if (
      !el1?.contains(e.target) &&
      !el2?.contains(e.target) &&
      !el3?.contains(e.target) &&
      !el4?.contains(e.target)
    ) {
      setShowDisplayOptions(false);
      setShowSortOptions(false);
    }
  };

  // ------------------------------------------------------------------

  // ----------------------------- Пагинация ---------------------

  const totalPages = Math.ceil(content.length / 33);
  const onPageChange = (page) => {
    setContent([content[0], slicedContent(content[0], page)]);
  };

  // -------------------------------------------------------------

  // --------------------------- Контент ------------------------

  useEffect(() => {
    try {
      axios
        .post("https://lawrs.ru:8000/api/count_cases_add/document_list")
        .then((r) => {
          console.log(r.data);
          setContent([r.data, slicedContent(r.data, currentPage)]);
        });
    } catch (e) {
      console.error("Ошибка при получении данных useLawSearchState ", e);
    }
  }, []);

  // ------------------------------------------------------------
  return {
    searchContent,
    onSearch,
    showDisplayOptions,
    onDisplayOptionsClick,
    displayOptionsState,
    onDisplayOptionToggle,
    showSortOptions,
    onSortOptionsClick,
    onSortOptionToggle,
    totalPages,
    onPageChange,
    content: content[1],
    onClickOutside,
  };
};
