import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'bowling-simulator',
  templateUrl: './bowling-simulator.component.html',
  styleUrls: ['./bowling-simulator.component.css']
})
export class BowlingSimulatorComponent implements OnInit, OnDestroy {

  public pinsNumber = new FormControl(null, [
    Validators.required,
    Validators.min(0),
    Validators.max(10)
  ]);

  public totalFallenPins: number[] = [];
  public totalScore = 0;
  public currentRound = 1;
  public pinsFallenCurrentRound: number[] = [];
  public gameFinished = false;
  public roundRuleNotRespected?: boolean;

  private destroy$: Subject<boolean> = new Subject<boolean>();
  private totalThrows = 0;


  constructor() {}

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public ngOnInit(): void {
    this.calculateRound();
  }

  // the core function : the round is saved and we move to the next one until the end
  public saveThrow(newValue: number | null): void {
    this.manageScores(newValue);
    this.switchRounds();
    this.manageEndOfTheGame();
    this.pinsNumber.reset();
    this.pinsNumber.markAsPristine();
  }

  // reset the transit array after each round
  private switchRounds() {
    if (this.pinsFallenCurrentRound.length === 2) {
      this.pinsFallenCurrentRound = []
    }
  }

  // a bit of logic to save round by round and total score
  private manageScores(newValue: number | null) {
    if (newValue || newValue === 0) {
      this.totalScore = this.totalScore + newValue;
      this.pinsFallenCurrentRound.push(newValue)

      if (this.pinsFallenCurrentRound.length === 2) {
        const newArray = this.pinsFallenCurrentRound as number[];
        this.totalFallenPins.push(...newArray);
        this.currentRound = this.currentRound + 1;
      }

    }
  }

  // Thanks for playing Dapesco devs ! :)
  private manageEndOfTheGame() {
    this.totalThrows = this.totalThrows + 1
    if (this.totalThrows === 20) {
      alert('Thanks for playing Dapesco, your total score is : ' + this.totalScore + '. Please refresh the page to start a new game.');
      this.gameFinished = true;
    }
  }

  // spy on the control to create sort of a custom validator ^^
  private calculateRound() {
    this.pinsNumber.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.roundRuleNotRespected = !!(this.pinsFallenCurrentRound.length && value && this.pinsFallenCurrentRound[0] + value >= 11);
      })
  }
}
