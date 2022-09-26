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

  describe('functions', () => {
    it('should empty the array pinsFallenCurrentRound when switchRounds() is called' , () => {
      component.pinsFallenCurrentRound.length = 2;
      component.pinsFallenCurrentRound = [5, 3]

      fixture.detectChanges();

      // @ts-ignore : we will not render this function public for testing
      component.switchRounds();

      expect(component.pinsFallenCurrentRound).toEqual([]);
    });

    it('should disable the play button when the game is finished' , () => {
      component.totalThrows = 19;
      const playBtn = fixture.debugElement.nativeElement.querySelector('#play-btn')

      fixture.detectChanges();

      // @ts-ignore : we will not render this function public for testing
      component.manageEndOfTheGame();

      expect(component.gameFinished).toEqual(true);
      expect(playBtn.disabled).toBeTruthy();
    });
  });

  describe('validators', () => {
    it('should check the min validator of the pins input', () => {
      // @ts-ignore
      component.pinsNumber.setValue(-5);
      fixture.detectChanges();
      expect(component.pinsNumber.valid).toBeFalsy();
    });

    it('should check the max validator of the pins input', () => {
      // @ts-ignore
      component.pinsNumber.setValue(11);
      fixture.detectChanges();
      expect(component.pinsNumber.valid).toBeFalsy();
    });

    it('should check the roundRuleNotRespected validator of the pins input', () => {
      // @ts-ignore
      component.roundRuleNotRespected = true
      fixture.detectChanges();
      expect(component.pinsNumber.valid).toBeFalsy();
    });
  })

});
