export function abbreviateNumber(number) {
   if (number >= 1000 && number < 1000000) return (number / 1000) + ' k'
   else if (number >= 1000000 && number < 1000000000) return (number / 1000000) + ' M'
   else if (number >= 1000000000 && number < 1000000000000) return (number / 1000000000) + ' B'
   else return Number(number).toString()
}
