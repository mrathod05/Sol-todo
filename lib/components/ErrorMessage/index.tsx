import React from "react";

const FormErrorMessage = ({ message }: { message: string }) => {
  return <p className="text-white text-sm mt-1">{message}*</p>;
};

export default FormErrorMessage;
