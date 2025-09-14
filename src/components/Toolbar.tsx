import React from 'react';
import { Plus, Shuffle, Trash2 } from 'lucide-react';
import { ColorPalette } from './ColorPalette';

interface ToolbarProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
  onAddNote: () => void;
  onRandomFill: () => void;
  onClearAll: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  selectedColor,
  onColorSelect,
  onAddNote,
  onRandomFill,
  onClearAll,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-gray-50 rounded-lg border">
      <ColorPalette selectedColor={selectedColor} onColorSelect={onColorSelect} />
      
      <div className="flex gap-3">
        <button
          onClick={onAddNote}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
        >
          <Plus size={18} />
          Ajouter Note
        </button>
        
        <button
          onClick={onRandomFill}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium"
        >
          <Shuffle size={18} />
          Remplissage Aléatoire
        </button>
        
        <button
          onClick={onClearAll}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
        >
          <Trash2 size={18} />
          Tout Effacer
        </button>
      </div>
    </div>
  );
};