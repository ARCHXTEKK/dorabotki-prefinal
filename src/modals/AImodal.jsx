import parse from "html-react-parser";

import React from "react";

export default function AImodal({ show, onClose, text }) {
  const handleClose = (e) => {
    if (!e.target.closest(".modal-content")) {
      onClose();
    }
  };

  return (
    show && (
      <div className="modal-wrapper" onClick={handleClose}>
        <div className="modal-content">
          {text && parse(text)}
          <button className="uibtn modal-close" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    )
  );
}
