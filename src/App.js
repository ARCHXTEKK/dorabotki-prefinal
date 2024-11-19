/* eslint-disable */

import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  View,
  Panel,
  IconButton,
  PanelHeader,
  Group,
  Div,
  List,
  Cell,
  Button,
  SimpleCell,
  AppRoot,
  AdaptivityProvider,
  ConfigProvider,
  SplitLayout,
  SplitCol,
  PopoutWrapper,
  useAdaptivity,
} from "@vkontakte/vkui";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale/ru";
import { Form } from "react-bootstrap";
import useMediaQuery from "react-responsive";
import axios from "axios";
import { useParams } from "react-router-dom";

import {
  Icon28DocumentOutline,
  Icon28BookOutline,
  Icon28SearchOutline,
  Icon28ListOutline,
} from "@vkontakte/icons";

import logo from "./assets/logo.png";
import clearlogo from "./assets/clearlogo.png";
import dataicon from "./assets/dataicon.png";
import constitution from "./assets/constitution.png";
import civilIcon from "./assets/directory.png";
import criminalIcon from "./assets/directory.png";
import adminIcon from "./assets/directory.png";
import folderIcon2 from "./assets/dir5.png";
import folderIcon4 from "./assets/dir2.png";
import folderIcon5 from "./assets/dir3.png";
import folderIcon3 from "./assets/dir4.png";
import folderIcon1 from "./assets/dir1.png";
import popupicon1 from "./assets/popupicon1.png";
import popupicon2 from "./assets/popupicon2.png";
import popupicon3 from "./assets/popupicon3.png";
import sorticon from "./assets/sorticon.png";
import displayicon from "./assets/displayicon.png";
import fileicon from "./assets/fileicon.png";
import bookicon from "./assets/bookicon.png";
import downicon from "./assets/downicon.png";
import warningicon from "./assets/warningicon.png";
import sadcat from "./assets/sad-cat.png";
import findicon from "./assets/findicon.png";
import clearicon from "./assets/clearicon.png";
import backtosearchicon from "./assets/backtosearchicon.png";
import saveicon from "./assets/saveicon.png";
import aiicon from "./assets/aiicon.png";
import fileicon1 from "./assets/fileicon1.png";
import fileicon2 from "./assets/fileicon2.png";
import fileicon3 from "./assets/fileicon3.png";

import lawsData from "./components/lawsData.js";

registerLocale("ru", ru);

const apiBaseURL = "https://lawrs.ru:8000/api";

const alphabetCategories = {
  А: [
    "Агентский договор",
    "Арест",
    "Аренда",
    "Акцепт",
    "Авторское право",
    "Амнистия",
    "Административное взыскание",
  ],
  Б: ["Банкротство", "Брачный договор", "Бездействие", "Блокировка счетов"],
  В: ["Вексель", "Выгодоприобретатель", "Взыскание ущерба"],
  Г: [
    "Гражданское право",
    "Гражданское собрание",
    "Гражданский арбитраж",
    "Гражданский арбитраж",
  ],
  Д: ["Договор", "Делопроизводство", "Договор об отмене"],
  Е: ["Ежегодной аренда", "Ежегодный арендодатель", "Ежегодный арендатор"],
  Ж: ["Жилищное право", "Жилищный арендодатель", "Жилищный арендатор"],
  З: [
    "Защита прав потребителя",
    "Защита прав потребителя",
    "Защита прав потребителя",
  ],
  И: [
    "Инвестиционное право",
    "Инвестиционный агент",
    "Инвестиционный арбитраж",
  ],
  К: ["Кредит", "Кредитор", "Кредиторский договор", "Кредиторский договор"],
  Л: ["Лицензия", "Лицензионный договор", "Лицензионный договор"],
  М: ["Медицинское право", "Медицинский договор", "Медицинский договор"],
  Н: ["Нотариальное право", "Нотариальный договор", "Нотариальный договор"],
  О: ["Операционное право", "Операционный договор", "Операционный договор"],
  П: ["Пенсионное право", "Пенсионный договор", "Пенсионный договор"],
  Р: ["Религиозное право", "Религиозный договор", "Религиозный договор"],
  С: ["Семейное право", "Семейный арендодатель", "Семейный арендатор"],
  Т: ["Трудовое право", "Трудовый договор", "Трудовый договор"],
  У: ["Уголовное право", "Уголовный договор", "Уголовный договор"],
  Ф: ["Финансовое право", "Финансовый договор", "Финансовый договор"],
  Х: ["Хозяйственное право", "Хозяйственный договор", "Хозяйственный договор"],
  Ц: ["Ценное право", "Ценный договор", "Ценный договор"],
  Ч: ["Частное право", "Частный арендодатель", "Частный арендатор"],
  Ш: ["Штрафное право", "Штрафный договор", "Штрафный договор"],
  Щ: ["Щитовое право", "Щитовый договор", "Щитовый договор"],
  Э: ["Экономическое право", "Экономический договор", "Экономический договор"],
  Ю: ["Юридическое право", "Юридический договор", "Юридический договор"],
  Я: ["Ядерное право", "Ядерный договор", "Ядерный договор"],
};

const groupedAlphabet = [
  ["А", "Б", "В", "Г", "Д", "Е"],

  ["Ж", "З", "И", "К", "Л", "М"],
  ["Н", "О", "П", "Р", "С", "Т"],

  ["У", "Ф", "Х", "Ц", "Ч", "Ш"],
  ["Щ", "Э", "Ю", "Я"],
];

const disputants = [
  { disputant: "участник 1" },
  { disputant: "участник 2" },
  { disputant: "участник 3" },
  { disputant: "участник 4" },
];

let search_result = [];
const setsearch_result = (data) => {
  search_result = data;
};

