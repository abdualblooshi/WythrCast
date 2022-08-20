import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Lorem,
} from "@chakra-ui/react";

import { useState } from "react";
import { Spinner } from "@chakra-ui/react";

export default function LoadingModal({isLoading}) {
  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isLoading}
        style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            margin: "0",
            padding: "1rem 2rem",
        }}
      >
        <ModalOverlay />
        <ModalContent
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="50%"
        >
          <ModalHeader>Please wait...</ModalHeader>
          <ModalBody>
            <Spinner />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
