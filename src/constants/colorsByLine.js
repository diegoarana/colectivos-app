export const COLORS_BY_LINE = new Map([
  ['214', 'red'],
  ['520', 'yellow'],
  ['202', 'orange']
]);

const getColorByLine = (linea) => {
  return COLORS_BY_LINE.get(linea) || 'gray';
}

export default getColorByLine;