import React from "react";

const RATINGS = [1, 2, 3, 4, 5];

interface RatingInputProps {
  rating: number;
  onChange: (rating: number) => void;
}

const RatingInput: React.FC<RatingInputProps> = ({ rating, onChange }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      {RATINGS.map((r) => (
        <button
          style={{
            filter: rating >= r ? "grayscale(0%)" : "grayscale(100%)",
            fontSize: "36px",
          }}
          key={r}
          onClick={() => onChange(r)}
        >
          ⭐
        </button>
      ))}
    </div>
  );
};

export default RatingInput;
