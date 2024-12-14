import parse from "html-react-parser";

import React from "react";
import ClearIcon from "./../assets/ClearIcon";

export default function AImodal({ show, onClose, text }) {
  const handleClose = (e) => {
    if (!e.target.closest(".modal-content")) {
      onClose();
    }
  };

  return (
    <div
      className={"modal-wrapper " + (show ? "active" : "")}
      onClick={handleClose}
    >
      <div className={"modal-content " + (show ? "active" : "")}>
        <button className="uibtn modal-close" onClick={onClose}>
          <ClearIcon className="close-btn" />
        </button>
        <p className="modal-text">{text && parse(text)}</p>
      </div>
    </div>
  );
}
