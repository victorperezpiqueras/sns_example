import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { SNSService } from './sns.service';

export interface Subscription {
  SubscriptionArn: string,
  Owner: string,
  Protocol: string,
  Endpoint: string,
  TopicArn: string
}

export interface Response {
  Subscriptions: Subscription[],
  ResponseMetadata: any
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private snsService: SNSService, private _snackBar: MatSnackBar,
  ) { }

  isLoading = false;

  topic: string = this.snsService.topicArn.split(":")[5];

  subscriptors: string[] = []

  /* inputs */
  email: string;
  message: string;
  subject: string;

  ngOnInit() {
    this.refresh();
  }

  publish() {
    this.isLoading = true;
    this.snsService.sendMessageToTopic(this.message, this.subject).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    )
      .subscribe((res: any) => {
        this.message = "";
        this.subject = "";
        this._snackBar.open("Message published successfully", "Close", {
          duration: 2500
        });
      });
  }

  addSubscriptor() {
    this.isLoading = true;
    this.snsService.subscribeTopic(this.email).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    )
      .subscribe((res: any) => {
        this.email = "";
        this._snackBar.open("Subscriptor invited successfully", "Close", {
          duration: 2500
        });
      });
  }

  refresh() {
    this.isLoading = true;
    this.snsService
      .listSubscriptionsByTopic()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((subscriptors: Response) => {
        this.subscriptors = [];
        subscriptors.Subscriptions.forEach((sub: Subscription) => {
          if (sub.SubscriptionArn !== "PendingConfirmation" && sub.SubscriptionArn !== "Deleted") {
            this.subscriptors.push(sub.Endpoint);
          }
        });
      });
  }
}
