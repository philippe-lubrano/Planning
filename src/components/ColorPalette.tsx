import React from 'react';
import { COLORS } from '../types';

interface ColorPaletteProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

export const ColorPalette: React.FC<ColorPaletteProps> = ({
  selectedColor,
  onColorSelect,
}) => {
  return (
    <div className="flex gap-2 p-3 bg-white rounded-lg shadow-md">
      <span className="text-sm font-medium text-gray-700 mr-2">Couleur:</span>
      {COLORS.map((color) => (
        <button
          key={color.value}
          onClick={() => onColorSelect(color.value)}
          className={`
            w-6 h-6 rounded-full transition-all duration-200
            ${color.bg}
            ${selectedColor === color.value 
              ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' 
              : 'hover:scale-105'
            }
          `}
          title={color.name}
        />
      ))}
    </div>
  );
};