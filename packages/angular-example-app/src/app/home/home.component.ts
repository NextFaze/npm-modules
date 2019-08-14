import { Component } from '@angular/core';

import { ApplicationService } from '../app.service';

@Component({
  template: `
    <div class="container">
      <h1>
          Welcome to {{ title }}!
      </h1>
      <img width="300" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
      <h2>Package Demos</h2>
      <button mat-raised-button [routerLink]="['/datatable']">Loopback Datatable</button>
      <button mat-raised-button [routerLink]="['/system']">Loopback Model Browser</button>
      <button mat-raised-button [routerLink]="['/form']">Loopback Model Form</button>
      <button mat-raised-button [routerLink]="['/query']">Loopback Query</button>
      <button mat-raised-button [routerLink]="['/css-url-pipes']">CSS Url Pipes</button>
    </div>
    `,
  styles: [
    `
    .container {
      text-align: center;
    }
  `,
  ],
})
export class HomeComponent {
  title = 'ServiceApp';
  constructor(public appService: ApplicationService) {
    this.title = appService.name;
  }

  logApplicationName() {
    console.log(`Application title is "${this.title}"`);
  }
}
