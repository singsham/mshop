import React from "react";
import { Modal, ModalHeader, ModalBody} from "reactstrap";

const infoModal = (props) => {
  return (
    <Modal isOpen={props.showModal} fase={true} centered>
      <ModalHeader toggle={props.hideModal} charCode="X">Media Upload Info</ModalHeader>
      <ModalBody>{props.content}</ModalBody>
    </Modal>
  );
};
export default infoModal;
