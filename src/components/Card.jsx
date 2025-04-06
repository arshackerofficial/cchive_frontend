import { Link } from "react-router-dom";

const Card = ({ title, desc, to }) => (
    <Link
      to={to}
      className="border p-6 rounded shadow hover:shadow-md transition block"
    >
      <h3 className="text-xl font-semibold mb-2 text-blue-600">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </Link>
  );
  
export default Card;