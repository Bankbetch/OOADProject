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
  searchString = ""
  submitted = false
  checkG
  getLogin
  data: any[]
  manageBuild: FormGroup
  arrayDeleteCheck = ""
  dataDelete: Array<String> = [];
p
  constructor(private router: Router, private http: HttpClient, private formBuilder: FormBuilder, private title: Title) {
    this.title.setTitle("จัดการตึก")
  }
  get f() { return this.manageBuild.controls; }
  ngOnInit() {
    this.check(), this.onClickAdmin(), this.getTable(),
      this.manageBuild = this.formBuilder.group({
        build: ['', Validators.required],
        room: ['', Validators.required],
        sit: ['', Validators.required],
        status: ['', Validators.required]
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

  onClear() {
    this.manageBuild.get('build').setValue("");
    this.manageBuild.get('room').setValue("");
    this.manageBuild.get('sit').setValue("");
    this.manageBuild.get('status').setValue("");
  }

  onClickAdmin() {
    if (this.checkG === "เจ้าหน้าที่") {
      this.router.navigate(["/เจ้าหน้าที่/จัดการตึก"])
    } else {
      this.router.navigate(["/หน้าหลัก"])
    }
  }
  getTable() {
    this.http.get<any>('https://young-forest-69844.herokuapp.com/getroom').subscribe(result => {
      this.data = result.data
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.manageBuild.invalid) {
      return;
    }
    var obj = { build: this.manageBuild.value.build, room: this.manageBuild.value.room, sit: this.manageBuild.value.sit, status: this.manageBuild.value.status }
    this.http.post<any>('https://young-forest-69844.herokuapp.com/addroom', obj).subscribe((res) => {
      // this.getTable()
      window.location.reload()
    })
  }

  onSetData(event, _id: string, i) {
    if (event.target.checked) {
      this.arrayDeleteCheck = event.target.value
      this.dataDelete.push(this.arrayDeleteCheck)
      console.log(this.dataDelete)
    } else {
      var array = this.dataDelete
      var index = array.indexOf(event.target.value)
      if (index !== -1) {
        array.splice(index, 1)
        this.dataDelete = array
      }
    }
  }

  onClickDelete() {
    var r = confirm("กดokเพื่อลบข้อมูล");
    if (r == true) {
      if (this.arrayDeleteCheck !== "" && this.dataDelete.length > 0) {
        this.http.post('https://young-forest-69844.herokuapp.com/deleteroom', this.dataDelete).subscribe((res) => {
          this.getTable()
        })
      }
      if (this.arrayDeleteCheck == "" || this.dataDelete.length === 0) {
        alert("กรุณาเลือกข้อมูลที่จะลบ")
      }
    }
  }

  _id
  onClickEdit(_id: String, build: string, room: string, sit: string, status: string) {
    this.manageBuild.get('build').setValue(build);
    this.manageBuild.get('room').setValue(room);
    this.manageBuild.get('sit').setValue(sit)
    this.manageBuild.get('status').setValue(status)
    this._id = _id
    console.log(this._id)
  }

  Edit() {
    this.submitted = true;
    if (this.manageBuild.invalid) {
      return;
    }
    var obj = { _id: this._id, build: this.manageBuild.value.build, room: this.manageBuild.value.room, sit: this.manageBuild.value.sit, status: this.manageBuild.value.status }
    this.http.patch<any>('https://young-forest-69844.herokuapp.com/editroom/', obj).subscribe((res) => {
      console.log("EditSuccess")
      window.location.reload()
    })
  }
}
