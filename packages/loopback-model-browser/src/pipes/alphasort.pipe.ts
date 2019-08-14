import { Pipe, PipeTransform } from '@angular/core';

/**
 * Sorts strings alphabetically
 */
@Pipe({ name: 'alphasort', pure: true })
export class AlphaSortPipe implements PipeTransform {
  transform(values: string[]) {
    return values.sort((_a, _b) => {
      const a = _a.toLowerCase();
      const b = _b.toLowerCase();
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
