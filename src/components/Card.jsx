import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Card = ({ title, desc, to }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="border rounded-lg p-6 shadow hover:shadow-lg transition bg-white"
    >
      <Link to={to}>
        <h2 className="text-xl font-bold text-primary">{title}</h2>
        <p className="text-gray-600 mt-1">{desc}</p>
      </Link>
    </motion.div>
  );
};

export default Card;
