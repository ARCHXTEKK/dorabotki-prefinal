import React from "react";
import ClearIcon from "../../assets/vectors/ClearIcon";

export default function Modal({ show, onClose, children }) {
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
        {children}
      </div>
    </div>
  );
}
