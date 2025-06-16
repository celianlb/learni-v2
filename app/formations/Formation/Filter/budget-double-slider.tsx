import React, { useRef } from "react";

interface BudgetDoubleSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (val: [number, number]) => void;
}

export const BudgetDoubleSlider: React.FC<BudgetDoubleSliderProps> = ({
  min,
  max,
  value,
  onChange,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  // Convertit une valeur en pourcentage (pour positionner les poignées)
  const valueToPercent = (val: number) => ((val - min) / (max - min)) * 100;

  // Convertit une position x (pixels) en valeur du slider
  const posToValue = (x: number) => {
    const slider = sliderRef.current;
    if (!slider) return min;
    const rect = slider.getBoundingClientRect();
    const percent = Math.min(Math.max((x - rect.left) / rect.width, 0), 1);
    return Math.round(percent * (max - min) + min);
  };

  // Drag logic
  const dragging = useRef<"min" | "max" | null>(null);

  const onMouseDown = (type: "min" | "max") => () => {
    dragging.current = type;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!sliderRef.current || !dragging.current) return;
    const newValue = posToValue(e.clientX);
    if (dragging.current === "min") {
      if (newValue < min) onChange([min, value[1]]);
      else if (newValue > value[1]) onChange([value[1], value[1]]);
      else onChange([newValue, value[1]]);
    } else {
      if (newValue > max) onChange([value[0], max]);
      else if (newValue < value[0]) onChange([value[0], value[0]]);
      else onChange([value[0], newValue]);
    }
  };

  const onMouseUp = () => {
    dragging.current = null;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  // Affichage
  return (
    <div className="w-full px-2">
      <div ref={sliderRef} className="relative h-3 flex items-center">
        {/* Rail */}
        <div className="absolute h-2 w-full rounded-full bg-indigo-100" />
        {/* Track sélectionné */}
        <div
          className="absolute h-2 rounded-full bg-customBlue-800"
          style={{
            left: `${valueToPercent(value[0])}%`,
            width: `${valueToPercent(value[1]) - valueToPercent(value[0])}%`,
          }}
        />
        {/* Poignée min */}
        <div
          className="absolute z-10 w-7 h-7 bg-customBlue-800 rounded-full border-4 border-white cursor-pointer shadow"
          style={{ left: `calc(${valueToPercent(value[0])}% - 0.875rem)` }}
          onMouseDown={onMouseDown("min")}
        />
        {/* Poignée max */}
        <div
          className="absolute z-10 w-7 h-7 bg-customBlue-900 rounded-full border-4 border-white cursor-pointer shadow"
          style={{ left: `calc(${valueToPercent(value[1])}% - 0.875rem)` }}
          onMouseDown={onMouseDown("max")}
        />
      </div>
    </div>
  );
};
