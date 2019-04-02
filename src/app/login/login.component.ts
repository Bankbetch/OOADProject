import { Component, OnInit } from '@angular/core';
import axios from '../../../node_modules/axios/dist/axios'
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser'
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
    var data = { username: this.username, password: this.password }
    axios.post("https://young-forest-69844.herokuapp.com/login", data).then((res) => {
      var checkUsername = res.data.username
      var checkPassword = res.data.password
      var checkTypes = res.data.types
      var getName = res.data.name
      var getSurname = res.data.surname
      if (checkUsername !== undefined) {
        if (checkPassword === this.password) {
          this.getNameG = getName
          this.getSurnameG = getSurname
          console.log(getName)
          this.check = checkTypes
          this.setLogin = "true"
          this.setAdmin()
        } else {
          alert("กรุณาใส่ password ให้ถูกต้อง")
        }
      } else {
        alert("กรุณาใส่ username ให้ถูกต้อง")
      }
    })
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