import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { StickyNote as StickyNoteType, COLORS } from '../types';

interface StickyNoteProps {
  note: StickyNoteType;
  onUpdate: (note: StickyNoteType) => void;
  onDelete: (id: string) => void;
  onDragStart: (e: React.DragEvent, note: StickyNoteType) => void;
}

export const StickyNote: React.FC<StickyNoteProps> = ({
  note,
  onUpdate,
  onDelete,
  onDragStart,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(note.content);

  const handleSave = () => {
    onUpdate({ ...note, content: editContent });
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      setEditContent(note.content);
      setIsEditing(false);
    }
  };

  const colorConfig = COLORS.find(c => c.value === note.color) || COLORS[0];

  return (
    <div
      draggable={!isEditing}
      onDragStart={(e) => onDragStart(e, note)}
      className={`
        ${colorConfig.bg} ${colorConfig.text}
        p-3 rounded-lg shadow-md cursor-move
        transition-all duration-200 hover:shadow-lg hover:scale-105
        min-h-[80px] w-full group relative
        ${isEditing ? 'cursor-text' : ''}
      `}
    >
      {isEditing ? (
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyPress}
          className="w-full h-16 bg-transparent resize-none outline-none placeholder-white/70"
          placeholder="Tapez votre note..."
          autoFocus
        />
      ) : (
        <div className="flex flex-col h-full">
          <p className="flex-1 text-sm font-medium break-words">
            {note.content || 'Note vide'}
          </p>
          <div className="flex justify-end gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <Edit2 size={12} />
            </button>
            <button
              onClick={() => onDelete(note.id)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};