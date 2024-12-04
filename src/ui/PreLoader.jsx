import React from "react";
import preloaderGif from "../assets/35.gif";

export default function PreLoader() {
  return (
    <div className="cases-loading">
      <div className="">Выполняется загрузка данных.</div>
      <img src={preloaderGif} alt="preload" className="preloader-anim" />
    </div>
  );
}
