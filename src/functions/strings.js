export const strings = {
   getLastWord,
}

function getLastWord(str, sep) {
   const words = str.split(sep);
   if (words.length > 0) {
      return words[words.length - 1];
   }
   return '';
}