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
  specificProcess: DetailedProcess;
  apiClient: HttpClient;
  baseUrl: string;
  processId: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.apiClient = http;
    this.baseUrl = baseUrl;
  }

  ngOnInit() {
  }

  firstClick() {
    this.apiClient.get<Process[]>(this.baseUrl + 'api/Cat/').subscribe(result => {
      this.processes = result;
    }, error => console.error(error));
  }

  sendData(event: any) {
    this.processId = 'api/Cat/' + event.path[0].id;
    console.log(this.baseUrl + this.processId)
    this.apiClient.get<Process>(this.baseUrl + this.processId).subscribe(result => {
      console.log(result);
    }, error => console.error(error));
  }
}

export interface Process {
  Id: number;
  ProcessName: string;
}

export interface DetailedProcess{
  Id: number;
  ProcessName: string;
  StartTime: string;
  ProcessorTime: string;
  Threads: string;
}
