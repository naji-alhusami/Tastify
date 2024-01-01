import {
  Fragment,
  useRef,
  type FC,
  type ReactNode,
  type RefObject,
} from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";

interface AuthModalProps {
  // style?: React.CSSProperties;
  // headerClass?: string;
  header: ReactNode;
  // onSubmit?: (event: React.FormEvent) => void;
  // contentClass?: string;
  // footerClass?: string;
  // footer?: React.ReactNode;
  children?: ReactNode;
  nodeRef?: RefObject<HTMLDivElement>;
  openModal: boolean;
  onClose: () => void;
}

const ModalOverlay: FC<AuthModalProps> = (props) => {
  const content = (
    <div
      className="p-8 fixed top-20 left-1/2 transform -translate-x-1/2 inline-block bg-white shadow-md z-30 rounded-lg w-[23rem]"
      // style={props.style}
      ref={props.nodeRef}
    >
      <header>{props.header}</header>
      {props.children}
    </div>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("modal-hook") as HTMLElement
  );
};

const AuthModal = (props: AuthModalProps) => {
  const nodeRef = useRef(null);
  const { openModal, onClose } = props;

  return (
    <Fragment>
      {openModal && <Backdrop onClick={onClose} />}
      <CSSTransition
        nodeRef={nodeRef}
        in={openModal}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal-overlay"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </Fragment>
  );
};

export default AuthModal;
