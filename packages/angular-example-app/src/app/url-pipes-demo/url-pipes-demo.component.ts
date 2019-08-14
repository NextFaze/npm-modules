import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-url-pipes-demo',
  templateUrl: './url-pipes-demo.component.html',
  styleUrls: ['./url-pipes-demo.component.css'],
})
export class UrlPipesDemoComponent implements OnInit {
  public imageUrl = 'https://goo.gl/63eYzG';

  constructor() {}

  ngOnInit() {}
}
