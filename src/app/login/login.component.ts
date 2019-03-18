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
  constructor(private router: Router, private title: Title) {
    this.title.setTitle("Login")
  }

  ngOnInit() {
    this.check = ""
  }

  onSignin() {
    var data = { username: this.username, password: this.password }
    axios.post("http://localhost:4001/login", data).then((res) => {
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
  OnSetLogin() {

  }

}