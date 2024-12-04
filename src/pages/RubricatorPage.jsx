import React from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { SidePanel } from "../components/Rubricator/SidePanel";
import { CasesPanel } from "../components/Rubricator/CasesPanel";
import { useRubricatorState } from "../hooks/useRubricatorState";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import Pagination from "./../ui/Pagination";

export default function RubricatorPage() {
  const {
    searchContent,
    onSearch,
    categories,
    cases,
    onCategorySelect,
    onSubcategorySelect,
    selectedCategory,
    totalPages,
    onPageChange,
    filteredCategories,
  } = useRubricatorState();

  const routeNavigator = useRouteNavigator();

  const handleCaseClick = (caseData) => {
    routeNavigator.push("/searchresults/", {
      state: {
        caseText: caseData.section_title,
      },
    });
  };

  return (
    <div className="app-wrapper">
      <Header />
      <main className="page-content page-content--flex">
        <div className="row tablet-jcsb mobile-center">
          <h2 className="page-title">Рубрикатор судебной практики</h2>
          <Pagination
            initialPage={0}
            onPageChange={onPageChange}
            totalPages={totalPages}
          />
        </div>
        <div className="RubricatorPanel">
          <SidePanel
            onSearch={onSearch}
            searchContent={searchContent}
            categories={categories}
            onCategorySelect={onCategorySelect}
            onSubcategorySelect={onSubcategorySelect}
            show={true}
            selectedCategory={selectedCategory}
            filteredCategories={filteredCategories}
          />
          <CasesPanel handleCaseClick={handleCaseClick} cases={cases} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