const SidePanel = ({
  onSelectCategory,
  onSearch,
  showSidePanel,
  setShowSidePanel,
  setContent,
  searchContent,
  filteredContent,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const icons = [
    folderIcon1,
    folderIcon2,
    folderIcon3,
    folderIcon4,
    folderIcon5,
  ];

  const isFirstCategory = (index) => index === 0;
  const [categoryData, setCategoryData] = useState({});

  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredCategories = useMemo(() => {
    let newCategories = categories.filter(
      (category) =>
        category.subcategories.some((subcategory) =>
          filteredContent?.some(
            (filteredCase) => filteredCase.category_url === subcategory.url
          )
        ) || category.name.toLowerCase().includes(searchContent.toLowerCase())
    );

    newCategories = newCategories?.map((newCategory) => {
      return {
        ...newCategory,
        subcategories: newCategory.subcategories.filter(
          (subcategory) =>
            filteredContent?.some(
              (filteredCase) => filteredCase.category_url === subcategory.url
            ) ||
            searchContent.toLowerCase() === "" ||
            subcategory.name.toLowerCase().includes(searchContent.toLowerCase())
        ),
      };
    });
    return newCategories;
  }, [searchContent, categories]);

  const handleCategoryClick = async (categoryTitle) => {
    if (
      isFirstCategory(
        categories.findIndex((category) => category.name === categoryTitle)
      )
    ) {
      return;
    }
    setSelectedCategory(categoryTitle);

    setExpandedCategories((prev) => ({
      ...prev,
      [categoryTitle]: !prev[categoryTitle],
    }));

    const response = await axios.get(
      `https://lawrs.ru:8000/api/court-cases/?category=${categoryTitle}&page_size=1001`
    );

    setCategoryData((prev) => ({
      ...prev,
      [categoryTitle]: response.data.results,
    }));
    setContent(response.data.results);
  };

  const handleSubcategoryClick = (categoryTitle) => {
    setShowSidePanel(false);
    onSelectCategory(categoryTitle);

    setSelectedCategory(categoryTitle);

    if (!categoryData[categoryTitle]) {
      const fetchDataForCategory = async () => {
        try {
          const response = await axios.get(
            `https://lawrs.ru:8000/api/court-cases/?category=${categoryTitle}&page_size=1002`
          );
          setContent(response.data.results);
        } catch (error) {
          console.error("Ошибка при получении данных:", error);
        }
      };
      fetchDataForCategory();
    } else {
      setContent(categoryData[categoryTitle]);
    }
  };

  const fetchDataForSubcategory = async (subcategory) => {
    try {
      const response = await axios.get(
        `https://lawrs.ru:8000/api/court-cases/?page=1&page_size=1000&category=${subcategory}`
      );
      setContent(response.data.results);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  useEffect(() => {
    setShowSidePanel(true);
    onSelectCategory(null);

    if (!isMobile && categories.length > 0) {
      setExpandedCategories({ [categories[0].name]: true });
      try {
        setSelectedCategory(categories[0].subcategories[0].name);
        fetchDataForSubcategory(categories[0].subcategories[0].name);
      } catch {}
    }
  }, [categories, isMobile]);

  useEffect(() => {
    if (selectedCategory) {
      fetchDataForSubcategory(selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${apiBaseURL}/categories/?page=1`);
        setCategories(response.data.results);
      } catch (error) {
        setError(error);
        console.error("Ошибка при получении категорий:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className={`side-panel ${showSidePanel ? "show" : "hide"}`}>
      <div className="search-bar" style={{ borderBottom: "1px solid #F5F5F5" }}>
        <Icon28SearchOutline className="search-icon" />
        <input
          type="text"
          placeholder="Введите название раздела..."
          value={searchContent}
          onChange={onSearch}
          className="search-input"
        />
      </div>
      <List>
        {filteredCategories.map((category, index) => (
          <div key={category.id}>
            <Cell
              className={`category-cell ${
                selectedCategory === category.name ? "selected" : ""
              } ${isFirstCategory(index) ? "disabled" : ""}`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="category-title">
                <img
                  src={criminalIcon}
                  alt="Category Icon"
                  className="category-icon"
                />
                {category.name}
              </div>
            </Cell>

            {expandedCategories[category.name] && (
              <List className="subcategory-list">
                {category.subcategories.map((sub, index) => (
                  <Cell
                    key={sub.id}
                    className={`subcategory-cell ${
                      selectedCategory === sub.name ? "selected" : ""
                    }`}
                    onClick={() => handleSubcategoryClick(sub.name)}
                  >
                    <div className="subcategory-title">
                      <img
                        src={icons[index % icons.length]}
                        alt="Subcategory Icon"
                        className="subcategory-icon"
                      />
                      {sub.name}
                    </div>
                  </Cell>
                ))}
              </List>
            )}
          </div>
        ))}
      </List>
    </div>
  );
};

const CaseList = ({
  currentPage,
  content,
  filterContent,
  setActiveSection,
}) => {
  const [error, setError] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const calculateItemsPerPage = () => {
    const elementHeight = 70;
    const windowHeight = window.innerHeight;
    const calculatedItems = Math.floor(windowHeight / elementHeight);
    setItemsPerPage(calculatedItems > 0 ? calculatedItems : 1);
  };

  useEffect(() => {
    calculateItemsPerPage();
    window.addEventListener("resize", calculateItemsPerPage);

    return () => {
      window.removeEventListener("resize", calculateItemsPerPage);
    };
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const filteredContent = filterContent(content);
  const casesForPage = filteredContent.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleCaseClick = async (caseData) => {
    try {
      const response = await axios.get(
        `https://lawrs.ru:8000/api/court-cases/?category=${caseData.section_title}&is_group=1`
      );
      const data = response.data.results;
      setsearch_result(data);
      setActiveSection("FindPage");
      console.log("Полученные данные:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Произошла ошибка при получении данных");
    }
  };

  return (
    <div className="case-list-wrapper">
      <List>
        {casesForPage.map((caseData, index) => (
          <Cell
            key={index}
            description={caseData.description}
            className={`case-cell ${
              index === casesForPage.length - 1 ? "no-border" : ""
            }`}
            style={{
              borderBottom:
                index !== casesForPage.length - 1
                  ? "2px solid #F5F5F5"
                  : undefined,
            }}
            onClick={() => handleCaseClick(caseData)}
          >
            <div className="case-title">{caseData.section_title}</div>
            <div className="case-description">
              {caseData.section_description}
            </div>
          </Cell>
        ))}
      </List>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageButtons = () => {
    const buttons = [];

    if (totalPages > 0) {
      buttons.push(
        <button
          key={1}
          className={`pagination_page-button ${
            currentPage === 1 ? "active" : ""
          }`}
          onClick={() => handlePageClick(1)}
          aria-current={currentPage === 1 ? "page" : undefined}
        >
          1
        </button>
      );
    }

    if (currentPage > 3) {
      buttons.push(<span key="gap-start">...</span>);
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`pagination_page-button ${
            currentPage === i ? "active" : ""
          }`}
          onClick={() => handlePageClick(i)}
          aria-current={currentPage === i ? "page" : undefined}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages - 2) {
      buttons.push(<span key="gap-end">...</span>);
    }

    if (totalPages > 1) {
      buttons.push(
        <button
          key={totalPages}
          className={`pagination_page-button ${
            currentPage === totalPages ? "active" : ""
          }`}
          onClick={() => handlePageClick(totalPages)}
          aria-current={currentPage === totalPages ? "page" : undefined}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="pagination">
      <div className="pagination-wrapper">
        <button
          className="pagination_back-button"
          disabled={currentPage === 1}
          onClick={() => handlePageClick(currentPage - 1)}
        >
          Назад
        </button>

        {renderPageButtons()}

        <button
          className="pagination_next-button"
          disabled={currentPage === totalPages}
          onClick={() => handlePageClick(currentPage + 1)}
        >
          Вперед
        </button>
      </div>
    </div>
  );
};

const RubricatorPanel = ({
  selectedCategory,
  currentPage,
  totalPages,
  onPageChange,
  content,
  setActiveSection,
  setSelectedCase,
  filterContent,
}) => (
  <CaseList
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={onPageChange}
    content={content}
    selectedCategory={selectedCategory}
    setActiveSection={setActiveSection}
    setSelectedCase={setSelectedCase}
    filterContent={filterContent}
  />
);

const WelcomePage = () => {
  const [activeSection, setActiveSection] = useState("WelcomePage");
  return (
    <Group>
      <Div>
        <img src={clearlogo} className="logo-top" />
        <div className="welcome-block">
          <div className="welcome-block-content">
            <img src={sadcat} className="logo-cat" />
            <div className="welcome-title">
              <h2>
                Здравствуйте, <span id="user-name">Имя пользователя</span>!
              </h2>
              <h2>К сожалению у Вас нет доступа к данному приложению.</h2>
            </div>
            <div className="welcome-desc">
              <span>
                Энциклопедия судебных актов доступна донам сообщества Мир
                юриспруденции.
              </span>
              <span>
                Для получения доступа вам необходимо оплатить подписку
              </span>
            </div>
            <div className="Welcome-buttons">
              <Button
                style={{ marginBottom: "15px" }}
                onClick={() => setActiveSection("Rubricator")}
              >
                Оплатить подписку
              </Button>
              <Button style={{ marginBottom: "15px" }}>
                Чем ещё полезна подписка?
              </Button>
              <Button style={{ marginBottom: "15px" }}>
                Написать в службу поддержки
              </Button>
              <Button style={{ marginBottom: "15px" }}>
                Перейти в сообщество
              </Button>
            </div>
          </div>
        </div>
      </Div>
    </Group>
  );
};

const KeywordSearchPanel = ({ setActiveSection }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetterGroup, setSelectedLetterGroup] = useState(0);
  const [showAllWords, setShowAllWords] = useState(false);

  const [alphabetCategories, setAlphabetCategories] = useState({
    А: [],
    Б: [],
    В: [],
    Г: [],
    Д: [],
    Е: [],
    Ж: [],
    З: [],
    И: [],
    К: [],
    Л: [],
    М: [],
    Н: [],
    О: [],
    П: [],
    Р: [],
    С: [],
    Т: [],
    У: [],
    Ф: [],
    Х: [],
    Ц: [],
    Ч: [],
    Ш: [],
    Щ: [],
    Э: [],
    Ю: [],
    Я: [],
  });
  const [selectedLetter, setSelectedLetter] = useState("А");
  const [categoriesToShow, setCategoriesToShow] = useState([]);
  const [showGroup, setShowGroup] = useState(true);

  const fetchDAta = async () => {
    if (!alphabetCategories["А"].length) {
      await axios
        .post(`https://lawrs.ru:8000/api/count_cases_add/word`, {
          word: true,
        })
        .then((response) => {
          setAlphabetCategories(response.data);
        })
        .catch((error) => console.error("Ошибка при получении данных:", error));
    }
  };
  useEffect(() => {
    fetchDAta();
  });
  const filteredCategories = searchQuery
    ? Object.keys(alphabetCategories).reduce((acc, letter) => {
        const matchingCategories = alphabetCategories[letter].filter((item) =>
          item.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (matchingCategories.length > 0) {
          acc.push({ letter, categories: matchingCategories });
        }
        return acc;
      }, [])
    : groupedAlphabet[selectedLetterGroup].map((letter) => ({
        letter,
        categories: alphabetCategories[letter] || [],
      }));

  const handlePrevGroupClick = () => {
    setSelectedLetterGroup((prev) => Math.max(0, prev - 1));
  };

  const handleNextGroupClick = () => {
    setSelectedLetterGroup((prev) =>
      Math.min(groupedAlphabet.length - 1, prev + 1)
    );
  };

  const handleShowAllWords = (letter) => {
    setShowAllWords(true);
    setSelectedLetter(letter);
    setShowGroup(false);
  };

  const handleShowAlphabet = () => {
    setShowAllWords(false);
    setSelectedLetter("");
    setShowGroup(true);
  };

  const getCategoriesForLetter = () => {
    return alphabetCategories[selectedLetter] || [];
  };

  const handlePrevLetterClick = () => {
    const currentLetterIndex = Object.keys(alphabetCategories).findIndex(
      (letter) => letter === selectedLetter
    );

    if (currentLetterIndex > 0) {
      const prevLetter =
        Object.keys(alphabetCategories)[currentLetterIndex - 1];
      setSelectedLetter(prevLetter);
      setCategoriesToShow(getCategoriesForLetter());
    }
  };

  const handleNextLetterClick = () => {
    const currentLetterIndex = Object.keys(alphabetCategories).findIndex(
      (letter) => letter === selectedLetter
    );

    if (currentLetterIndex < Object.keys(alphabetCategories).length - 1) {
      const nextLetter =
        Object.keys(alphabetCategories)[currentLetterIndex + 1];
      setSelectedLetter(nextLetter);
      setCategoriesToShow(getCategoriesForLetter());
    }
  };

  const filterWords = (words, query) => {
    if (query.trim() === "") {
      return words;
    }
    return words.filter((word) =>
      word.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleSubmit = (word) => {
    axios
      .post(`https://lawrs.ru:8000/api/count_cases_add/search`, {
        document_text: word,
      })
      .then((response) => {
        setsearch_result(response.data);
        setActiveSection("FindPage");
      })
      .catch((error) => console.error("Ошибка при получении данных:", error));
  };

  return (
    <Group>
      {showAllWords ? (
        <div className="word-list">
          <div className="inAlphabet-nav">
            <div className="alphabet-header">
              <h2
                className="keywordsearch-title"
                style={{ color: "#5c5f6d", fontWeight: "400" }}
              >
                {" "}
                Поиск по ключевым словам (буква {selectedLetter})
              </h2>
              <div className="alphabet-input-wrapper">
                <Icon28SearchOutline
                  className="search-icon"
                  style={{ margin: "0px 0px 0px 2px" }}
                />
                <input
                  className="alphabet-input"
                  style={{
                    display: "flex",
                    backgroundColor: "#fff",
                    padding: "0px 5px",
                    height: "31px",
                    width: "100%",
                  }}
                  type="text"
                  placeholder="Начните вводить ключевое слово"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="inAlphabet-buttons">
              <div
                сlassName="backtoalphabet"
                onClick={handleShowAlphabet}
                style={{
                  marginRight: "10px",
                  borderRadius: "5px",
                  color: "#fff",
                  padding: "7px 10px 7px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={backtosearchicon}
                  style={{ height: "12px", padding: "2px 5px 0px 0px" }}
                />
                Вернуться к алфавиту
              </div>
              <button
                className="prevletter"
                onClick={handlePrevLetterClick}
                style={{
                  marginRight: "10px",
                  borderRadius: "5px",
                  color: "#3871e0",
                  border: "1px solid #3871e0",
                }}
              >
                &lt; Предыдущая буква
              </button>
              <button
                className="nextletter"
                onClick={handleNextLetterClick}
                style={{
                  marginRight: "10px",
                  borderRadius: "5px",
                  color: "#3871e0",
                  border: "1px solid #3871e0",
                }}
              >
                Следующая буква &gt;
              </button>
            </div>
          </div>
          <List>
            {filterWords(alphabetCategories[selectedLetter], searchQuery).map(
              (word, index) => (
                <div className="word-list-block" key={index}>
                  <Cell key={index} onClick={() => handleSubmit(word)}>
                    {word}
                  </Cell>
                  <button
                    text=">"
                    style={{
                      backgroundColor: "#3871e0",
                      color: "#fff",
                      borderRadius: "0px 5px 5px 0px",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {">"}
                  </button>
                </div>
              )
            )}
          </List>
          <div style={{ display: "flex", justifyContent: "center" }}></div>
        </div>
      ) : (
        <>
          <div className="alphabet-page">
            <div className="Keywordsearch-header">
              <h2
                className="keywordsearch-title"
                style={{ color: "#5c5f6d", fontWeight: "400" }}
              >
                {" "}
                Поиск по ключевому слову
              </h2>
            </div>
            <div className="alphabet-nav-wrapper">
              <div className="Keywordsearch-wrapper">
                <Icon28SearchOutline
                  className="search-icon"
                  style={{ margin: "5px 0px 0px 2px" }}
                />
                <input
                  className="Keywordsearch-input"
                  style={{
                    display: "flex",
                    backgroundColor: "#fff",
                    padding: "5px",
                    height: "25px",
                    width: "100%",
                  }}
                  type="text"
                  placeholder="Введите ключевое слово, фразу или номер дела"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  className="Keywordsearch-find"
                  size="m"
                  mode="secondary"
                  onClick={handlePrevGroupClick}
                  disabled={selectedLetterGroup === 0}
                >
                  Найти
                </button>
              </div>
              <div className="alphabet-nav">
                <button
                  className="alphabet-nav-button"
                  size="m"
                  mode="secondary"
                  onClick={handlePrevGroupClick}
                  disabled={selectedLetterGroup === 0}
                >
                  Назад
                </button>
                <div className="alphabet-groups">
                  {groupedAlphabet.map((group, index) => (
                    <Button
                      key={index}
                      size="m"
                      mode="secondary"
                      onClick={() => setSelectedLetterGroup(index)}
                      className={
                        selectedLetterGroup === index
                          ? "alphabet-group active"
                          : "alphabet-group"
                      }
                    >
                      {group.join("")}
                    </Button>
                  ))}
                </div>
                <button
                  className="alphabet-nav-button"
                  size="m"
                  mode="secondary"
                  onClick={handleNextGroupClick}
                  disabled={selectedLetterGroup === groupedAlphabet.length - 1}
                >
                  Вперед
                </button>
              </div>
            </div>
            <div className="list-alphabet">
              {filteredCategories.map((group, index) => {
                return (
                  <Div key={index} className="alphabet-category-cell">
                    <div className="card-header">
                      <span className="card-title">{group.letter}</span>
                      <button
                        size="s"
                        mode="secondary"
                        onClick={() => handleShowAllWords(group.letter)}
                        className="show-all-button"
                      >
                        Показать полностью
                      </button>
                    </div>
                    {group.categories.slice(0, 6).map((word, idx) => (
                      <Cell
                        onClick={() => handleSubmit(word)}
                        style={{
                          color: "#818181",
                          fontSize: "13px",
                          fontWeight: "400",
                        }}
                        key={idx}
                      >
                        {word}
                      </Cell>
                    ))}
                  </Div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </Group>
  );
};

const LawSearchPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isToggled1, setIsToggled1] = useState(true);
  const [isToggled2, setIsToggled2] = useState(true);
  const [isToggled3, setIsToggled3] = useState(true);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showDisplayOptions, setShowDisplayOptions] = useState(false);
  const [sortType, setSortType] = useState(null);
  const [selectedLawId, setSelectedLawId] = useState(null);
  const [filteredContent, setFilteredContent] = useState("");

  const sortOptionsRef = useRef(null);
  const displayOptionsRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      displayOptionsRef.current &&
      !displayOptionsRef.current.contains(event.target)
    ) {
      setShowDisplayOptions(false);
    }
    if (
      sortOptionsRef.current &&
      !sortOptionsRef.current.contains(event.target)
    ) {
      setShowSortOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLawClick = (lawId) => {
    setSelectedLawId(lawId);
  };

  const onToggle1 = () => setIsToggled1(!isToggled1);
  const onToggle2 = () => setIsToggled2(!isToggled2);
  const onToggle3 = () => setIsToggled3(!isToggled3);

  const getFilteredAndSortedLaws = () => {
    let filteredLaws = lawsData.filter((law) => {
      if (law.icon === "constitution" && !isToggled1) return false;
      if (law.icon === "book" && !isToggled2) return false;
      if (law.icon === "file" && !isToggled3) return false;

      if (
        searchQuery &&
        !law.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;

      return true;
    });

    if (sortType === "legalStrength") {
      filteredLaws = filteredLaws.sort(
        (a, b) => b.legalStrength - a.legalStrength
      );
    } else if (sortType === "popularity") {
      filteredLaws = filteredLaws.sort((a, b) => b.popularity - a.popularity);
    } else if (sortType === "alphabetical") {
      filteredLaws = filteredLaws.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return filteredLaws;
  };

  const filteredAndSortedLaws = getFilteredAndSortedLaws();

  const itemsPerPage = 33;
  const totalPages = Math.ceil(filteredAndSortedLaws.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(
    startIndex + itemsPerPage,
    filteredAndSortedLaws.length
  );

  const displayedLawsData = filteredAndSortedLaws.slice(startIndex, endIndex);

  const column1 = displayedLawsData.slice(0, 11);
  const column2 = displayedLawsData.slice(11, 22);
  const column3 = displayedLawsData.slice(22, 33);

  const selectedLaw = lawsData.find((law) => law.id === selectedLawId);

  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionIndex) => {
    setExpandedSections((prevExpandedSections) => ({
      ...prevExpandedSections,
      [sectionIndex]: !prevExpandedSections[sectionIndex],
    }));
  };

  const handleShowLaws = () => {
    setSelectedLawId(null);
  };

  const filterSection = (section, searchQuery) => {
    if (!searchQuery) return true;
    return (
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.points.some((point) =>
        point.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  const filterPoint = (point, searchQuery) => {
    if (!searchQuery) return true;
    return point.toLowerCase().includes(searchQuery.toLowerCase());
  };

  return (
    <Group>
      <Div className="law-search-content">
        {selectedLawId === null ? (
          <div>
            <div className="law-search-header">
              <h2 className="rubricator-header">Поиск по норме права</h2>
              <div className="law-search-input-wrapper">
                <Icon28SearchOutline style={{ paddingLeft: "6px" }} />
                <input
                  type="text"
                  placeholder="Начните вводить статью..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="law-search-input"
                />
              </div>
            </div>
            <div className="law-search-controls">
              <div className="law-search-buttons">
                <div
                  className="display-button"
                  onClick={() => setShowDisplayOptions((prev) => !prev)}
                >
                  <img src={displayicon} alt="Отображение" />
                  <button className="law-search-button">Отображение</button>
                  <img
                    src={downicon}
                    alt="downicon"
                    style={{ height: "5px", marginTop: "5px" }}
                  />
                </div>
                {showDisplayOptions && (
                  <div className="options-container" ref={displayOptionsRef}>
                    <ul>
                      <li>
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={isToggled1}
                            onChange={onToggle1}
                          />
                          <span className="switch" />
                          <span style={{ width: "95px" }}>Конституция</span>
                        </label>
                      </li>
                      <li>
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={isToggled2}
                            onChange={onToggle2}
                          />
                          <span className="switch" />
                          <span style={{ width: "95px" }}>Кодексы</span>
                        </label>
                      </li>
                      <li>
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={isToggled3}
                            onChange={onToggle3}
                          />
                          <span className="switch" />
                          <span style={{ width: "95px" }}>Законы</span>
                        </label>
                      </li>
                    </ul>
                  </div>
                )}
                <div
                  className="sort-button"
                  onClick={() => setShowSortOptions((prev) => !prev)}
                >
                  <img src={sorticon} alt="Сортировка" />
                  <button className="law-search-button-right">
                    Сортировать
                  </button>
                  <img
                    src={downicon}
                    alt="downicon"
                    style={{ height: "5px", marginTop: "5px" }}
                  />
                </div>
                {showSortOptions && (
                  <div className="options-container2" ref={sortOptionsRef}>
                    <ul>
                      <li onClick={() => setSortType("legalStrength")}>
                        <img src={popupicon1} alt="Юридическая сила" />
                        <button>По юридической силе</button>
                      </li>
                      <li onClick={() => setSortType("popularity")}>
                        <img src={popupicon2} alt="Популярность" />
                        <button>По популярности</button>
                      </li>
                      <li onClick={() => setSortType("alphabetical")}>
                        <img src={popupicon3} alt="Алфавит" />
                        <button>По алфавиту</button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
            <div className="law-search-list">
              <div style={{ flex: 1 }}>
                {column1.map((law) => (
                  <SimpleCell
                    className="law-search-block"
                    key={law.id}
                    onClick={() => handleLawClick(law.id)}
                    before={
                      law.icon === "constitution" ? (
                        <img
                          src={constitution}
                          alt="Конституция"
                          style={{
                            height: "16px",
                            width: "16px",
                            marginBottom: "auto",
                            marginTop: "auto",
                          }}
                        />
                      ) : law.icon === "book" ? (
                        <img
                          src={bookicon}
                          alt="book"
                          style={{
                            height: "16px",
                            marginBottom: "auto",
                            marginTop: "auto",
                          }}
                        />
                      ) : (
                        <img
                          src={fileicon}
                          alt="file"
                          style={{
                            height: "16px",
                            marginBottom: "auto",
                            marginTop: "auto",
                          }}
                        />
                      )
                    }
                  >
                    {law.title}
                  </SimpleCell>
                ))}
              </div>
              <div style={{ flex: 1 }}>
                {column2.map((law) => (
                  <SimpleCell
                    className="law-search-block"
                    key={law.id}
                    onClick={() => handleLawClick(law.id)}
                    before={
                      law.icon === "constitution" ? (
                        <img
                          src={constitution}
                          alt="Конституция"
                          style={{
                            height: "16px",
                            width: "16px",
                            marginBottom: "auto",
                            marginTop: "auto",
                          }}
                        />
                      ) : law.icon === "book" ? (
                        <img
                          src={bookicon}
                          alt="book"
                          style={{
                            height: "16px",
                            marginBottom: "auto",
                            marginTop: "auto",
                          }}
                        />
                      ) : (
                        <img
                          src={fileicon}
                          alt="file"
                          style={{
                            height: "16px",
                            marginBottom: "auto",
                            marginTop: "auto",
                          }}
                        />
                      )
                    }
                  >
                    {law.title}
                  </SimpleCell>
                ))}
              </div>
              <div style={{ flex: 1 }}>
                {column3.map((law) => (
                  <SimpleCell
                    className="law-search-block"
                    key={law.id}
                    onClick={() => handleLawClick(law.id)}
                    before={
                      law.icon === "constitution" ? (
                        <img
                          src={constitution}
                          alt="Конституция"
                          style={{
                            height: "16px",
                            width: "16px",
                            marginBottom: "auto",
                            marginTop: "auto",
                          }}
                        />
                      ) : law.icon === "book" ? (
                        <img
                          src={bookicon}
                          alt="book"
                          style={{
                            height: "16px",
                            marginBottom: "auto",
                            marginTop: "auto",
                          }}
                        />
                      ) : (
                        <img
                          src={fileicon}
                          alt="file"
                          style={{
                            height: "16px",
                            marginBottom: "auto",
                            marginTop: "auto",
                          }}
                        />
                      )
                    }
                  >
                    {law.title}
                  </SimpleCell>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="law-detail">
            <div className="law-search-header">
              <h2 className="rubricator-header">Поиск по норме права</h2>
              <div className="law-search-input-wrapper">
                <Icon28SearchOutline style={{ paddingLeft: "6px" }} />
                <input
                  type="text"
                  placeholder="Введите номер статьи..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="law-search-input"
                />
              </div>
            </div>
            <div className="law-search-controls">
              <div className="law-search-buttons">
                <div
                  сlassName="backtoalphabet"
                  onClick={handleShowLaws}
                  style={{
                    margin: "5px 10px 0px 0px",
                    borderRadius: "5px",
                    color: "#fff",
                    padding: "0px 10px 0px",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#3871e0",
                    height: "32.5px",
                  }}
                >
                  <img
                    src={backtosearchicon}
                    style={{ height: "15px", padding: "2px 5px 0px 0px" }}
                  />
                  Вернуться к списку
                </div>
                <div
                  className="display-button"
                  onClick={() => setShowDisplayOptions((prev) => !prev)}
                >
                  <img src={displayicon} alt="Отображение" />
                  <button className="law-search-button">Отображение</button>
                  <img
                    src={downicon}
                    alt="downicon"
                    style={{ height: "5px", marginTop: "5px" }}
                  />
                </div>
                {showDisplayOptions && (
                  <div className="options-container3" ref={displayOptionsRef}>
                    <ul>
                      <li>
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={isToggled1}
                            onChange={onToggle1}
                          />
                          <span className="switch" />
                          <span style={{ width: "95px" }}>Конституция</span>
                        </label>
                      </li>
                      <li>
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={isToggled2}
                            onChange={onToggle2}
                          />
                          <span className="switch" />
                          <span style={{ width: "95px" }}>Кодексы</span>
                        </label>
                      </li>
                      <li>
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={isToggled3}
                            onChange={onToggle3}
                          />
                          <span className="switch" />
                          <span style={{ width: "95px" }}>Законы</span>
                        </label>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="selectedLaw-content">
              <h2>{selectedLaw.title}</h2>
              <p>{selectedLaw.content}</p>
              <div className="sections">
                {selectedLaw.sections
                  .filter((section) => filterSection(section, searchQuery))
                  .map((section, index) => (
                    <div key={index} className="section">
                      <h3 onClick={() => toggleSection(index)}>
                        {expandedSections[index] ? (
                          <span className="expand-icon">&#5171;</span>
                        ) : (
                          <span className="expand-icon">&#5167;</span>
                        )}
                        {section.title}
                      </h3>
                      {expandedSections[index] && (
                        <ul>
                          {section.points
                            .filter((point) => filterPoint(point, searchQuery))
                            .map((point, pointIndex) => (
                              <li key={pointIndex}>{point}</li>
                            ))}
                        </ul>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </Div>
    </Group>
  );
};

const AdvancedSearch = ({ setActiveSection }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [productionType, setProductionType] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [uid, setUid] = useState("");
  const [court, setCourt] = useState("");
  const [judge, setJudge] = useState("");
  const [judges, setJudges] = useState([]);
  const [courts, setCourts] = useState([]);
  const [productionTypes, setProductionTypes] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("date-range");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [singleDate, setSingleDate] = useState(new Date());
  const [disputant, setDisputant] = useState("");
  const [disputants_raw, setDisputants_raw] = useState([]);
  const [disputants, setDisputants] = useState([]);

  const PARTICIPANT_OPTIONS = [
    { value: "Любой участник", label: "Любой участник" },
    { value: "Истец", label: "Истец" },
    { value: "Ответчик", label: "Ответчик" },
  ];
  useEffect(() => {
    if (!judges.length) {
      axios
        .post(`https://lawrs.ru:8000/api/count_cases_add/search`, {
          list_judge: true,
        })
        .then((response) => {
          setJudges(response.data);
        });
    }
    if (!courts.length) {
      axios
        .post(`https://lawrs.ru:8000/api/count_cases_add/search`, {
          list_court: true,
        })
        .then((response) => {
          setCourts(response.data);
        });
    }
    if (!productionTypes.length) {
      axios
        .get(`https://lawrs.ru:8000/api/categories/?page=1`)
        .then((response) => {
          let res = [];

          response.data.results.forEach((el) => {
            res.push(el.name);
            el.subcategories.forEach((el_2) => {
              res.push(el_2.name);
            });
          });

          setProductionTypes(res);
        });
    }
    if (!disputants.length) {
      axios
        .post(`https://lawrs.ru:8000/api/count_cases_add/search`, {
          users: true,
        })
        .then((response) => {
          let res = response.data;
          let data = [];
          res.forEach((el) => {
            let is_add = true;
            data.forEach((el_data) => {
              if (el.name === el_data.name && el.role === el_data.role) {
                is_add = false;
              }
              if (!el.name) {
                is_add = false;
              }
            });
            if (is_add) {
              data.push(el);
            }
          });
          setDisputants(data);
          setDisputants_raw(data);
        });
    }
  });

  const setDisputantHandle = (val) => {
    setSelectedRole(val);
    let data = [];
    setDisputants(data);
    console.debug(213213);
    if (val === "Любой участник") {
      setDisputants(disputants_raw);
      return;
    }
    disputants_raw.forEach((el) => {
      console.debug(el.role, val);
      if (el.role === val) {
        data.push(el);
      }
    });
    console.debug(data);
    setDisputants(data);
  };
  const [selectedRole, setSelectedRole] = useState(
    PARTICIPANT_OPTIONS[0].value
  );

  const handleSubmit = () => {
    let data = {
      document_text: searchQuery,
      case_number: caseNumber,
      court: court,
      judge: judge,
      user: disputant,
      uid: uid,
      category: productionType,
    };
    if (selectedRole != "Любой участник") {
      data.user_role = selectedRole;
    }
    if (selectedFilter === "date-range") {
      let startDate_new = new Date(startDate);
      let year = startDate_new.getUTCFullYear();
      let month = String(startDate_new.getUTCMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
      let day = String(startDate_new.getUTCDate()).padStart(2, "0");
      let endDate_new = new Date(endDate);
      let year_2 = endDate_new.getUTCFullYear();
      let month_2 = String(endDate_new.getUTCMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
      let day_2 = String(endDate_new.getUTCDate()).padStart(2, "0");
      data.date_first = `${year}-${month}-${day}`;
      data.date_last = `${year_2}-${month_2}-${day_2}`;
    }
    if (selectedFilter === "exact-date") {
      let startDate_new = new Date(singleDate);
      let year = startDate_new.getUTCFullYear();
      let month = String(startDate_new.getUTCMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
      let day = String(startDate_new.getUTCDate()).padStart(2, "0");
      data.date_first = `${year}-${month}-${day}`;
    }
    if (selectedFilter === "earlier-than") {
      let startDate_new = new Date(singleDate);
      let year = startDate_new.getUTCFullYear();
      let month = String(startDate_new.getUTCMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
      let day = String(startDate_new.getUTCDate()).padStart(2, "0");
      data.date_last_lte = `${year}-${month}-${day}`;
    }
    if (selectedFilter === "later-than") {
      let startDate_new = new Date(singleDate);
      let year = startDate_new.getUTCFullYear();
      let month = String(startDate_new.getUTCMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
      let day = String(startDate_new.getUTCDate()).padStart(2, "0");
      data.date_first_gte = `${year}-${month}-${day}`;
    }
    console.debug(selectedFilter);

    axios
      .post(`https://lawrs.ru:8000/api/count_cases_add/search`, data)
      .then((response) => {
        setsearch_result(response.data);
        setActiveSection("FindPage");
      })
      .catch((error) => console.error("Ошибка при получении данных:", error));
  };

  const handleClear = () => {
    setSearchQuery("");
    setProductionType("");
    setCaseNumber("");
    setUid("");
    setStartDate(null);
    setEndDate(null);
    setCourt("");
    setJudge("");
    setDisputant("");
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.id);
  };
  const renderDatePicker = () => {
    switch (selectedFilter) {
      case "date-range":
        return (
          <div className="advanced-search-input-group">
            <div className="advancedsearch-date-wrapper">
              <div className="advancedsearch-date-left">
                <text className="advanced-title">с</text>
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
                  <img src={dataicon} />
                </div>
              </div>
              <div className="advancedsearch-date-right">
                <text className="advanced-title">по</text>
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
      case "exact-date":
        return (
          <div className="advanced-search-input-group">
            <div className="advancedsearch-date-wrapper">
              <div className="advancedsearch-date-left">
                <text className="advanced-title">Дата:</text>
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
      case "earlier-than":
        return (
          <div className="advanced-search-input-group">
            <div className="advancedsearch-date-wrapper">
              <div className="advancedsearch-date-left">
                <text className="advanced-title">Ранее чем:</text>
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
      case "later-than":
        return (
          <div className="advanced-search-input-group">
            <div className="advancedsearch-date-wrapper">
              <div className="advancedsearch-date-left">
                <text className="advanced-title">Позднее чем:</text>
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
    <Group>
      {true ? (
        <Group>
          <div className="advanced-search-container">
            <div className="advanced-search-input-group">
              <div className="advansedsearch1-block">
                <div className="advansedsearch1-wrapper">
                  <div className="advansedsearch1-left">
                    <text className="advanced-title">Текст судебного акта</text>
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
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      сlassName="text-act"
                    />
                  </div>
                  <div className="advansedsearch1-right">
                    <text className="advanced-title">Вид производства</text>
                    <div className="inputdropicon">
                      <select
                        style={{
                          display: "flex",
                          backgroundColor: "#fff",
                          padding: "0px",
                          borderRadius: "5px",
                          border: "none",
                          color: "#5c5f6d",
                        }}
                        value={productionType}
                        onChange={(e) => setProductionType(e.target.value)}
                      >
                        {productionType === "" && <option value=""></option>}

                        {productionTypes.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <img
                        src={downicon}
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
                  <text className="advanced-title">Номер дела</text>
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
                    onChange={(e) => setCaseNumber(e.target.value)}
                  />
                </div>
                <div className="advancedsearch2-right">
                  <text className="advanced-title">
                    Уникальный идентификатор (УИД)
                  </text>
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
                    onChange={(e) => setUid(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="advancedsearchdata-wrapper">
              <div className="advancedsearchdata-top">
                <text
                  className="advanced-title"
                  style={{ paddingLeft: "20px" }}
                >
                  Дата судебного акта:
                </text>
                <div className="advanced-title-switches">
                  <div className="radio-switch">
                    <input
                      type="radio"
                      id="date-range"
                      name="date-filter"
                      checked={selectedFilter === "date-range"}
                      onChange={handleFilterChange}
                    />
                    <label htmlFor="date-range">Дата с... по...</label>
                  </div>

                  <div className="radio-switch">
                    <input
                      type="radio"
                      id="exact-date"
                      name="date-filter"
                      checked={selectedFilter === "exact-date"}
                      onChange={handleFilterChange}
                    />
                    <label htmlFor="exact-date">Точная дата</label>
                  </div>

                  <div className="radio-switch">
                    <input
                      type="radio"
                      id="earlier-than"
                      name="date-filter"
                      checked={selectedFilter === "earlier-than"}
                      onChange={handleFilterChange}
                    />
                    <label htmlFor="earlier-than">Ранее чем</label>
                  </div>

                  <div className="radio-switch">
                    <input
                      type="radio"
                      id="later-than"
                      name="date-filter"
                      checked={selectedFilter === "later-than"}
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
                  <text className="advanced-title">Суд</text>
                  <div className="inputdropicon">
                    <select
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
                      {court === "" && <option value=""></option>}

                      {courts.map((item, index) => (
                        <option key={index} value={item.court}>
                          {item.court}
                        </option>
                      ))}
                    </select>
                    <img
                      src={downicon}
                      style={{
                        height: "5px",
                        marginTop: "auto",
                        marginBottom: "auto",
                      }}
                    />
                  </div>
                </div>
                <div className="advancedsearch3-right">
                  <text className="advanced-title">Судья</text>
                  <div className="inputdropicon">
                    <select
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
                      {judge === "" && <option value=""></option>}

                      {judges.map((item, index) => (
                        <option key={index} value={item.judge}>
                          {item.judge}
                        </option>
                      ))}
                    </select>
                    <img
                      src={downicon}
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
                <text className="advanced-title">Участник спора</text>
                <div
                  className="inputdropicon"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <select
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "5px",
                      border: "none",
                      width: "73%",
                      color: "#5c5f6d",
                    }}
                    value={disputant}
                    onChange={(e) => setDisputant(e.target.value)}
                  >
                    <option value=""></option>
                    {disputants.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedRole}
                    onChange={(e) => setDisputantHandle(e.target.value)}
                    style={{
                      border: "none",
                      borderLeft: "1px solid #f0f0f0",
                      height: "25px",
                      appearance: "none",
                      WebkitAppearance: "none",
                      MozAppearance: "none",
                      padding: "0px 5px",
                      color: "#5c5f6d",
                      width: "25%",
                      minWidth: "120px",
                    }}
                  >
                    {PARTICIPANT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <img
                    src={downicon}
                    style={{ height: "5px" }}
                    alt="down icon"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="advanced-search-buttons">
            <div onClick={handleSubmit} className="advanced-find-button">
              <img
                src={findicon}
                style={{
                  height: "15px",
                  paddingTop: "7.5px",
                  paddingBottom: "7.5px",
                  paddingLeft: "10px",
                }}
              />
              <button size="l" className="advanced-search">
                Найти
              </button>
            </div>
            <div onClick={handleClear} className="advanced-clear-button">
              <img
                src={clearicon}
                style={{
                  height: "15px",
                  paddingTop: "7.5px",
                  paddingBottom: "7.5px",
                  paddingLeft: "10px",
                }}
              />
              <button size="l" className="advanced-clear">
                Очистить все поля
              </button>
            </div>
          </div>
        </Group>
      ) : (
        <Group></Group>
      )}
    </Group>
  );
};

const LawPanel = ({ setActiveSection, selectedCase }) => {
  const [caseData, setCaseData] = useState(null);

  useEffect(() => {
    if (selectedCase && selectedCase.id) {
      axios
        .get(`https://lawrs.ru:8000/api/court-case/${selectedCase.id}/`)
        .then((response) => setCaseData(response.data))
        .catch((error) => console.error("Ошибка при получении данных:", error));
    }
  }, [selectedCase]);

  if (!caseData) {
    return <div>Выберите дело</div>;
  }

  return (
    <Group>
      <Div>
        <div className="LawPanel">
          <h2 className="rubricator-header">Просмотр судебного акта</h2>
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
                onClick={() => setActiveSection("Rubricator")}
              >
                <img
                  src={backtosearchicon}
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
              >
                <img
                  src={aiicon}
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
                  style={{ height: "15px", padding: "0px 5px 0px 0px" }}
                />
                <a href={caseData.url.replace("doc/", "doc/save/")}>
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
                <div
                  dangerouslySetInnerHTML={{ __html: caseData.document_text }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </Div>
    </Group>
  );
};

const FindPage = ({ setActiveSection, setSelectedCase }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(search_result.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = search_result.slice(indexOfFirstItem, indexOfLastItem);

  const fileIcons = [fileicon3, fileicon2, fileicon1];

  const handleCaseClick = (caseId) => {
    axios
      .get(`https://lawrs.ru:8000/api/court-case/${caseId}`)
      .then((response) => {
        console.log("Детали дела:", response.data);
        setActiveSection("LawPanel");
        setSelectedCase(response.data);
      })
      .catch((error) =>
        console.error("Ошибка при получении текста дела:", error)
      );
  };

  return (
    <Group>
      <Div className="FindPage">
        <h1 className="FindPage-header">Результат поиска</h1>

        <div className="FindPage-buttons" style={{ display: "flex" }}>
          <div
            className="backtosearch"
            onClick={() => setActiveSection("AdvancedSearch")}
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
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
                key={index}
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
      </Div>
    </Group>
  );
};

const App = () => {
  const [activeSection, setActiveSection] = useState("Rubricator");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [content, setContent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showSidePanel, setShowSidePanel] = useState(true);
  const [selectedCategoryInfo, setCategoryInfo] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCase, setSelectedCase] = useState(null);
  const [searchContent, setSearchContent] = useState("");

  const onSearch = (e) => {
    setSearchContent(e.target.value);
  };

  const itemsPerPage = 8;

  const sectionTitles = {
    Rubricator: "Рубрикатор судебной практики",
    KeywordSearch: "Поиск по ключевым словам",
    LawSearch: "Поиск по норме права",
    AdvancedSearch: "Расширенный поиск",
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchDataForCategory = async (categoryTitle) => {
    try {
      if (!categoryTitle) {
        categoryTitle = "1";
      }
      const response = await axios.get(
        `https://lawrs.ru:8000/api/court-cases/?category=${categoryTitle}&page_size=1000`
      );

      const data = response.data.results;
      setContent(data);
      setCurrentPage(1);
      setTotalPages(Math.ceil(data.length / itemsPerPage));
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  const handleCategoryClick = (categoryTitle) => {
    setSelectedCategory(categoryTitle);
    fetchDataForCategory(categoryTitle);
  };

  const filterContent = (content) => {
    console.log(content);
    if (searchContent === "") {
      return content;
    } else {
      return content.filter(
        (item) =>
          item.section_title
            .toLowerCase()
            .includes(searchContent.toLowerCase()) ||
          item.section_description
            .toLowerCase()
            .includes(searchContent.toLowerCase()) ||
          item.
      );
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "WelcomePage":
        return <WelcomePage />;
      case "Rubricator":
        return (
          <div className="RubricatorPanel">
            <SidePanel
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryClick}
              searchQuery={searchContent}
              onSearch={onSearch}
              showSidePanel={showSidePanel}
              setShowSidePanel={setShowSidePanel}
              setCategoryInfo={setCategoryInfo}
              setContent={setContent}
              searchContent={searchContent}
              setSearchContent={setSearchContent}
              filteredContent={filterContent(content)}
            />
            <RubricatorPanel
              content={content}
              selectedCategory={selectedCategory}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              selectedCategoryInfo={selectedCategoryInfo}
              setActiveSection={setActiveSection}
              setSelectedCase={setSelectedCase}
              filterContent={filterContent}
            />
          </div>
        );
      case "KeywordSearch":
        return <KeywordSearchPanel setActiveSection={setActiveSection} />;
      case "LawSearch":
        return <LawSearchPanel setActiveSection={setActiveSection} />;
      case "LawPanel":
        return (
          <LawPanel
            setActiveSection={setActiveSection}
            selectedCase={selectedCase}
          />
        );
      case "FindPage":
        return (
          <FindPage
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            setActiveSection={setActiveSection}
            setSelectedCase={setSelectedCase}
          />
        );
      default:
        return (
          <AdvancedSearch
            selectedCategory={selectedCategory}
            setActiveSection={setActiveSection}
          />
        );
    }
  };

  const { viewWidth } = useAdaptivity();
  /* 
закомментировал AppRoot, View и Panel тупо потому что прошлый разраб использовал кастомную навигацию
вместо VKUI навигации.
в будущем думаю это изменится, поэтому решил пока не удалять.
*/
  return (
    <ConfigProvider appearance="light">
      <AdaptivityProvider>
        {/* <AppRoot mode="embedded"> */}
        {/* <View activePanel="main"> */}
        {/* <Panel id="main"> */}
        <div className="app-wrapper">
          {!(activeSection === "WelcomePage") && (
            <PanelHeader delimiter="auto">
              <div className="header-center buttons-group">
                <div className="header-left">
                  <img src={clearlogo} alt="Logo" className="logo" />
                </div>
                <div className="header-navigation button-wrapper">
                  <div
                    size="m"
                    mode={
                      activeSection === "Rubricator" ? "primary" : "secondary"
                    }
                    onClick={() => setActiveSection("Rubricator")}
                    className={
                      "left-button " +
                      (activeSection === "Rubricator" ? "primary" : "secondary")
                    }
                  >
                    Рубрикатор
                  </div>
                  <div
                    size="m"
                    mode={
                      activeSection === "KeywordSearch"
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() => setActiveSection("KeywordSearch")}
                    className={
                      "button-keyword " +
                      (activeSection === "KeywordSearch"
                        ? "primary"
                        : "secondary")
                    }
                  >
                    Поиск по ключевым словам
                  </div>
                  <div
                    size="m"
                    mode={
                      activeSection === "LawSearch" ? "primary" : "secondary"
                    }
                    onClick={() => setActiveSection("LawSearch")}
                    className={
                      "button-lawsearch " +
                      (activeSection === "LawSearch" ? "primary" : "secondary")
                    }
                  >
                    Поиск по норме права
                  </div>
                  <div
                    size="m"
                    mode={
                      activeSection === "AdvancedSearch"
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() => setActiveSection("AdvancedSearch")}
                    className={
                      "right-button " +
                      (activeSection === "AdvancedSearch"
                        ? "primary"
                        : "secondary")
                    }
                  >
                    Расширенный поиск
                  </div>
                </div>
              </div>
            </PanelHeader>
          )}

          {!(
            activeSection === "LawSearch" ||
            activeSection === "WelcomePage" ||
            activeSection === "KeywordSearch" ||
            activeSection === "LawPanel" ||
            activeSection === "FindPage"
          ) && (
            <div>
              <div className="header-with-pagination">
                <h2 className="rubricator-header">
                  {sectionTitles[activeSection]}
                </h2>
                {activeSection === "Rubricator" &&
                  selectedCategory !== null &&
                  selectedCategory !== undefined && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  )}
              </div>
              {activeSection === "AdvancedSearch" && (
                <div className="warning">
                  <div className="warning-icon">
                    <img src={warningicon} style={{ height: "15px" }} />
                  </div>
                  <div>
                    Обратите внимание: вам необязательно заполнять все полня
                    данной формы. Для начала поиска достаточно заполнения одного
                    любого поля.
                  </div>
                </div>
              )}
            </div>
          )}
          <div
            className={`main-content ${
              activeSection === "Rubricator" ? "" : "full-width"
            }`}
          >
            <div className="content-area">{renderActiveSection()}</div>
          </div>
          <footer className="app-footer">
            <p>
              © 2024,{" "}
              <a
                href="https://vk.com/law365"
                target="_blank"
                rel="noopener noreferrer"
              >
                Мир юриспруденции
              </a>
            </p>
          </footer>
        </div>
        {/* </Panel> */}
        {/* </View> */}
        {/* </AppRoot> */}
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

const headerNavigation = document.querySelectorAll(
  ".left-button, .button-keyword, .button-lawsearch, .right-button"
);

headerNavigation.forEach((item) => {
  item.addEventListener("click", () => {
    headerNavigation.forEach((i) => i.classList.remove("active"));

    item.classList.add("active");
  });
});

const pageNavigation = document.querySelectorAll(".pagination_page-button");

pageNavigation.forEach((item) => {
  item.addEventListener("click", () => {
    pageNavigation.forEach((i) => i.classList.remove("active"));

    item.classList.add("active");
  });
});

export default App;
