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
  checknavBarAdmin = false
  checkNavbarAdminManageUser = false
  checkNavbarAdminManageExcame = false
  checkNavbarAdminManagPersonalExcame = false
  checkNavbarAdminManageExcameNisit = false
  checkNavbarAdminManageRoom = false
  getStatusNoPageLogin = "false"
  navbarLogin = true
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
      this.navbarLogin = false
      this.router.navigate(["/เจ้าหน้าที่"])
    }
  }
  check() {
    var check = localStorage.getItem("check")
    var getLogin = localStorage.getItem("setLogin")
    var getUsername = localStorage.getItem("getName")
    var getSurname = localStorage.getItem("getSurname")
    var checknavBarAdmin = localStorage.getItem("checknavBarAdmin")
    var checkNavbarAdminManageUser = localStorage.getItem("checkNavbarAdminManageUser")
    var checkNavbarAdminManageExcame = localStorage.getItem("checkNavbarAdminManageExcame")
    var checkNavbarAdminManagPersonalExcame = localStorage.getItem("checkNavbarAdminManagPersonalExcame")
    var checkNavbarAdminManageExcameNisit = localStorage.getItem("checkNavbarAdminManageExcameNisit")
    var checkNavbarAdminManageRoom = localStorage.getItem("checkNavbarAdminManageRoom")
    var getStatusNoPageLogin = localStorage.getItem("setStatusNoPageLogin")
    this.checkG = check
    this.getLogin = getLogin
    this.name = getUsername
    this.surname = getSurname
    this.getStatusNoPageLogin = getStatusNoPageLogin
    if (checknavBarAdmin == "true" && checkNavbarAdminManageUser == "true" && checkNavbarAdminManageExcame == "true" && checkNavbarAdminManagPersonalExcame == "true" && checkNavbarAdminManageExcameNisit == "true" && checkNavbarAdminManageRoom == "true") {
      this.checknavBarAdmin = true
      this.checkNavbarAdminManageUser = true
      this.checkNavbarAdminManageExcame = true
      this.checkNavbarAdminManagPersonalExcame = true
      this.checkNavbarAdminManageExcameNisit = true
      this.checkNavbarAdminManageRoom = true
      this.navbarLogin = true
    } if (this.name != "") {
      this.navbarLogin = true
    }
    else {
      this.checknavBarAdmin = false
      this.checkNavbarAdminManageUser = false
      this.checkNavbarAdminManageExcame = false
      this.checkNavbarAdminManagPersonalExcame = false
      this.checkNavbarAdminManageExcameNisit = false
      this.checkNavbarAdminManageRoom = false
      this.navbarLogin = false
    }
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
    localStorage.setItem("checknavBarAdmin", "false")
    localStorage.setItem("checkNavbarAdminManageExcame", "false")
    localStorage.setItem("checkNavbarAdminManageExcame", "false")
    localStorage.setItem("checkNavbarAdminManagPersonalExcame", "false")
    localStorage.setItem("checkNavbarAdminManageRoom", "false")
    localStorage.setItem("setStatusNoPageLogin", "false")
    this.router.navigate(["/"])
    this.navbarLogin = true

  }
}
