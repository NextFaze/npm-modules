import { Component } from '@angular/core';

@Component({
  selector: 'lbmb-toolbar',
  template: `
    <mat-toolbar color="primary" class="toolbar">
        <ng-content></ng-content>
    </mat-toolbar>
  `,
  styles: [
    `
    .toolbar {
      display: flex;
      justify-content: space-between;
    }
    `,
  ],
})
export class ToolbarComponent {}
