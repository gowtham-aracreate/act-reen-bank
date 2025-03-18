import React, { useState } from "react";

const ModalLayout = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);
  const [userData, setUserData] = useState({});

  const openModal = (content) => setModalContent(content);
  const closeModal = () => setModalContent(null);

  return (
    <>
      {typeof children === "function"
        ? children({ openModal, closeModal, setUserData, userData })
        : children}

      {modalContent && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur bg-opacity-50">
          <div
            className="bg-white p-6 rounded-3xl shadow-[0_11px_80px_rgba(90,297,94,0.5)] relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {React.cloneElement(modalContent, { openModal, closeModal, setUserData, userData })}
          </div>
        </div>
      )}
    </>
  );
};

export default ModalLayout;