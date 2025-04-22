// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ServicesService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { Observable, of, Observer, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
   Baseurl = "https://matrimonialwebapi.azurewebsites.net/api"
  advertisementHeight = new BehaviorSubject(<any>(0));

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
		let errorMessage = 'Unknown error!';
		if (error.error instanceof ErrorEvent) {
			errorMessage = `Error: ${error.error.message}`;
		} else {
			errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		return throwError(errorMessage);
  }

    getPosts(apiurl:any, user: any): Observable<any> {
		var authtoken=localStorage.getItem("token");

      const headers = new HttpHeaders({
        Authorization: 'Basic ' + btoa('tulsi' + ":" + 'FdBNaYWfjpWN9eYghMpbRA=='),
        'Content-Type': 'application/json' 
      });
    return this.httpClient.post(apiurl, user,{headers})
			.pipe(retry(3), catchError(this.handleError));
  }

  get(apiurl:any, user: any): Observable<any> {
    const headers = new HttpHeaders({
        Authorization: 'Basic ' + btoa('tulsi' + ":" + 'FdBNaYWfjpWN9eYghMpbRA=='),
        'Content-Type': 'application/json' 
      });
    return this.httpClient.get(apiurl)
			.pipe(retry(3), catchError(this.handleError));
  }
}

