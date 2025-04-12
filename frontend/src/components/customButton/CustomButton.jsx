import "./CustomButton.scss";
import { motion } from "framer-motion";

const CustomButton = ({ _bgcolor, _label, _width }) => {
  console.log("WIDTH : ", _width);
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`custom-button ${
        _bgcolor === "primary" ? "primary" : "secondary"
      } ${_width === "hundredpercent" ? "hundredpercent" : ""} `}
    >
      {_label}
    </motion.button>
  );
};

export default CustomButton;
