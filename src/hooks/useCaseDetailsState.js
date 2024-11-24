import axios from "axios";
import { useEffect, useState } from "react";

export const useCaseDetailsState = (id) => {
  const [caseData, setCaseData] = useState([]);

  useEffect(() => {
    try {
      axios.get(`https://lawrs.ru:8000/api/court-case/${id}`).then((r) => {
        setCaseData(r.data);
        console.log(r);
      });
    } catch (e) {
      console.error("Ошибка при получении данных useCaseDetailsState ", e);
    }
  }, []);
  return { caseData };
};
