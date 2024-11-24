import axios from "axios";
import { useEffect, useState } from "react";

export const useSearchResultsState = (filters) => {
  const [currentItems, setCurrentItems] = useState([[], []]);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const onPageChange = (page) => {
    setCurrentPage(page);
    setCurrentItems([currentItems[0], slicedContent(currentItems[0], page)]);
  };

  const slicedContent = (content, page) => {
    return content.slice(4 * page, 4 * (page + 1));
  };

  useEffect(() => {
    // let data = {
    //   "document_text": searchQuery,
    //   "case_number": caseNumber,
    //   "court": court,
    //   "judge": judge,
    //   "user": disputant,
    //   "uid": uid,
    //   "category": productionType,
    // }
    try {
      axios
        .post("https://lawrs.ru:8000/api/count_cases_add/search", {
          params: {
            document_text: filters.caseText,
            court: filters.court,
            judge: filters.judge,
          },
        })
        .then((r) => {
          setTotalPages(Math.ceil(r?.data.length / 4));
          setCurrentItems([r.data, slicedContent(r.data, currentPage)]);
        });
    } catch (e) {
      console.error("Ошибка при получении данных useSearchResultsState ", e);
    }
  }, []);

  return {
    currentItems: currentItems[1],
    totalPages,
    onPageChange,
  };
};
