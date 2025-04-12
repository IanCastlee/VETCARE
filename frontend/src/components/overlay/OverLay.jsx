import "./OverLay.scss";

const OverLay = ({ closeMobileSidebar }) => {
  return <div className="overlay" onClick={closeMobileSidebar}></div>;
};

export default OverLay;
