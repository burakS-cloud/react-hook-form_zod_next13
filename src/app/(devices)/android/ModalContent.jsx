"use client";
import React from "react";

const ModalContent = () => {
  return (
    <>
      <h1 style={{ color: "green" }}>Modal Content for Android</h1>
      <label htmlFor="">First Name</label>
      <input type="text" />
      <button type="button">Submit</button>
      <button onClick={() => setIsOpen(false)}>Close Modal</button>
    </>
  );
};

export default ModalContent;
