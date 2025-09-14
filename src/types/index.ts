export interface StickyNote {
  id: string;
  content: string;
  color: string;
  day: string | 'postit';
  timeSlot: 'midi' | 'soir';
}

export interface DroppableArea {
  day: string | 'postit';
  timeSlot: 'midi' | 'soir';
}

export const COLORS = [
  { name: 'Blue', value: '#3B82F6', bg: 'bg-blue-500', text: 'text-white' },
  { name: 'Green', value: '#10B981', bg: 'bg-emerald-500', text: 'text-white' },
  { name: 'Yellow', value: '#F59E0B', bg: 'bg-amber-500', text: 'text-white' },
  { name: 'Orange', value: '#EF4444', bg: 'bg-red-500', text: 'text-white' },
  { name: 'Purple', value: '#8B5CF6', bg: 'bg-violet-500', text: 'text-white' },
  { name: 'Pink', value: '#EC4899', bg: 'bg-pink-500', text: 'text-white' },
  { name: 'Teal', value: '#14B8A6', bg: 'bg-teal-500', text: 'text-white' },
  { name: 'Indigo', value: '#6366F1', bg: 'bg-indigo-500', text: 'text-white' },
] as const;

export const DAYS = [
  'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'
] as const;