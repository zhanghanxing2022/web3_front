import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit{
  private url = "http://localhost:8080/user/register";
  ngOnInit(): void {

  }
  constructor(public http:HttpClient)
  {

  }
  greeting() {
    var api = 'http://localhost:8080/greeting';
    this.http.get(`${api}`).subscribe((response: any) => {
      window.alert(response.name);
    });
  }
  register(){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.http.post(this.url,
            {username:'abc',
            password: "123456",
            email: "a@b.com",
            phone: "12345678900"}, httpOptions).subscribe((response:any)=> {
        window.alert(response.message);
    });
 }



}
