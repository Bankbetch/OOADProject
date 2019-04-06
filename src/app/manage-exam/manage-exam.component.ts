import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from "@angular/platform-browser";
import { NgxSpinnerService } from 'ngx-spinner';
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
  addIncres: FormGroup;
  p
  dataOtShow = 5
  otShow = []
  year = []
  term = []
  getRoom: any[]
  lenghtData: Number
  spliteBuild = []
  dataSpliteBuild
  dataTeacher: any[]
  checkData = false
  constructor(private router: Router, private http: HttpClient, private formBuilder: FormBuilder, private title: Title, private spinner: NgxSpinnerService) {
    this.title.setTitle("จัดการวิชา")
  }
  dataRoom: any[]
  dataSubject: any[]
  dataSubjectLearn: any[]
  selectedItems = [];
  dropdownSettings = {};
  public ngOnInit() {
    this.check(), this.onClickAdmin(), this.getBuilding(), this.getSubject(), this.getSubjectLearn()
    this.addIncres = this.formBuilder.group({
      id: ['', Validators.required],
      nameSubject: ['', Validators.required],
      nameTeacher: ['', Validators.required],
      build: ['', Validators.required],
      room: ['', Validators.required],
      day: ['', Validators.required],
      timeStart: ['', Validators.required],
      timeEnd: ['', Validators.required],
      faculty: ['', Validators.required],
      credit: ['', Validators.required],
      term: ['', Validators.required],
      year: ['', Validators.required],
      sit: ['', Validators.required]
    }), this.onGetTable(), this.showSpinner(), this.addIncres.get('sit').setValue("0")
  }
  onItemSelect(item: any) {
    // console.log(item);
    // this.addIncres.get('nameTeacher').setValue(item)

  }
  onSelectAll(items: any) {
    var arr = []
    for (let item of items) {
      arr.push(item.item_text)
    }
    this.addIncres.get('nameTeacher').setValue(arr)
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
  aa = []
  onClickAdmin() {
    if (this.checkG === "เจ้าหน้าที่") {
      this.router.navigate(["/เจ้าหน้าที่/จัดการวิชา"])
    } else {
      this.router.navigate(["/หน้าหลัก"])
    }
  }
  getBuilding() {
    this.http.get<any>('http://localhost:4001/getroom').subscribe(result => {
      this.dataRoom = result.data
      // console.log(this.dataRoom)
      this.otShow = [{
        number: 5,
      },
      {
        number: 10
      },
      {
        number: 20,
      },
      {
        number: 50,
      },
      {
        number: 60,
      }]
      this.year = [
        { name: 2559 }, { name: 2560 }, { name: 2561 }, { name: 2562 },

      ]
      this.term = [
        { name: "ภาคการศึกษาต้น" }, { name: "ภาคการศึกษาปลาย" }
      ]
      for (let item of this.dataRoom) {
        this.spliteBuild.push(item.build)
      }
      this.setDataBuild()
    })
  }
  onClickInsertBuild() {
    this.router.navigate(['/เจ้าหน้าที่/จัดการตึก'])
  }
  onSubmit() {
    this.submitted = true;
    if (this.addIncres.invalid) {
      return;
    }
    var obj = {
      id: this.addIncres.value.id, name: this.addIncres.value.nameSubject, teacher:
        this.addIncres.value.nameTeacher, build: this.addIncres.value.build, room:
        this.addIncres.value.room, day: this.addIncres.value.day, timeStart: this.addIncres.value.timeStart,
      timeEnd: this.addIncres.value.timeEnd, faculty: this.addIncres.value.faculty, unit: this.addIncres.value.credit,
      term: this.addIncres.value.term, year: this.addIncres.value.year, sit: this.addIncres.value.sit
    }
    this.http.post<any>('http://localhost:4001/subjectlearn', obj).subscribe(result => {
      console.log(obj)
      this.getSubjectLearn()
      this.onClickClear()
    })
  }
  dataTeacherAfterGet: any[]
  // nameteacher2 = []
  getSubjectLearn() {
    var arr
    this.http.get<any>('http://localhost:4001/subjectlearn').subscribe(result => {
      this.dataSubjectLearn = result.data

      // for (var i = 0; i < result.data[0].teacher.length; i++) {
      //   arr.push({ namesss: result.data[0].teacher[i].item_text })
      //   this.nameteacher2 = arr
      // }
      // console.log(this.nameteacher2)
    })
  }


  getSubject() {
    this.http.get<any>('http://localhost:4001/subject').subscribe(result => {
      this.dataSubject = result.data
    })
  }
  checkselect = true
  checkIdAndSub() {
    // if (this.addIncres.value.id) {
    //   this.checkselect = true
    // }
    // this.checkselect = false
    if (this.addIncres.value.id) {
      for (let item of this.dataSubject) {
        if (this.addIncres.value.id === item.id) {
          this.addIncres.get('nameSubject').setValue(item.name)
          this.addIncres.get('faculty').setValue(item.faculty)
          this.addIncres.get('credit').setValue(item.unit)
        }
      }
    }

  }
  checkNameSub() {
    if (this.addIncres.value.nameSubject) {
      for (let item of this.dataSubject) {
        if (this.addIncres.value.nameSubject === item.name) {
          this.addIncres.get('id').setValue(item.id)
          this.addIncres.get('faculty').setValue(item.faculty)
          this.addIncres.get('credit').setValue(item.unit)
        }
      }
    }
  }
  setDataRoom = []
  setDataRoomAfter = []
  checkRoom() {
    if (this.addIncres.value.build) {
      for (let item of this.dataRoom) {
        if (this.addIncres.value.build === item.build) {
          this.setDataRoom.push(item.room)
        }
        const newArray = this.setDataRoom.filter((elem, i, arr) => {
          if (arr.indexOf(elem) === i) {
            return elem
          }
        })
        this.setDataRoom = newArray
        this.setDataRoomAfter = this.setDataRoom
      }
      if (this.setDataRoom != []) {
        this.setDataRoom = []
      }
    }
  }

  setDataBuild() {
    var count = 1
    const newArray = this.spliteBuild.filter((elem, i, arr) => {
      if (arr.indexOf(elem) === i) {
        return elem
      }
    })
    this.dataSpliteBuild = newArray
  }

  onClickClear() {
    this.submitted = false
    this.addIncres.get('id').setValue('');
    this.addIncres.get('nameSubject').setValue("");
    this.addIncres.get('nameTeacher').setValue("");
    this.addIncres.get('build').setValue("")
    this.addIncres.get('room').setValue("")
    this.addIncres.get('day').setValue("")
    this.addIncres.get('timeStart').setValue("")
    this.addIncres.get('timeEnd').setValue("")
    this.addIncres.get('faculty').setValue("")
    this.addIncres.get('credit').setValue("")
    this.addIncres.get('term').setValue("")
    this.addIncres.get('year').setValue("")
  }

  dropdownList = [];
  onGetTable() {
    var count = 1
    var arr = []
    this.http.get<any>("http://localhost:4001/getdata").subscribe(result => {
      this.dataTeacher = result.data
      for (let item of this.dataTeacher) {
        if (item.types == "อาจารย์") {
          arr.push({ item_id: count, item_text: item.name + " " + item.surname })
          count++
        }
      }
      this.dropdownList = arr
      this.selectedItems = [];
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
      this.checkData = true;
      this.showSpinner()
    })
  }
  showSpinner() {
    if (this.checkData == false) {
      this.spinner.show();
    }
    else if (this.checkData == true) {

      /** spinner ends after 5 seconds */
      this.spinner.hide();

    }
  }
  
  onClickEdit() {

  }
}