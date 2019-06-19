import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const infoModal = (props) => {
  return (
    <div>
      <Modal isOpen={props.modal} >
          <ModalHeader >Modal title</ModalHeader>
          <ModalBody>
            {props.content}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={props.closeModel}>Cancel</Button>
          </ModalFooter>
        </Modal>
    </div>
  );
};
export default infoModal;
