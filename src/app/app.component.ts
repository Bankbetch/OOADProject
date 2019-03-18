import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  getLogin = ""
  checkG = ""
  name = ""
  surname = ""
  ngOnInit(): void {
    this.check()
  }
  ngDoCheck() {
    this.check()
  }
  constructor(private router: Router) {

  }
  checkLogin() {
    if (this.getLogin !== "true") {
      this.router.navigate(["/"])
    } else if (this.checkG !== "เจ้าหน้าที่") {
      this.router.navigate(["/หน้าหลัก"])
    }
    else {
      this.router.navigate(["/เจ้าหน้าที่"])
    }
  }
  check() {
    var check = localStorage.getItem("check")
    var getLogin = localStorage.getItem("setLogin")
    var getUsername = localStorage.getItem("getName")
    var getSurname = localStorage.getItem("getSurname")
    this.checkG = check
    this.getLogin = getLogin
    this.name = getUsername
    this.surname = getSurname
    // console.log(this.name)
    window.onload = function () {
    }
  }
  OnClickLogout() {
    this.name = "Username"
    localStorage.setItem("getName", "")
    this.surname = ""
    localStorage.setItem("getSurname", "")
    localStorage.setItem("check", "")
    localStorage.setItem("setLogin", "")
    this.router.navigate(["/"])
  }
}
