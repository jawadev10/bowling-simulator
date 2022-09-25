import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'bowling-simulator',
  templateUrl: './bowling-simulator.component.html',
  styleUrls: ['./bowling-simulator.component.css']
})
export class BowlingSimulatorComponent implements OnInit {

  public pinsNumber = new FormControl(null, [
    Validators.required,
    Validators.min(0),
    Validators.max(10)
  ]);

  public totalScore = {};
  public currentRound = [];

  constructor() { }

  ngOnInit(): void {
  }

}
