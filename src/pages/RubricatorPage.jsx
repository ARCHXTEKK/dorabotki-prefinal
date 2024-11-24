import React, { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { SidePanel } from "../components/Rubricator/SidePanel";
import { CasesPanel } from "../components/Rubricator/CasesPanel";
import { useRubricatorState } from "../hooks/useRubricatorState";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

export default function RubricatorPage() {
  const {
    searchContent,
    onSearch,
    categories,
    cases,
    onCategorySelect,
    onSubcategorySelect,
    selectedCategory,
  } = useRubricatorState();

  const routeNavigator = useRouteNavigator();

  const handleCaseClick = (caseData) => {
    routeNavigator.push("/rubricator/casedetails/:id", {
      id: caseData.id,
    });
  };

  return (
    <div className="app-wrapper">
      <Header />
      <main className="page-content page-content--flex">
        <h2 className="page-title">Рубрикатор судебной практики</h2>
        <div className="RubricatorPanel">
          <SidePanel
            onSearch={onSearch}
            searchContent={searchContent}
            categories={categories}
            onCategorySelect={onCategorySelect}
            onSubcategorySelect={onSubcategorySelect}
            show={true}
            selectedCategory={selectedCategory}
          />
          <CasesPanel handleCaseClick={handleCaseClick} cases={cases} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
