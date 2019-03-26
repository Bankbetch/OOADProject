import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-manage-exam',
  templateUrl: './manage-exam.component.html',
  styleUrls: ['./manage-exam.component.css']
})
export class ManageExamComponent implements OnInit {
  checkG = "false"
  getLogin = "false"
  searchString
  submitted = false;
  arrayDeleteCheck = ""
  dataDelete: Array<String> = [];
  AddSubjectForm: FormGroup;
  disableLaleId = false
  constructor(private router: Router, private http: HttpClient, private formBuilder: FormBuilder, private title: Title) {
    this.title.setTitle("ดูรายวิชา")
  }
  data: any[]
  public ngOnInit() {
    this.check(), this.onClickAdmin(), this.getTable(),

      this.AddSubjectForm = this.formBuilder.group({
        id: ['', Validators.required],
        nameSubject: ['', Validators.required],
        faculty: ['', Validators.required],
        unit: ['', Validators.required]
      })
  }
  get f() { return this.AddSubjectForm.controls; }
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
      this.router.navigate(["/เจ้าหน้าที่/จัดการรายวิชาสอน"])
    } else {
      this.router.navigate(["/หน้าหลัก"])
    }
  }
  getTable() {

    this.http.get<any>('http://localhost:4001/tablesubject').subscribe(result => {
      this.data = result.data
    })

  }

  onSubmit() {
    this.submitted = true;
    if (this.AddSubjectForm.invalid) {
      return;
    }
    var obj = { id: this.AddSubjectForm.value.id, name: this.AddSubjectForm.value.nameSubject, faculty: this.AddSubjectForm.value.faculty, unit: this.AddSubjectForm.value.unit }
    this.http.post<any>('http://localhost:4001/tablesubject', obj).subscribe((res) => {
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
        this.http.post('http://localhost:4001/tablesubject/delete', this.dataDelete).subscribe((res) => {

          this.getTable()
        })
      }
      if (this.arrayDeleteCheck == "" || this.dataDelete.length === 0) {
        alert("กรุณาเลือกข้อมูลที่จะลบ")
      }
    }
  }
  _id
  id = ""
  onClickEdit(_id: String, id: string, name: string, faculty: string, unit: string) {
    this.AddSubjectForm.get('id').setValue(id);
    this.AddSubjectForm.get('nameSubject').setValue(name);
    this.AddSubjectForm.get('faculty').setValue(faculty)
    this.AddSubjectForm.get('unit').setValue(unit)
    this.AddSubjectForm.controls['id'].disable()
    this._id = _id
    this.id = id
    // console.log(this.AddSubjectForm.value.id)
  }
  Edit() {
    this.submitted = true;
    if (this.AddSubjectForm.invalid) {
      return;
    }
    var obj = { _id: this._id, id: this.id, name: this.AddSubjectForm.value.nameSubject, faculty: this.AddSubjectForm.value.faculty, unit: this.AddSubjectForm.value.unit }
    console.log(this.id)
    this.http.patch<any>('http://localhost:4001/tablesubject/', obj).subscribe((res) => {
      console.log("EditSuccess")
      window.location.reload()
    })
  }
  OnclickModel() {
    this.AddSubjectForm.controls['id'].enable()
    this.AddSubjectForm.get('id').setValue("");
    this.AddSubjectForm.get('nameSubject').setValue("");
    this.AddSubjectForm.get('faculty').setValue("")
    this.AddSubjectForm.get('unit').setValue("")
  }
  // itemsPerPage = 5
  // currentPage

  // absoluteIndex(indexOnPage: number): number {
  //   return this.itemsPerPage * (this.currentPage - 1) + indexOnPage;
  // }
}
