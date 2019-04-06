import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from "@angular/platform-browser";
@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {
  searchString = ""
  checkG = "false"
  getLogin = "false"
  addIncres: FormGroup;
  p
  constructor(private router: Router, private http: HttpClient, private formBuilder: FormBuilder, private title: Title) {
    this.title.setTitle("เพิ่มรายวิชาสอน")
  }
  data: any[]

  ngOnInit() {
    this.check(), this.onClickAdmin(),
      this.addIncres = this.formBuilder.group({
        id: ['', Validators.required],
        nameSubject: ['', Validators.required],
        nameTeacher: ['', Validators.required],
        build: ['', Validators.required],
        room: ['', Validators.required],
        day: ['', Validators.required],
        timeStart: ['', Validators.required],
        timeEnd: ['', Validators.required],
      })
  }
  get f() { return this.addIncres.controls; }
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
      this.router.navigate(["/เจ้าหน้าที่/จัดการรายวิชาสอน/เพิ่มรายวิชาสอน"])
    } else {
      this.router.navigate(["/หน้าหลัก"])
    }
  }
  getBuilding() {
    this.http.get<any>('http://localhost:4001/incres').subscribe(result => {
      this.data = result.data
    })
  }
}
