import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedMealComponent } from './added-meal.component';

describe('AddedMealComponent', () => {
  let component: AddedMealComponent;
  let fixture: ComponentFixture<AddedMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddedMealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
