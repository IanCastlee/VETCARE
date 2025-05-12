import "./Toaster.scss";
import { motion } from "framer-motion";
const Toaster = ({ message, _click }) => {
  return (
    <div className="toaster">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container"
      >
        <p>{message}</p>
        <button className="btn-ok" onClick={_click}>
          OK
        </button>
      </motion.div>
    </div>
  );
};

export default Toaster;
