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
  checknavBarAdmin = false
  checkNavbarAdminManageUser = false
  check() {
    var check = localStorage.getItem("check")
    var getLogin = localStorage.getItem("setLogin")
    var getUsername = localStorage.getItem("getName")
    var getSurname = localStorage.getItem("getSurname")
    var checknavBarAdmin = localStorage.getItem("checknavBarAdmin")
    var checkNavbarAdminManageUser = localStorage.getItem("checkNavbarAdminManageUser")
    this.checkG = check
    this.getLogin = getLogin
    this.name = getUsername
    this.surname = getSurname
    if (checknavBarAdmin == "true" && checkNavbarAdminManageUser == "true") {
      this.checknavBarAdmin = true
      this.checkNavbarAdminManageUser = true
    } else {
      this.checknavBarAdmin = false
      this.checkNavbarAdminManageUser = false
    }
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
    localStorage.setItem("checknavBarAdmin", "false")
    localStorage.setItem("checkNavbarAdminManageUser", "false")
    this.router.navigate(["/"])
  }
}
