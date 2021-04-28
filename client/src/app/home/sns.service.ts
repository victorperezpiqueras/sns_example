import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
};

@Injectable({
  providedIn: 'root',
})
export class SNSService {
  public url = environment.awsUrl;
  public topicArn = "arn:aws:sns:us-east-1:304738393208:example-topic"
  constructor(private http: HttpClient) { }

  listSubscriptionsByTopic(): Observable<any> {
    return this.http.get<any>(this.url + '/list_subscriptions_by_topic' + '/' + this.topicArn, httpOptions);
  }

  subscribeTopic(email: string): Observable<any> {
    return this.http.post<any>(this.url + '/subscribe_topic' + '/' + this.topicArn,
      JSON.stringify({ email: email }), httpOptions);
  }

  sendMessageToTopic(message: string, subject: string): Observable<any> {
    return this.http.post<any>(this.url + '/send_message_to_topic' + '/' + this.topicArn,
      JSON.stringify({ message: message, subject: subject }), httpOptions);
  }

}
