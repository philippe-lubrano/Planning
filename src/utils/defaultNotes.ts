import { StickyNote, COLORS } from '../types';

// Aliments par catégorie avec leurs couleurs
const FOOD_CATEGORIES = {
  proteins: {
    color: COLORS.find(c => c.name === 'Blue')?.value || '#3B82F6',
    items: ['Saumon', 'Dinde', 'Steak haché boeuf', 'Poulet', 'Colin', 'Lentilles, cacahuètes, œuf', 'Tofu, œuf, chia']
  },
  carbs: {
    color: COLORS.find(c => c.name === 'Yellow')?.value || '#F59E0B',
    items: ['Riz basmati', 'Pâtes', 'Quinoa', 'Lentilles corail', 'Boulgour', 'Lentilles vertes', 'Riz complet']
  },
  vegetables: {
    color: COLORS.find(c => c.name === 'Green')?.value || '#10B981',
    items: ['Brocolis', 'Haricots verts', 'Butternut', 'Carottes', 'Patates douces', 'Courgettes', 'Epinards']
  },
  extras: {
    color: COLORS.find(c => c.name === 'Pink')?.value || '#EC4899',
    items: ['Avocat', 'Abricots secs', 'Pruneaux', 'Noix de cajou']
  }
};

export const generateDefaultFoodNotes = (): StickyNote[] => {
  const notes: StickyNote[] = [];
  let noteId = 0;

  // Créer chaque aliment en double
  Object.entries(FOOD_CATEGORIES).forEach(([category, { color, items }]) => {
    items.forEach(item => {
      // Première copie
      notes.push({
        id: `default-${category}-${noteId++}`,
        content: item,
        color: color,
        day: 'postit',
        timeSlot: 'midi',
      });
      
      // Deuxième copie
      notes.push({
        id: `default-${category}-${noteId++}`,
        content: item,
        color: color,
        day: 'postit',
        timeSlot: 'midi',
      });
    });
  });

  return notes;
};