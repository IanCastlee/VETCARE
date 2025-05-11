import "./Emptydata.scss";
import { ImFilesEmpty } from "react-icons/im";

const Emptydata = () => {
  return (
    <div className="emptydata">
      <ImFilesEmpty className="icon" />
      <p>Empty Data</p>
    </div>
  );
};

export default Emptydata;
