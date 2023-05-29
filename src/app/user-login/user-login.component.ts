import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Xontrol } from '../Xontrol';
import { Router} from '@angular/router'
import { UserServiceService } from '../service/user-service.service';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  name = new Xontrol();
  pass = new Xontrol();
  constructor(public http: HttpClient,public router: Router,private userService:UserServiceService) {

  }
  ngOnInit(): void {
  }
  greeting() {
    const name = sessionStorage.getItem("userID");
    this.userService.greeting(String(name)).subscribe((response: any) => {
      window.alert(response.name);
    });
  }
  login() {
    this.userService.login(this.name.value,this.pass.value).subscribe((response: any) => {
      console.log(response);
      if(response.ok)
      {
        sessionStorage.setItem('userID',this.name.value);
        this.greeting();
        this.router.navigateByUrl('');

      }else
      {
        this.pass.mess=response.message;
        this.pass.color="red";
      }
    });
  }
  addCheck(ele: Xontrol, tips: string) {

    if (ele.value.length != 0) {
      ele.mess = "";
      ele.color = "green";
      ele.xontrol = true;
      return true;
    } else {
      ele.color = "red";
      ele.mess = tips;
      ele.xontrol = false;
      return false;
    }
  }
  nameCheck() {
    console.log(this.name.value);
    this.addCheck(this.name, "用户名重复");
  }
  passCheck() {
    this.addCheck(this.pass, "至少八个字符一个字母和一个数字");
  }


}
