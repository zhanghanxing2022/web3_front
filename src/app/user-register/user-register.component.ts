import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../service/user-service.service';
import { Xontrol } from '../Xontrol';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})

export class UserRegisterComponent implements OnInit {
  name = new Xontrol();
  pass = new Xontrol();
  pass2 = new Xontrol();
  email = new Xontrol();
  phone = new Xontrol();
  valueList=[this.name,this.pass,this.pass2,this.email,this.phone];


  ngOnInit(): void {

  }
  constructor(public http: HttpClient,private userService: UserServiceService) {

  }
  greeting() {

    this.userService.greeting(String(sessionStorage.getItem("userID"))).subscribe((response: any) => {
      window.alert(response.name);
    });
  }
  register() {
    this.emailCheck();
    this.nameCheck();
    this.passCheck();
    this.pass2Check();
    this.phoneCheck();
    for(let s of this.valueList)
    {
      if(!s.xontrol)
      {
        console.log("error");
        return;
      }
    }


    this.userService.register(this.name.value, this.pass.value, this.email.value, this.phone.value)
    .subscribe((response: any) => {
        window.alert(response.message);
      });
  }
  addCheck(ele: Xontrol, exp: RegExp, tips: string) {

    if (exp.test(ele.value)&& ele.value.length!=0) {
      ele.mess = "✔";
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
    this.addCheck(this.name, new RegExp("^"), "用户名重复");
  }
  passCheck() {
    this.addCheck(this.pass, new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/), "至少八个字符一个字母和一个数字");
  }
  pass2Check() {
    console.log("pass2");
    console.log(this.pass.value);
    // ^  $  精确匹配 只能是abc
    this.addCheck(this.pass2, new RegExp("^" + this.pass.value + "$"), "两次输入不一致");
  }
  emailCheck() {
    this.addCheck(this.email, new RegExp(/^\w+@\w+\.\w+(\.\w+)?$/), "邮箱格式错误");
  }
  phoneCheck() {
    this.addCheck(this.phone, new RegExp(/^(1)\d{10}$/), "请输入11为合法手机号码。");
  }



}
