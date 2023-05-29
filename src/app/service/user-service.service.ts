import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { Server } from "socket.io";
export interface User {
  userID: number,
  username: string;
  password: string;
  email: string;
  phone: string;
  
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private url = "http://localhost:8080/";

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) { }
  greeting(name = "") {
    let str = this.url + "greeting";
    if (name) {
      str += "?name=" + name;
    }
    return this.http.get(str).pipe
      (
        tap(_ => console.log("greeting")),
        catchError(this.handleError<string>(name))
      );
  }
  getUsers(): Observable<User[]> {
    
    return this.http.get<User[]>(this.url + "user/getAllUser")
    .pipe
      (tap(_ => console.log("Try get users!")),
        catchError(this.handleError<User[]>("Get user 404!"))
      )
  }
  register(username: string, password: string, email: string, phone: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.url + "user/register",
      {
        username: username,
        password: password,
        email: email,
        phone: phone
      }, httpOptions).pipe(
        tap(_ => console.log("Try register")),
        catchError(this.handleError<any>("Register 404"))
      );
  }
  login(username: string, password: string): Observable<any> {
    const form = new FormData();
    form.append("username", username);
    form.append("password", password);
    return this.http.post(this.url + "user/login", form).pipe(
      tap(_ => console.log("Try login")),
      catchError(this.handleError<any>("Login 404"))
    )
  }
}
