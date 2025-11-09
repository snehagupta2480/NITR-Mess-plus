import { useState } from "react";

export default function useMealBooking() {
  const [isBooking, setIsBooking] = useState(false);
  const [mealBooked, setMealBooked] = useState(false);

  const handleBookMeal = async () => {
    setIsBooking(true);
    try {
      // Simulate network call
      await new Promise((resolve) => setTimeout(resolve, 800));
      setMealBooked(true);
    } catch (err) {
      console.error("Booking failed", err);
    } finally {
      setIsBooking(false);
    }
  };

  return { isBooking, mealBooked, handleBookMeal };
}
