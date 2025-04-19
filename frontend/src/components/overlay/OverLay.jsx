import "./OverLay.scss";

const OverLay = ({ closeMobileSidebar }) => {
  return <div className="overlay_" onClick={closeMobileSidebar}></div>;
};

export default OverLay;
