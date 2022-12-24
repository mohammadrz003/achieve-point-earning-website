import React from "react";

const Modal = ({
  children,
  isModalOpen,
  toggleVisibility,
}) => {
  if (!isModalOpen) {
    return <></>;
  }

  return (
    <div className="w-full fixed inset-0 z-10 flex justify-center items-center">
      <div
        className="fixed inset-0 z-10 bg-black opacity-60"
        onClick={() => toggleVisibility()}
      />
      {children}
    </div>
  );
};

export default Modal;
