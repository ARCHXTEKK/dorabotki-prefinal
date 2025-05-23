export const initState = {
  categories: [],
  casesByCategory: [],
  keywordsData: {},
  lawsData: [],
  judges: [],
  courts: [],
  productionTypes: [],
  pass: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "categories-set":
      return {
        ...state,
        categories: action.payload,
      };

    case "court-cases-add":
      let newCases = state.casesByCategory;
      const { category, subcategory, data } = action.payload;

      const fil = newCases?.filter((x) => x.category === category);
      const fil2 = fil?.filter((x) => x.subcategory === subcategory);

      if (fil.length === 0) {
        newCases.push({
          category,
          subcategories: [
            {
              subcategory,
              cases: data,
            },
          ],
        });
      } else if (fil2.length === 0) {
        newCases
          .find((x) => x.category === category)
          .subcategories.push({
            subcategory,
            cases: data,
          });
      }

      return {
        ...state,
        casesByCategory: newCases,
      };

    case "keywords-set":
      return {
        ...state,
        keywordsData: action.payload,
      };

    case "laws-set":
      return {
        ...state,
        lawsData: action.payload,
      };

    case "judges-set":
      return { ...state, judges: action.payload };

    case "courts-set":
      return { ...state, courts: action.payload };

    case "production-types-set":
      return { ...state, productionTypes: action.payload };

    case "set-pass":
      return {
        ...state,
        pass: true,
      };

    default:
      return state;
  }
};
