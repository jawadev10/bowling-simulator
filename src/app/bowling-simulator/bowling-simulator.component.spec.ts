import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BowlingSimulatorComponent } from './bowling-simulator.component';

describe('BowlingSimulatorComponent', () => {
  let component: BowlingSimulatorComponent;
  let fixture: ComponentFixture<BowlingSimulatorComponent>;

  beforeEach( () => {
     TestBed.configureTestingModule({
      declarations: [ BowlingSimulatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BowlingSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
