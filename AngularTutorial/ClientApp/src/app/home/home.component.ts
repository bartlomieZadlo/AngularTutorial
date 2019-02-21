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
  activeComment: string;

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
      this.activeComment = localStorage.getItem(result.id);

      let actualForm = document.createElement("textarea");
      actualForm.setAttribute('class', 'form-control');
      actualForm.setAttribute('rows', '3');
      actualForm.setAttribute('name', 'comment');
      actualForm.setAttribute('placeholder', 'Write a comment');
      actualForm.setAttribute('id', 'comment-holder');
      actualForm.value = this.activeComment;
      document.getElementById('comment-holder').removeChild(document.getElementById('comment-holder').lastChild);
      document.getElementById('comment-holder').append(actualForm);
    }, error => console.error(error));
  }


  saveComment(name: string) {
    localStorage.setItem(this.specificProcess.id.toString(), name);
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
