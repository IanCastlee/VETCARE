import "./Toaster.scss";

const Toaster = ({ message, _click }) => {
  return (
    <div className="toaster">
      <div className="container">
        <p>{message}</p>
        <button className="btn-ok" onClick={_click}>
          OK
        </button>
      </div>
    </div>
  );
};

export default Toaster;
