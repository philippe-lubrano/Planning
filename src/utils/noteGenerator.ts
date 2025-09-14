import { StickyNote, COLORS, DAYS } from '../types';

const SAMPLE_NOTES = [
  'Réunion équipe', 'Présentation client', 'Formation', 'Call important',
  'Révision projet', 'Brainstorming', 'Démonstration', 'Suivi client',
  'Planification', 'Analyse des résultats', 'Workshop créatif', 'One-on-one',
  'Standup daily', 'Rétrospective', 'Code review', 'Déploiement',
  'Tests utilisateurs', 'Documentation', 'Recherche marché', 'Stratégie produit'
];

export const generateRandomNote = (day: string | 'postit', timeSlot: 'midi' | 'soir'): StickyNote => {
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

export const generateRandomNotes = (existingNotes?: StickyNote[]): StickyNote[] => {
  // Si des notes existantes sont fournies, les redistribuer
  if (existingNotes && existingNotes.length > 0) {
    return redistributeExistingNotes(existingNotes);
  }
  
  // Sinon, créer de nouvelles notes (comportement original)
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

export const redistributeExistingNotes = (notes: StickyNote[]): StickyNote[] => {
  // Créer une copie des notes pour éviter de modifier l'original
  const shuffledNotes = [...notes];

  // Mélanger les notes
  for (let i = shuffledNotes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledNotes[i], shuffledNotes[j]] = [shuffledNotes[j], shuffledNotes[i]];
  }

  // Créer un objet pour suivre les couleurs utilisées par jour et par créneau
  const colorsByDayAndSlot: { [key: string]: { midi: Set<string>; soir: Set<string> } } = {};
  DAYS.forEach(day => {
    colorsByDayAndSlot[day] = { midi: new Set(), soir: new Set() };
  });

  // Redistribuer les notes en évitant les doublons de couleur par jour et par créneau
  const redistributedNotes: StickyNote[] = [];
  let dayIndex = 0;
  let timeSlot: 'midi' | 'soir' = 'midi';

  shuffledNotes.forEach(note => {
    let placed = false;
    let attempts = 0;

    // Essayer de placer la note en évitant les doublons de couleur par jour et créneau
    while (!placed && attempts < DAYS.length * 2) {
      const currentDay = DAYS[dayIndex];
      const currentSlot = timeSlot;

      // Si cette couleur n'est pas encore utilisée pour ce jour et ce créneau
      if (!colorsByDayAndSlot[currentDay][currentSlot].has(note.color)) {
        redistributedNotes.push({
          ...note,
          day: currentDay,
          timeSlot: currentSlot
        });
        colorsByDayAndSlot[currentDay][currentSlot].add(note.color);
        placed = true;
      }

      // Passer au slot suivant
      if (timeSlot === 'midi') {
        timeSlot = 'soir';
      } else {
        timeSlot = 'midi';
        dayIndex = (dayIndex + 1) % DAYS.length;
      }
      attempts++;
    }

    // Si on n'arrive pas à placer sans doublon, placer quand même
    if (!placed) {
      // Trouver un jour et créneau où la couleur n'est pas utilisée, sinon choisir aléatoirement
      let found = false;
      for (let d = 0; d < DAYS.length && !found; d++) {
        for (const slot of ['midi', 'soir'] as const) {
          if (!colorsByDayAndSlot[DAYS[d]][slot].has(note.color)) {
            redistributedNotes.push({
              ...note,
              day: DAYS[d],
              timeSlot: slot
            });
            colorsByDayAndSlot[DAYS[d]][slot].add(note.color);
            found = true;
            break;
          }
        }
      }
      if (!found) {
        const fallbackDay = DAYS[Math.floor(Math.random() * DAYS.length)];
        const fallbackTimeSlot = Math.random() > 0.5 ? 'midi' : 'soir';
        redistributedNotes.push({
          ...note,
          day: fallbackDay,
          timeSlot: fallbackTimeSlot
        });
      }
    }
  });

  return redistributedNotes;
};