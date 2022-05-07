import ReactDOM from "react-dom";
import { GoCheck, GoX } from "react-icons/go";

const Modal =({ title, show, onClose, onSubmit, children, cname })=> {
  if (!show) return null;
  return ReactDOM.createPortal(
    <>
      <div className="modal-overlay"></div>
      <div className={`modal-${cname}`}>
        <div className={`modal-${cname}-header`}>
          <h2 className="modal-title">{ title }</h2>
        </div>
        <div className={`modal-${cname}-body`}>
          { children }
        </div>
        <div className={`modal-${cname}-footer`}>
          <button className="btn-default btn-cancel" onClick={ onClose }><GoX size="16px" /> Cancel</button>
          { onSubmit && <button className="btn-primary" onClick={ onSubmit }><GoCheck size="16px" /> Apply</button> }
        </div>
     </div>
     </>
    ,document.body);
}

export default Modal;