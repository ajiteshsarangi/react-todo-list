import React, { useEffect } from "react";
import { UilCheckCircle } from "@iconscout/react-unicons";
import { UilExclamationCircle } from "@iconscout/react-unicons";
function Alert({ type, msg, removeAlert, list }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);
  return (
    <p className={`alert alert-${type} flex`}>
      {type == "danger" && <UilExclamationCircle size="20" className="my-2" />}
      {type == "success" && <UilCheckCircle size="20" className="my-2" />}

      {msg}
    </p>
  );
}

export default Alert;
