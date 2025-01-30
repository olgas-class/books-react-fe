import {useAlertContext} from "../context/AlertContext";

function Alert() {
  const { alertData, closeAlert } = useAlertContext();

  return (
    <>
      {alertData.message !== "" && (
        <div
          className={`alert alert-${alertData.type} alert-dismissible fade show`}
          role="alert"
        >
          {alertData.message}
          <button
            onClick={closeAlert}
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
    </>
  );
}

export default Alert;
