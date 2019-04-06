import { Component, OnInit } from '@angular/core';
import axios from '../../../node_modules/axios/dist/axios'
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  getNameG = ""
  getSurnameG = ""
  username = ""
  password = ""
  usernameG = ""
  check = ""
  setLogin = "false"

  setStatusNoPageLogin = "false"

  constructor(private router: Router, private title: Title) {
    this.title.setTitle("Login")
  }

  ngOnInit(): void {
    this.check = "", this.checkNopageLogin()
  }

  onSignin() {
    const md5 = new Md5();
    if (this.username !== "") {
      if (this.password !== "") {
        const auth = md5.appendStr(this.password).end();
        axios.get("http://localhost:4001/login/" + this.username).then((res) => {
          if (res.data.status === undefined) {
            var checkPassword = res.data.password
            if (auth === checkPassword.toLowerCase()) {
              var checkTypes = res.data.types
              var getName = res.data.name
              var getSurname = res.data.surname
              this.getNameG = getName
              this.getSurnameG = getSurname
              this.check = checkTypes
              this.setLogin = "true"
              this.setAdmin()
            } else {
              alert("กรุณาใส่ password ใหม่อีกครั้ง")
            }
          }else{
            alert("กรุณาใส่ username ใหม่อีกครั้ง")
          }
        })
      } else {
        alert("กรุณาใส่ password")
      }
    } else {
      alert("กรุณาใส่ username")
    }
  }
  setAdmin() {
    localStorage.setItem("check", this.check)
    localStorage.setItem("setLogin", this.setLogin)
    localStorage.setItem("getName", this.getNameG)
    localStorage.setItem("getSurname", this.getSurnameG)
    this.router.navigate(["/หน้าหลัก"])
  }

  checkNopageLogin() {
    var getStatus = localStorage.getItem("setStatusNoPageLogin")
    this.setStatusNoPageLogin = getStatus
    console.log(this.setStatusNoPageLogin)
    window.onload = function () {
    }
    if (this.setStatusNoPageLogin == "true") {
      this.router.navigate(["/หน้าหลัก"])
    } else {
      this.router.navigate(["/"])
    }
  }
}