import React from 'react';
import { Package } from 'lucide-react';
import { StickyNote } from './StickyNote';
import { StickyNote as StickyNoteType } from '../types';

interface PostItColumnProps {
  notes: StickyNoteType[];
  onUpdateNote: (note: StickyNoteType) => void;
  onDeleteNote: (id: string) => void;
  onDragStart: (e: React.DragEvent, note: StickyNoteType) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

export const PostItColumn: React.FC<PostItColumnProps> = ({
  notes,
  onUpdateNote,
  onDeleteNote,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-fit">
      <div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-4">
        <div className="flex items-center justify-center gap-2">
          <Package size={20} />
          <h2 className="text-lg font-semibold">Post-it</h2>
        </div>
      </div>

      <div
        className="p-4 bg-gray-50/50"
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <p className="text-sm text-gray-600 mb-4 text-center">
          Glissez vos notes ici pour les stocker
        </p>
        <div className="space-y-3">
          {notes.map((note) => (
            <StickyNote
              key={note.id}
              note={note}
              onUpdate={onUpdateNote}
              onDelete={onDeleteNote}
              onDragStart={onDragStart}
            />
          ))}
        </div>
        {notes.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            <Package size={48} className="mx-auto mb-2 opacity-50" />
            <p>Aucun post-it stocké</p>
          </div>
        )}
      </div>
    </div>
  );
};