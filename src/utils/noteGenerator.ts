import { StickyNote, COLORS, DAYS } from '../types';

const SAMPLE_NOTES = [
  'Réunion équipe', 'Présentation client', 'Formation', 'Call important',
  'Révision projet', 'Brainstorming', 'Démonstration', 'Suivi client',
  'Planification', 'Analyse des résultats', 'Workshop créatif', 'One-on-one',
  'Standup daily', 'Rétrospective', 'Code review', 'Déploiement',
  'Tests utilisateurs', 'Documentation', 'Recherche marché', 'Stratégie produit'
];

export const generateRandomNote = (day: string, timeSlot: 'midi' | 'soir'): StickyNote => {
  const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
  const randomContent = SAMPLE_NOTES[Math.floor(Math.random() * SAMPLE_NOTES.length)];
  
  return {
    id: `${day}-${timeSlot}-${Date.now()}-${Math.random()}`,
    content: randomContent,
    color: randomColor.value,
    day,
    timeSlot,
  };
};

export const generateRandomNotes = (): StickyNote[] => {
  const notes: StickyNote[] = [];
  
  DAYS.forEach(day => {
    // Generate 1-3 notes for midi
    const midiCount = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < midiCount; i++) {
      notes.push(generateRandomNote(day, 'midi'));
    }
    
    // Generate 1-3 notes for soir
    const soirCount = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < soirCount; i++) {
      notes.push(generateRandomNote(day, 'soir'));
    }
  });
  
  return notes;
};