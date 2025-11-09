import { motion } from "framer-motion";

export default function mealcd({ name, price, booked, onBook }) {
  return (
    <motion.div
      className="p-4 border rounded-2xl bg-white shadow hover:shadow-lg transition"
      whileHover={{ scale: 1.03 }}
    >
      <h3 className="text-xl font-semibold mb-1">{name}</h3>
      <p className="text-gray-600 mb-2">₹{price}</p>
      <button
        onClick={onBook}
        disabled={booked}
        className={`px-4 py-1 rounded-lg text-sm ${
          booked ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
        } text-white`}
      >
        {booked ? "Booked" : "Book Meal"}
      </button>
    </motion.div>
  );
}
