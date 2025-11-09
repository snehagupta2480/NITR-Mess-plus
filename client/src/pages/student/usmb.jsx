import { useState } from "react";

export default function useMealReserve() {
  const [isReserving, setIsReserving] = useState(false);
  const [mealReserved, setMealReserved] = useState(false);

  const handleReserveMeal = async () => {
    setIsReserving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setMealReserved(true);
    } catch (err) {
      console.error("Reservation failed:", err);
    } finally {
      setIsReserving(false);
    }
  };

  return { isReserving, mealReserved, handleReserveMeal };
}
