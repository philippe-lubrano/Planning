import React from 'react';
import { StickyNote } from './StickyNote';
import { StickyNote as StickyNoteType } from '../types';

interface DayColumnProps {
  day: string;
  midiNotes: StickyNoteType[];
  soirNotes: StickyNoteType[];
  onUpdateNote: (note: StickyNoteType) => void;
  onDeleteNote: (id: string) => void;
  onDragStart: (e: React.DragEvent, note: StickyNoteType) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, day: string, timeSlot: 'midi' | 'soir') => void;
}

export const DayColumn: React.FC<DayColumnProps> = ({
  day,
  midiNotes,
  soirNotes,
  onUpdateNote,
  onDeleteNote,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
        <h2 className="text-lg font-semibold text-center">{day}</h2>
      </div>

      {/* Midi Section */}
      <div
        className="p-4 border-b border-gray-200 min-h-[200px] bg-yellow-50/30"
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, day, 'midi')}
      >
        <h3 className="font-medium text-gray-700 mb-3 text-center">🌅 Midi</h3>
        <div className="space-y-3">
          {midiNotes.map((note) => (
            <StickyNote
              key={note.id}
              note={note}
              onUpdate={onUpdateNote}
              onDelete={onDeleteNote}
              onDragStart={onDragStart}
            />
          ))}
        </div>
      </div>

      {/* Soir Section */}
      <div
        className="p-4 min-h-[200px] bg-purple-50/30"
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, day, 'soir')}
      >
        <h3 className="font-medium text-gray-700 mb-3 text-center">🌙 Soir</h3>
        <div className="space-y-3">
          {soirNotes.map((note) => (
            <StickyNote
              key={note.id}
              note={note}
              onUpdate={onUpdateNote}
              onDelete={onDeleteNote}
              onDragStart={onDragStart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};