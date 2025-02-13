import axios from "axios";
import { useEffect, useState } from "react";

export const useCaseDetailsState = (id) => {
  const [caseData, setCaseData] = useState([]);

  useEffect(() => {
    if (id) {
      try {
        axios.get(`https://lawrs.ru/legal_main/api/court-case/${id}`).then((r) => {
          setCaseData(r.data);
          console.log(r);
        });
      } catch (e) {
        console.error("Ошибка при получении данных useCaseDetailsState ", e);
      }
    }
  }, [id]);

  return { caseData };
};
