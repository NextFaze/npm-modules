/**
 * Turns an array of objects into a single object keyed by the specified value
 * 
 * @param target An array of objects
 * @param key The key from each object to use as the key in the map
 */
export const keyIndexArray = (
  target: any[],
  key: string = 'id'
): { [key: string]: any } =>
  target.reduce((a, b) => ({ ...a, [b[key]]: b }), {});
