import React, { useEffect } from "react";

const DoSthAfterRedirect = ({ children, callbackFn }) => {
  useEffect(() => {
    callbackFn();
  }, [callbackFn]);
  return children;
};

export default DoSthAfterRedirect;
