import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeStyle, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'cssUrl',
  pure: true,
})
export class CssUrlPipe implements PipeTransform {
  constructor(public sanitize: DomSanitizer) {}
  transform(
    value: string | SafeUrl,
    defaultBackground?: string
  ): string | SafeStyle {
    if (!value) {
      return defaultBackground || 'transparent';
    }
    return this.sanitize.bypassSecurityTrustStyle(`url('${value}')`);
  }
}
