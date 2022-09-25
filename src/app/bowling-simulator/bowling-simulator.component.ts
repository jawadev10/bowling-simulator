import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {DataSource} from "@angular/cdk/collections";

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
  displayedColumns: string[] = ['round', 'score1', 'score2', 'totalRound'];
  public dataSource?: DataSource<number[]>;


  public totalFallenPins: number[] = [];
  public totalScore = 0;
  public maxRound = 10;
  public currentRound = 1;
  public pinsFallenCurrentRound: number[] = [];
  public roundRuleNotRespected?: boolean;
  private destroy$: Subject<boolean> = new Subject<boolean>();


  constructor() {
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public ngOnInit(): void {
    this.calculateRound();
  }

  // the round is saved and we move to the next one
  public saveRound(newValue: number | null): void {


    if (newValue || newValue === 0) {
      this.totalScore = this.totalScore + newValue;
      this.pinsFallenCurrentRound.push(newValue)
      if (this.pinsFallenCurrentRound.length === 2) {
        const newArray = this.pinsFallenCurrentRound as number[];
        this.totalFallenPins.push(...newArray);
        this.currentRound = this.currentRound + 1;
      }
    }

    if (this.pinsFallenCurrentRound.length === 2) {
      this.pinsFallenCurrentRound = []
    }

    console.log(this.totalFallenPins)
    console.log(this.pinsFallenCurrentRound)

    this.pinsNumber.reset();
    this.pinsNumber.markAsPristine();
  }

  // a round can have only a maximum of 10 as a score
  private calculateRound() {
    this.pinsNumber.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.roundRuleNotRespected = !!(this.pinsFallenCurrentRound.length && value && this.pinsFallenCurrentRound[0] + value >= 11);
      })
  }
}
