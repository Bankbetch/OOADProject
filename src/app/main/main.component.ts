import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  element: HTMLImageElement;
  constructor(private router: Router, private title: Title) {
    this.title.setTitle("หน้าหลัก")
  }

  ngOnInit() {
    this.check(), this.checkLogin(), this.ChckType()
  }
  name = ""
  surname = ""
  checkG = ""
  getLogin = ""
  disableButtonAdmin = false
  disableButtonTeacher = false
  disableButtonStudent = false
  disableButtonExcame = false

  check() {
    var check = localStorage.getItem("check")
    var getLogin = localStorage.getItem("setLogin")
    var getUsername = localStorage.getItem("getName")
    var getSurname = localStorage.getItem("getSurname")
    this.checkG = check
    this.getLogin = getLogin
    this.name = getUsername
    this.surname = getSurname
    window.onload = function () {

    }

  }
  OnClickLogout() {
    this.name = "Username"
    localStorage.setItem("getName", "")
    localStorage.setItem("getSurname", "")
    localStorage.setItem("check", "")
    localStorage.setItem("setLogin", "")
    this.router.navigate(["/"])
  }

  // onClickStudent() {
  //   if (this.checkG === "นิสิต") {
  //     console.log("Not Permission")
  //     this.router.navigate(["/หน้าหลัก"])
  //   }
  // }
  // onClickTeacher() {
  //   if (this.checkG === "อาจารย์") {
  //     console.log("Not Permission")
  //     this.router.navigate(["/หน้าหลัก"])
  //   }
  // }
  // onClickExcam() {
  //   if (this.checkG === "คนคุมสอบ") {
  //     console.log("Not Permission")
  //     this.router.navigate(["/หน้าหลัก"])
  //   }
  // }
  // onClickAdmin() {
  //   if (this.checkG === "เจ้าหน้าที่") {
  //     this.router.navigate(["/เจ้าหน้าที่/จัดการผู้ใช้งาน"])
  //   }
  // }

  checkLogin() {
    if (this.getLogin !== "true") {
      this.router.navigate(["/"])
    } else {
      this.router.navigate(["/หน้าหลัก"])
    }
  }
  ChckType() {
    if (this.checkG === "นิสิต") {
      console.log(this.checkG)
      document.getElementById("imageAdmin").setAttribute('src', "https://image.flaticon.com/icons/svg/1437/1437748.svg")
      document.getElementById("imageExcame").setAttribute('src', "https://image.flaticon.com/icons/svg/1437/1437748.svg")
      document.getElementById("imageTeacher").setAttribute('src', "https://image.flaticon.com/icons/svg/1437/1437748.svg")
      this.disableButtonAdmin = true
      this.disableButtonExcame = true
      this.disableButtonTeacher = true
      this.router.navigate(["/หน้าหลัก"])
    } else if (this.checkG === "อาจารย์") {
      console.log(this.checkG)
      document.getElementById("imageAdmin").setAttribute('src', "https://image.flaticon.com/icons/svg/1437/1437748.svg")
      document.getElementById("imageExcame").setAttribute('src', "https://image.flaticon.com/icons/svg/1437/1437748.svg")
      document.getElementById("imageStudent").setAttribute('src', "https://image.flaticon.com/icons/svg/1437/1437748.svg")
      this.disableButtonAdmin = true
      this.disableButtonExcame = true
      this.disableButtonStudent = true
      this.router.navigate(["/หน้าหลัก"])
    } else if (this.checkG === "คนคุมสอบ") {
      console.log(this.checkG)
      document.getElementById("imageAdmin").setAttribute('src', "https://image.flaticon.com/icons/svg/1437/1437748.svg")
      document.getElementById("imageTeacher").setAttribute('src', "https://image.flaticon.com/icons/svg/1437/1437748.svg")
      document.getElementById("imageStudent").setAttribute('src', "https://image.flaticon.com/icons/svg/1437/1437748.svg")
      this.disableButtonAdmin = true
      this.disableButtonTeacher = true
      this.disableButtonStudent = true
      this.router.navigate(["/หน้าหลัก"])
    } else if (this.checkG === "เจ้าหน้าที่") {
      console.log(this.checkG)
      document.getElementById("imageExcame").setAttribute('src', "https://image.flaticon.com/icons/svg/1437/1437748.svg")
      document.getElementById("imageTeacher").setAttribute('src', "https://image.flaticon.com/icons/svg/1437/1437748.svg")
      document.getElementById("imageStudent").setAttribute('src', "https://image.flaticon.com/icons/svg/1437/1437748.svg")
      this.disableButtonExcame = true
      this.disableButtonTeacher = true
      this.disableButtonStudent = true
    }
  }
  onClickAdmin() {
    if (this.checkG === "เจ้าหน้าที่") {
      this.router.navigate(["/เจ้าหน้าที่"])
    } else {
      console.log(this.checkG)
    }
  }
}
