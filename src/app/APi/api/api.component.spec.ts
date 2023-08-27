import { ComponentFixture, TestBed } from '@angular/core/testing';

import { APiComponent } from './api.component';

describe('APiComponent', () => {
  let component: APiComponent;
  let fixture: ComponentFixture<APiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ APiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(APiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
