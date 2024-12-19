import React from "react";
import Footer from "../Footer";
import Header from "../Header";

export default function Page({
  children,
  className,
  forceActiveTab,
  onClickOutside,
}) {
  return (
    <div className="app-wrapper" onClick={onClickOutside}>
      <Header forceActiveTab={forceActiveTab} />
      <main className={"page-content " + className}>{children}</main>
      <Footer />
    </div>
  );
}
