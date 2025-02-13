import { useEffect, useState } from "react";
import axios from "axios";
import { useStore } from "../../../lib/store/useStore";
import { setupCache } from "axios-cache-adapter";

// -----------------------------------------------------------
// -----------------------------------------------------------
// --------- костыльный компонент, нужно переписать ----------
// -----------------------------------------------------------
// -----------------------------------------------------------

export const useRubricatorState = () => {
  const [searchContent, setSearchContent] = useState("");
  const [categories, setCategories] = useState([]); // server data

  const [cases, setCases] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const { state, dispatch } = useStore();

  const [totalPages, setTotalPages] = useState(0);
  const [slicedContent, setSlicedContent] = useState([]);

  const [filteredCategories, setFilteredCategories] = useState([]);

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

  const selectFirstCategory = () => {
    if (categories[0]?.subcategories[0]) {
      onSubcategorySelect(
        categories[0].name,
        categories[0].subcategories[0].name
      );
    } else if (categories[0]) {
      onCategorySelect(categories[0].name);
    }
  };

  // поиск
  useEffect(() => {
    if (searchContent.length !== 0) {
      const prevSlicedContent = slicedContent;
      const prevCases = cases;
      setCases([]);
      setSlicedContent([]);
      const delayedRequest = setTimeout(() => {
        axios
          .post(
            "https://lawrs.ru/legal_main/api/count_cases_add/filter_category_sections",
            {
              title: searchContent,
            }
          )
          .then((r) => {
            if (r.data.length > 0) {
              setCategories(r.data);
              setSelectedCategory(r.data[0].subcategories[0].name);

              // const newCases = state.casesByCategory
              //   .find((x) => x.category === r.data[0].name)
              //   .subcategories.find(
              //     (y) => y.subcategory === r.data[0].subcategories[0].name
              //   ).cases;

              const newCases = state.casesByCategory
                .find((x) => x.category === r.data[0].name)
                .subcategories.find(
                  (y) => y.subcategory === r.data[0].subcategories[0].name
                )
                .cases.filter((z) =>
                  z.section_title
                    .toLowerCase()
                    .includes(searchContent.toLowerCase())
                );

              setCases(newCases);
              setSlicedContent(sliceContent(newCases, 0));
              setTotalPages(Math.ceil(newCases.length / itemsByPage));
            } else {
              setCategories([]);
              setCases([]);
            }
          });
      }, 500);
      return () => {
        clearTimeout(delayedRequest);
        setSlicedContent(prevSlicedContent);
        setCases(prevCases);
      };
    } else {
      setCategories(state.categories);
      selectFirstCategory();
    }
  }, [searchContent]);

  const selectFirstCategoryOnRender = () => {
    if (state?.categories[0]?.subcategories?.length > 0 && !selectedCategory) {
      onSubcategorySelect(
        state.categories[0].name,
        state.categories[0].subcategories[0].name
      );
    } else if (!selectedCategory) {
      onCategorySelect(state?.categories[0]?.name);
    }
  };

  /**
   * @param {string} categoryName - название категории на которую кликнули, по ней осуществляется изменение отображаемого контента
   */
  const onCategorySelect = (categoryName) => {
    if (
      state.casesByCategory.some(
        (x) =>
          x.category === categoryName ||
          x.subcategories.some((y) => y.subcategory === categoryName)
      )
    ) {
      const category = state.casesByCategory.find(
        (x) =>
          x.category === categoryName ||
          x.subcategories.some((y) => y.subcategory === categoryName)
      );

      const newCases = category.subcategories[0].cases;

      const filteredCases = newCases.filter((x) =>
        x.section_title.toLowerCase().includes(searchContent.toLowerCase())
      );

      setCases(filteredCases);
      setSelectedCategory(categoryName);
      setTotalPages(Math.ceil(filteredCases.length / itemsByPage));
      setSlicedContent(sliceContent(filteredCases, 0));
    } else {
      setCases([]);
      setSlicedContent([]);
      setSelectedCategory(categoryName);

      const cache = setupCache({ maxAge: 2 * 60 * 60 * 1000 })

      const api = axios.create({
        adapter: cache.adapter
      })

      // axios
      //   .get("https://lawrs.ru/legal_main/api/court-cases/", {
      //     adapter: cache.adapter,
      //     category: categoryName,
      //   })
      api.get("https://lawrs.ru/legal_main/api/court-cases/", {
        category: categoryName,
      })
        .then(async (r) => {
          const newCases = r.data.results;

          const filteredCases = newCases.filter((x) =>
            x.section_title.toLowerCase().includes(searchContent.toLowerCase())
          );

          setCases(filteredCases);
          dispatch({
            type: "court-cases-add",
            payload: {
              category: categoryName,
              subcategory: categoryName,
              data: newCases,
            },
          });
          setSelectedCategory(categoryName);
          setTotalPages(Math.ceil(filteredCases.length / itemsByPage));
          setSlicedContent(sliceContent(filteredCases, 0));
        });
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
      if (
        !state.casesByCategory?.find((x) =>
          x.subcategories.find((y) => y.subcategory === subcategoryName)
        )
      ) {
        setCases([]);
        setSlicedContent([]);
        setSelectedCategory(subcategoryName);
        await axios
          .get("https://lawrs.ru/legal_main/api/court-cases/", {
            params: {
              category: subcategoryName,
            },
          })
          .then((r) => {
            const newCases = r.data.results;

            const filteredCases = newCases.filter((x) =>
              x.section_title
                .toLowerCase()
                .includes(searchContent.toLowerCase())
            );

            setCases(filteredCases);

            dispatch({
              type: "court-cases-add",
              payload: {
                category: categoryName,
                subcategory: subcategoryName,
                data: newCases,
              },
            });

            setSelectedCategory(subcategoryName);
            setTotalPages(Math.ceil(filteredCases.length / itemsByPage));
            setSlicedContent(sliceContent(filteredCases, 0));
          });
      } else {
        const newCases = state.casesByCategory
          .find((x) => x.category === categoryName)
          .subcategories.find((y) => y.subcategory === subcategoryName).cases;

        const filteredCases = newCases.filter((x) =>
          x.section_title.toLowerCase().includes(searchContent.toLowerCase())
        );

        setCases(filteredCases);
        setSelectedCategory(subcategoryName);
        setTotalPages(Math.ceil(filteredCases.length / itemsByPage));
        setSlicedContent(sliceContent(filteredCases, 0));
      }
    }
  };

  // получение данных с сервака
  useEffect(() => {
    setCategories(state.categories);
    setFilteredCategories(state.categories);
  }, [state.categories]);

  // выбор первой вкладки

  useEffect(() => {
    selectFirstCategoryOnRender();
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
    filteredCategories,
  };
};
