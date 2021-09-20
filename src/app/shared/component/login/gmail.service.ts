import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GmailService {

  constructor() {
    /*gapi.load('client', () => {
      gapi.client.init({
        apiKey: 'AIzaSyCus9zwtKNjmmMCuQ5pVTJIBBY7eLBwriQ',
        clientId: '980114334229-pn80tdgibmf1rsffin5veptn4d08d1pq.apps.googleusercontent.com',
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"],
        scope: 'https://www.googleapis.com/auth/gmail.readonly'
      })
    })*/
  }
}
