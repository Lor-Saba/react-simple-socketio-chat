import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import './Modal.css';

export default function Modal({ open, title = '', text, onClose }){
  const dialog = useRef();

  useEffect(() => {

    if (open){
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }

  }, [open])

  return createPortal(
    <dialog ref={dialog} onClose={onClose}>
      <h2>{title}</h2>
      <p>{text}</p>
      <div>
        <button className="btn btn-primary" onClick={onClose}>Close</button>
      </div>
    </dialog>,
    document.querySelector('#modals')
  );
}