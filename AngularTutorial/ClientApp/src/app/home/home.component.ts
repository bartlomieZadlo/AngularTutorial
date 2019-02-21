import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Process } from './home.component';
import { DOCUMENT } from '@angular/common';

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
  processComment: string;

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

    this.processId = 'api/Cat/' + event.path[0].id;
    
    this.apiClient.get<DetailedProcess>(this.baseUrl + this.processId).subscribe(result => {
      console.log("Sending detailed info about process " + event.path[0].id);
      console.log(result);
      this.specificProcess = result;
      this.processComment = localStorage.getItem(this.specificProcess.id.toString());
    }, error => console.error(error));
  }

  saveComment(name: string) {
    localStorage.setItem(this.specificProcess.id.toString(), name.trim());
    document.getElementById("commentholder").innerHTML = this.processComment;
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
  ProcessorTime: string;
  Threads: string;
  RunTime: string;
  MemoryUsage: string;
}
