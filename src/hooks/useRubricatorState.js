import { useEffect, useState } from "react";
import { useStore } from "./useStore";
import axios from "axios";

export const useRubricatorState = () => {
  const [searchContent, setSearchContent] = useState("");
  const [categories, setCategories] = useState([]); // server data

  const [cases, setCases] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const { state, dispatch } = useStore();

  const [totalPages, setTotalPages] = useState(0);
  const [slicedContent, setSlicedContent] = useState([]);

  const itemsByPage = 9;

  const sliceContent = (content, page) => {
    return content.slice(itemsByPage * page, itemsByPage * (page + 1));
  };

  const onPageChange = (page) => {
    setSlicedContent(sliceContent(cases, page));
  };

  const onSearch = (e) => {
    setSearchContent(e.target.value);
  };

  /**
   * @param {string} categoryName - название категории на которую кликнули, по ней осуществляется изменение отображаемого контента
   */
  const onCategorySelect = (categoryName) => {
    if (categoryName) {
      const category = categories.find((x) => x.name === categoryName);
      const newCases = category.court_cases;

      setCases(newCases);
      setSelectedCategory(categoryName);
      setTotalPages(Math.ceil(newCases.length / itemsByPage));
      setSlicedContent(sliceContent(newCases, 0));
    }
  };

  /**
   * @param {string} categoryName - название родительской категории
   * @param {string} subcategoryName - название подкатегории на которую кликнули, по ней осуществляется изменение отображаемого контента
   */
  const onSubcategorySelect = async (categoryName, subcategoryName) => {
    const category = categories.find((x) => x.name === categoryName);
    const subcategory = category?.subcategories?.find(
      (x) => x.name === subcategoryName
    );

    if (category && subcategory) {
      try {
        if (
          !state.casesByCategory?.find((x) =>
            x.subcategories.find((y) => y.subcategory === subcategoryName)
          )
        ) {
          setCases([]);
          setSlicedContent([]);
          setSelectedCategory(subcategoryName);
          await axios
            .get("https://lawrs.ru:8000/api/court-cases/", {
              params: {
                category: subcategoryName,
              },
            })
            .then((r) => {
              const newCases = r.data.results;

              setCases(newCases);
              dispatch({
                type: "court-cases-add",
                payload: {
                  category: categoryName,
                  subcategory: subcategoryName,
                  data: newCases,
                },
              });
              setSelectedCategory(subcategoryName);
              setTotalPages(Math.ceil(newCases.length / itemsByPage));
              setSlicedContent(sliceContent(newCases, 0));
            });
        } else {
          const newCases = state.casesByCategory
            .find((x) => x.category === categoryName)
            .subcategories.find((y) => y.subcategory === subcategoryName).cases;

          setCases(newCases);
          setSelectedCategory(subcategoryName);
          setTotalPages(Math.ceil(newCases.length / itemsByPage));
          setSlicedContent(sliceContent(newCases, 0));
        }
      } catch (e) {
        console.log(
          "Ошибка при получении данных Rubricator OnSubCategoryClick ",
          e
        );
      }
    }
  };

  // получение данных с сервака
  useEffect(() => {
    setCategories(state.categories);
  }, [state.categories]);
  // выбор первой вкладки
  useEffect(() => {
    if (state?.categories[0]?.subcategories?.length > 0 && !selectedCategory) {
      onSubcategorySelect(
        state.categories[0].name,
        state.categories[0].subcategories[0].name
      );
    } else if (!selectedCategory) {
      onCategorySelect(state?.categories[0]?.name);
    }
  }, [categories]);

  return {
    searchContent,
    onSearch,
    categories,
    cases: slicedContent,
    onCategorySelect,
    onSubcategorySelect,
    selectedCategory,
    totalPages,
    onPageChange,
  };
};
