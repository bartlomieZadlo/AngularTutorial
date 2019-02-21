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
      console.log("Refreshing");
      this.processes = result;
    }, error => console.error(error));
  }

  sendData(event: any) {

    console.log(event);
    this.processId = 'api/Cat/' + event;

    this.apiClient.get<DetailedProcess>(this.baseUrl + this.processId).subscribe(result => {
      console.log("Sending detailed info about process " + event);
      console.log(result);
      this.specificProcess = result;
    }, error => console.error(error));
  }
}

export interface Process {
  Id: number;
  ProcessName: string;
}

export interface DetailedProcess {
  Id: number;
  ProcessName: string;
  StartTime: string;
  CPUUsage: string;
  NumberOfThreads: string;
  RunTime: string;
  MemoryUsage: string;
}
