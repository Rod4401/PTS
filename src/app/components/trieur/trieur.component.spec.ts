import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrieurComponent } from './trieur.component';

describe('TrieurComponent', () => {
  let component: TrieurComponent;
  let fixture: ComponentFixture<TrieurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrieurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrieurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
