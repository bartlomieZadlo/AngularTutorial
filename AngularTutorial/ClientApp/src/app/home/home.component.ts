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
  activeComment: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.apiClient = http;
    this.baseUrl = baseUrl;
  }

  ngOnInit() {
  }

  firstClick() {
    this.apiClient.get<Process[]>(this.baseUrl + 'api/Process/').subscribe(result => {
      console.log("Refreshing");
      this.processes = result;
    }, error => console.error(error));
  }

  sendData(event: any) {
    
    this.processId = 'api/Process/' + event;

    this.apiClient.get<DetailedProcess>(this.baseUrl + this.processId).subscribe(result => {
      console.log("Sending detailed info about process " + event);
      console.log(result);
      this.specificProcess = result;
      this.activeComment = localStorage.getItem(result.id.toString());

     
    }, error => console.error(error));
  }


  saveComment(name: string) {
    console.log(name);
    this.activeComment = name;
    localStorage.setItem(this.specificProcess.id.toString(), name);
  }

  kill(name: string) {
    console.log(name);
  }
}

export interface Process {
  Id: number;
  ProcessName: string;
}

export interface DetailedProcess {
  id: number;
  ProcessName: string;
  StartTime: string;
  CPUUsage: string;
  NumberOfThreads: string;
  RunTime: string;
  MemoryUsage: string;
}
