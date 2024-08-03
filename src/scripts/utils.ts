const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const generateDrillName = () => {
  const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
  const randomNumber = Math.floor(Math.random() * 1000) + 1;

  return `${randomLetter}-${randomNumber}`;
};

export const generateFurnaceName = () => {
  const randomLetter1 = alphabet[Math.floor(Math.random() * alphabet.length)];
  const randomLetter2 = alphabet[Math.floor(Math.random() * alphabet.length)];
  const randomNumber = Math.floor(Math.random() * 1000) + 1;

  return `${randomLetter1}${randomLetter2}-${randomNumber}`;
};
