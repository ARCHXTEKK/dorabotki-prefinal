import React from "react";
import { SidePanel } from "./SidePanel";
import { CasesPanel } from "./CasesPanel";
import { useRubricatorState } from "./useRubricatorState";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import Pagination from "../../shared/Pagination";
import Page from "../../shared/Page/Page";

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
    <Page className="page-content--flex">
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
    </Page>
  );
}
