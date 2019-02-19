import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Process } from './home.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  processes: Process[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Process[]>(baseUrl + 'api/Cat/').subscribe(result => {
      this.processes = result;
    }, error => console.error(error));
  }

  ngOnInit() {
  }

  firstClick() {
    console.log('clicked');
    console.log(this.processes);
   
  }
}

export interface Process {
  Id: number;
  ProcessName: string;
}
