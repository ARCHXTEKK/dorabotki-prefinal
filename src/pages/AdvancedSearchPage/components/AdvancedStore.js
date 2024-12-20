export const initState = {
  caseText: "",
  productionType: "",
  caseNumber: "",
  uid: "",
  filters: "",
  startDate: "",
  endDate: "",
  singleDate: "",
  court: "",
  judge: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "clear":
      return initState;
    case "caseTextSet":
      return {
        ...state,
        caseText: action.payload,
      };
    case "productionTypeSet":
      return {
        ...state,
        productionType: action.payload,
      };
  }
};
