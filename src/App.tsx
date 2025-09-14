import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { StickyNote as StickyNoteType, COLORS, DAYS } from './types';
import { DayColumn } from './components/DayColumn';
import { Toolbar } from './components/Toolbar';
import { generateRandomNotes } from './utils/noteGenerator';

function App() {
  const [notes, setNotes] = useState<StickyNoteType[]>([]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0].value);
  const [draggedNote, setDraggedNote] = useState<StickyNoteType | null>(null);

  const addNote = () => {
    const newNote: StickyNoteType = {
      id: `note-${Date.now()}-${Math.random()}`,
      content: '',
      color: selectedColor,
      day: DAYS[0],
      timeSlot: 'midi',
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (updatedNote: StickyNoteType) => {
    setNotes(notes.map(note => 
      note.id === updatedNote.id ? updatedNote : note
    ));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleDragStart = (e: React.DragEvent, note: StickyNoteType) => {
    setDraggedNote(note);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, day: string, timeSlot: 'midi' | 'soir') => {
    e.preventDefault();
    
    if (draggedNote) {
      const updatedNote = {
        ...draggedNote,
        day,
        timeSlot,
      };
      updateNote(updatedNote);
      setDraggedNote(null);
    }
  };

  const randomFill = () => {
    const randomNotes = generateRandomNotes();
    setNotes(randomNotes);
  };

  const clearAll = () => {
    setNotes([]);
  };

  const getNotesForDayAndTime = (day: string, timeSlot: 'midi' | 'soir') => {
    return notes.filter(note => note.day === day && note.timeSlot === timeSlot);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="text-blue-600" size={32} />
            <h1 className="text-4xl font-bold text-gray-800">
              Planificateur Hebdomadaire
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Organisez votre semaine avec des notes colorées et déplaçables
          </p>
        </div>

        {/* Toolbar */}
        <Toolbar
          selectedColor={selectedColor}
          onColorSelect={setSelectedColor}
          onAddNote={addNote}
          onRandomFill={randomFill}
          onClearAll={clearAll}
        />

        {/* Weekly Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
          {DAYS.map((day) => (
            <DayColumn
              key={day}
              day={day}
              midiNotes={getNotesForDayAndTime(day, 'midi')}
              soirNotes={getNotesForDayAndTime(day, 'soir')}
              onUpdateNote={updateNote}
              onDeleteNote={deleteNote}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 bg-white/80 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            💡 Comment utiliser l'application
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li>• <strong>Ajouter une note:</strong> Cliquez sur "Ajouter Note" puis glissez-la dans la section désirée</li>
            <li>• <strong>Modifier une note:</strong> Double-cliquez sur une note pour l'éditer</li>
            <li>• <strong>Déplacer une note:</strong> Glissez et déposez entre les différentes sections</li>
            <li>• <strong>Changer la couleur:</strong> Sélectionnez une couleur avant de créer une nouvelle note</li>
            <li>• <strong>Remplissage aléatoire:</strong> Génère automatiquement des notes d'exemple</li>
          </ul>
        </div>

        {/* Stats */}
        <div className="mt-6 flex justify-center">
          <div className="bg-white/80 px-6 py-3 rounded-lg shadow-md">
            <span className="text-gray-600 font-medium">
              Total des notes: {notes.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;