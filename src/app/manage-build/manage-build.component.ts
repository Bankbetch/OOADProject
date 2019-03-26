import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-manage-build',
  templateUrl: './manage-build.component.html',
  styleUrls: ['./manage-build.component.css']
})
export class ManageBuildComponent implements OnInit {
  checkG
  getLogin
  manageBuild: FormGroup
  constructor(private router: Router, private http: HttpClient, private formBuilder: FormBuilder, private title: Title) {
    this.title.setTitle("จัดการตึก")
  }

  ngOnInit() {
    this.check(), this.onClickAdmin(),
      this.manageBuild = this.formBuilder.group({
        nameTeacher: ['', Validators.required],
        nameSubject: ['', Validators.required],
        term: ['', Validators.required],
      })
  }
  check() {
    var check = localStorage.getItem("check")
    var getLogin = localStorage.getItem("setLogin")
    this.checkG = check
    this.getLogin = getLogin
    window.onload = function () {
    }
  }

  onClickAdmin() {
    if (this.checkG === "เจ้าหน้าที่") {
      this.router.navigate(["/เจ้าหน้าที่/จัดการตึก"])
    } else {
      this.router.navigate(["/หน้าหลัก"])
    }
  }
}
