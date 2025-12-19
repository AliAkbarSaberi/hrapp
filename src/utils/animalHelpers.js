// Map animal names to emojis
const animalEmojis = {
  'Owl': '🦉',
  'Dog': '🐕',
  'Cat': '🐱',
  'Eagle': '🦅',
  'Butterfly': '🦋',
  'Fox': '🦊',
  'Rabbit': '🐰',
  'Wolf': '🐺',
  'Penguin': '🐧',
  'Dolphin': '🐬',
  'Lion': '🦁'
};

// Convert animal name to emoji
export const getAnimalEmoji = (animalName) => {
  return animalEmojis[animalName] || '🐾';
};
