import React, { useState } from "react";
import Modal from "../../shared/Modal/Modal";
import parse from "html-react-parser";

export default function AIModal({ show, onClose, text }) {
  return (
    <Modal show={show} onClose={onClose}>
      <p className="modal-text">{text && parse(text)}</p>
    </Modal>
  );
}
