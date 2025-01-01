import { useEffect, useState } from "react";
import axios from "axios";
import { useStore } from "../../lib/store/useStore";

export const useLawSearchState = () => {
  const [searchContent, setSearchContent] = useState("");

  const { state, dispatch } = useStore();

  const [showDisplayOptions, setShowDisplayOptions] = useState(false);
  const [displayOptionsState, setDisplayOptionsState] = useState([
    true,
    true,
    true,
  ]);

  const [showSortOptions, setShowSortOptions] = useState(false);
  const [content, setContent] = useState([[], []]);

  const [currentPage, setCurrentPage] = useState(0);

  const slicedContent = (cont, page) => {
    return cont.slice(33 * page, 33 * (page + 1)).filter((x) => {
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

  const filteredContent = (cont, searchQuery) => {
    if (cont?.length > 0 && searchQuery?.length > 0) {
      let newContent = [...cont];
      newContent = newContent.filter(
        (x) =>
          x.child_list.some(
            (y) =>
              y.title.includes(searchQuery) ||
              y?.child_list?.some((z) => z.title.includes(searchQuery))
          ) || x.title.includes(searchQuery)
      );

      return newContent;
    } else {
      return cont;
    }
  };

  // -------------------- Кнопочки и инпуты ----------------------------

  const onSearch = (e) => {
    setSearchContent(e.target.value);
    setContent([
      content[0],
      slicedContent(filteredContent(content[0], e.target.value), currentPage),
    ]);
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
    const el1 = document.querySelectorAll(".display-button-details")[0];
    const el2 = document.querySelectorAll(".display-button-details")[1];
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

  const [totalPages, setTotalPages] = useState(
    Math.ceil(content.length / 33 + 1)
  );

  const onPageChange = (page) => {
    setContent([content[0], slicedContent(content[0], page)]);
    setCurrentPage(page);
  };

  // -------------------------------------------------------------

  // --------------------------- Контент ------------------------

  useEffect(() => {
    if (state.lawsData.length === 0) {
      try {
        axios
          .post("https://lawrs.ru:8000/api/count_cases_add/document_list")
          .then((r) => {
            setContent([r.data, slicedContent(r.data, currentPage)]);
            setTotalPages(Math.ceil(r.data.length / 33));
            dispatch({ type: "laws-set", payload: r.data });
            console.log(Math.ceil(r.data.length / 33));
          });
      } catch (e) {
        console.error("Ошибка при получении данных useLawSearchState ", e);
      }
    } else {
      setContent([state.lawsData, slicedContent(state.lawsData, currentPage)]);
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
