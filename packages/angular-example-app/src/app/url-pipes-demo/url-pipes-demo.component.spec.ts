import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlPipesDemoComponent } from './url-pipes-demo.component';

describe('UrlPipesDemoComponent', () => {
  let component: UrlPipesDemoComponent;
  let fixture: ComponentFixture<UrlPipesDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlPipesDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlPipesDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
