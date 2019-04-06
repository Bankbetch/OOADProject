import { Component, OnInit } from '@angular/core';
import { axios } from '../../../node_modules/axios/dist/axios'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './must-match.validator';
import { Title } from "@angular/platform-browser";
import provinces from '../../../json/provinces.json'
import amphures from '../../../json/amphures.json'
import districts from '../../../json/districts.json'
import zipcode from '../../../json/zipcodes.json'
import { FilterPipe } from './FilterPipe.component';
import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from 'xlsx';

import { OrderPipe } from 'ngx-order-pipe';

declare var $: any;


@Component({
  selector: 'app-setting-user',
  templateUrl: './setting-user.component.html',
  styleUrls: ['./setting-user.component.css'],

})
export class SettingUserComponent implements OnInit {

  searchToken: string;
  public searchString: string;

  test = "surname"
  checkForm = false
  disableButtonEdit = false
  disableButtonAdd = false

  dbAddress = {}
  name = ""
  surname = ""
  username = ""
  password = ""
  repassword = ""
  age = ""
  email = ""
  address = ""
  area = "เลือก"
  subarea = ""
  city = ""
  post = ""
  types = "เลือก"
  types2 = [
    {
      "name": "นิสิต",
    },
    {
      "name": "อาจารย์",
    },
    {
      "name": "คนคุมสอบ",
    },
    {
      "name": "เจ้าหน้าที่"
    }
  ]
  data: any[]
  registerForm: FormGroup;
  submitted = false;
  allowAlertAdd = false
  allowAlertEdit = false
  allowAlertDelete = false
  cityOption = provinces
  amphuresOption = amphures
  districtsOption = districts
  zipcodeOption = zipcode
  ArrayAmphures = new Array()
  ArrayDistricts = new Array()
  ArrayZipcode = new Array()
  nameCity = ""
  IDCity = ""
  nameAmpures = ""
  districtsID = ""
  nameZipcode = ""
  zipCodeID = ""
  arrayDeleteCheck = ""
  dataDelete: Array<String> = [];
  disableSelectbox = true
  checkG = ""
  getLogin = ""
  checkData = false;
  sortedCollection: any[];
  constructor(private http: HttpClient, private formBuilder: FormBuilder, 
    private router: Router, private titleService: Title, 
    private spinner: NgxSpinnerService, private orderPipe: OrderPipe) {
    this.titleService.setTitle("จัดการผู้ใช้งาน");
  }



  public ngOnInit() {
    this.onGetTable(),
      this.showSpinner(),
      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        username: ['', Validators.required],
        age: ['', Validators.required],
        address: ['', Validators.required],
        tumbon: ['', Validators.required],
        post: ['', Validators.required],
        type: ['', Validators.required],
        province: ['', Validators.required],
        aumpher: ['', Validators.required],
      },
        {
          validator: MustMatch('password', 'confirmPassword')
        }), this.check(), this.checkLogin(), this.onClickAdmin(), this.registerForm.get('type').setValue("นิสิต"), this.registerForm.get('aumpher').setValue("เลือก"), this.registerForm.get('tumbon').setValue("เลือก")
  }


  get f() { return this.registerForm.controls; }

  showSpinner() {
    if (this.checkData == false) {
      this.spinner.show();
    }
    else if (this.checkData == true) {

      /** spinner ends after 5 seconds */
      this.spinner.hide();

    }

  }

  onSubmit() {
    this.disableAll = false
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    // var r = confirm("กดokเพื่อเพิ่มข้อมูล");
    // if (r == true) {
    // this.allowAlertAdd = true
    // setTimeout(() => {
    //   this.allowAlertAdd = false
    // }, 5000);
    var obj = { name: this.registerForm.value.firstName, surname: this.registerForm.value.lastName, username: this.registerForm.value.username, password: this.registerForm.value.password, types: this.registerForm.value.type, age: this.registerForm.value.age, email: this.registerForm.value.email, address: this.registerForm.value.address, tumbon: this.registerForm.value.tumbon, aumpher: this.registerForm.value.aumpher, city: this.registerForm.value.province, post: this.registerForm.value.post }
    this.http.post<any>('http://localhost:4001/settinguser', obj).subscribe((res) => {
      this.allowAlertAdd = true
      setTimeout(() => {
        this.allowAlertAdd = false
      }, 5000);
      this.onGetTable()
      this.OnClear()
    })
    // }
  }

  onClickEdit() {
    console.log(this.registerForm.value.username)
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    // var r = confirm("กดokเพื่อแกไขข้อมูล");
    // if (r == true) {
    var obj = { name: this.registerForm.value.firstName, surname: this.registerForm.value.lastName, username: this.registerForm.value.username, password: this.registerForm.value.password, types: this.registerForm.value.type, age: this.registerForm.value.age, email: this.registerForm.value.email, address: this.registerForm.value.address, tumbon: this.registerForm.value.tumbon, aumpher: this.registerForm.value.aumpher, city: this.registerForm.value.province, post: this.registerForm.value.post }
    this.http.patch<any>('http://localhost:4001/getdata/', obj).subscribe((res) => {

      this.allowAlertEdit = true
      setTimeout(() => {
        this.allowAlertEdit = false
      }, 5000);
      this.onGetTable()
      this.OnClear()
    })
    // }

  }

  OnclearHide() {
    this.registerForm.controls['username'].enable()
    this.registerForm.controls['firstName'].enable()
    this.registerForm.controls["lastName"].enable()
    this.registerForm.controls['password'].enable()
    this.registerForm.controls['confirmPassword'].enable()
    this.registerForm.controls['type'].enable()
    this.registerForm.controls["email"].enable()
    this.registerForm.controls['age'].enable()
    this.registerForm.controls['address'].enable()
    this.registerForm.controls['aumpher'].enable()
    this.registerForm.controls['tumbon'].enable()
    this.registerForm.controls['province'].enable()
    this.registerForm.controls['post'].enable()
    this.disableAll = false
    this.OnClear()
  }
  onSetData(event, _id: string) {
    if (event.target.checked) {
      this.arrayDeleteCheck = event.target.value
      this.dataDelete.push(this.arrayDeleteCheck)
      if (event.target.value === _id) {
        this.disableButtonDelete = true
        this.disableButtonEdit = false
      }
    } else {
      var array = this.dataDelete
      var index = array.indexOf(event.target.value)
      if (index !== -1) {
        array.splice(index, 1)
        this.dataDelete = array
      }
    }
    console.log(this.arrayDeleteCheck)
  }
  onClickDelete() {
    var r = confirm("กดokเพื่อลบข้อมูล");

    if (r == true) {
      if (this.arrayDeleteCheck !== "" && this.dataDelete.length > 0) {
        this.allowAlertDelete = true
        setTimeout(() => {
          this.allowAlertDelete = false
        }, 5000);
        this.http.post('http://localhost:4001/deletedata', this.dataDelete).subscribe((res) => {
          this.onGetTable()
          this.OnClear()
        })
      }
      if (this.arrayDeleteCheck == "" || this.dataDelete.length === 0) {
        alert("กรุณาเลือกข้อมูลที่จะลบ")
      }
    }

  }
  lenghtData: Number
  onGetTable() {
    this.http.get<any>("http://localhost:4001/getdata").subscribe(result => {
      this.data = result.data
      this.checkData = true;
      this.showSpinner()
      this.sortedCollection = this.orderPipe.transform(this.data, '');
      this.lenghtData = this.sortedCollection.length
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
        number: this.lenghtData,
      }]
      // console.log(this.sortedCollection);
    })
  }

  tableClick(name: string, surname: string, username: string, password: string, status: string, age: string, email: string, address: string, aumpher: string, tumbon: string, city: string, post: string, i: number, event) {
    this.registerForm.get('firstName').setValue(name);
    this.registerForm.get('lastName').setValue(surname);
    this.registerForm.get('username').setValue(username);
    this.registerForm.get('password').setValue(password)
    this.registerForm.get('confirmPassword').setValue(password)
    this.registerForm.get('type').setValue(status)
    // console.log(this.registerForm.value.type)
    this.registerForm.get('email').setValue(email)
    this.registerForm.get('age').setValue(age)
    this.registerForm.get('address').setValue(address)
    this.registerForm.get('aumpher').setValue(tumbon)
    this.registerForm.get('tumbon').setValue(aumpher)
    this.registerForm.get('province').setValue(city)
    this.registerForm.get('post').setValue(post)
    this.disableSelectbox = false
    this.disableAll = false
    this.bfunc()
    this.registerForm.controls['username'].enable()
    this.registerForm.controls['firstName'].enable()
    this.registerForm.controls["lastName"].enable()
    this.registerForm.controls['password'].enable()
    this.registerForm.controls['confirmPassword'].enable()
    this.registerForm.controls['type'].enable()
    this.registerForm.controls["email"].enable()
    this.registerForm.controls['age'].enable()
    this.registerForm.controls['address'].enable()
    this.registerForm.controls['aumpher'].enable()
    this.registerForm.controls['tumbon'].enable()
    this.registerForm.controls['province'].enable()
    this.registerForm.controls['post'].enable()
    var element = <HTMLInputElement>document.getElementById("ipUsername");
    element.disabled = true;
    console.log(this.registerForm.value)

  }
  disableAll = false

  tableClickDisable(name: string, surname: string, username: string, password: string, status: string, age: string, email: string, address: string, aumpher: string, tumbon: string, city: string, post: string, i: number, event) {
    this.registerForm.get('firstName').setValue(name);
    this.registerForm.get('lastName').setValue(surname);
    this.registerForm.get('username').setValue(username);
    this.registerForm.get('password').setValue(password)
    this.registerForm.get('confirmPassword').setValue(password)
    this.registerForm.get('type').setValue(status)
    this.registerForm.get('email').setValue(email)
    this.registerForm.get('age').setValue(age)
    this.registerForm.get('address').setValue(address)
    this.registerForm.get('aumpher').setValue(tumbon)
    this.registerForm.get('tumbon').setValue(aumpher)
    this.registerForm.get('province').setValue(city)
    this.registerForm.get('post').setValue(post)
    this.disableSelectbox = false
    this.bfunc()
    this.registerForm.controls['username'].disable()
    this.registerForm.controls['firstName'].disable()
    this.registerForm.controls["lastName"].disable()
    this.registerForm.controls['password'].disable()
    this.registerForm.controls['confirmPassword'].disable()
    this.registerForm.controls['type'].disable()
    this.registerForm.controls["email"].disable()
    this.registerForm.controls['age'].disable()
    this.registerForm.controls['address'].disable()
    this.registerForm.controls['aumpher'].disable()
    this.registerForm.controls['tumbon'].disable()
    this.registerForm.controls['province'].disable()
    this.registerForm.controls['post'].disable()
  }


  OnClear() {
    console.log("clear")
    this.disableSelectbox = false
    this.submitted = false
    this.registerForm.get('firstName').setValue('');
    this.registerForm.get('lastName').setValue("");
    this.registerForm.get('username').setValue("");
    this.registerForm.get('password').setValue("")
    this.registerForm.get('confirmPassword').setValue("")
    this.registerForm.get('type').setValue("นิสิต")
    this.registerForm.get('email').setValue("")
    this.registerForm.get('age').setValue("")
    this.registerForm.get('address').setValue("")
    this.registerForm.get('aumpher').setValue("เลือก")
    this.registerForm.get('tumbon').setValue("เลือก")
    this.registerForm.get('province').setValue("เลือก")
    this.registerForm.get('post').setValue("")
    this.onGetTable()
    this.dataDelete = []
    this.registerForm.controls['username'].enable()

  }


  notText(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57))
      return false;
    return true;
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
      this.router.navigate(["/เจ้าหน้าที่/จัดการผู้ใช้งาน"])

    } else {
      this.router.navigate(["/หน้าหลัก"])
    }
  }

  checkLogin() {
    if (this.getLogin !== "true") {
      this.router.navigate(["/"])
    } else {
      this.router.navigate(["/หน้าหลัก"])
    }
  }

  isNotNumber(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 33 || charCode > 64 && charCode < 91 || charCode > 96 && charCode < 123 || charCode > 126))
      return true;
    return false;
  }
  isKeypressUsername(event) {
    var charCode = (event.which) ? event.which : event.keyCode
    if (charCode > 47 && charCode < 58 || charCode > 64 && charCode < 91 || charCode > 96 && charCode < 123)
      return true
    return false
  }

  bfunc() {
    if (this.registerForm.value.province) {
      for (let item of this.cityOption) {
        if (this.registerForm.value.province === item.province_name_eng) {
          this.IDCity = item.province_id
        }
      }
      if (this.ArrayAmphures != [] || this.ArrayDistricts != [] || this.ArrayZipcode != []) {
        this.ArrayAmphures = []
        this.ArrayDistricts = []
        this.ArrayZipcode = []
      }

      if (this.IDCity) {
        for (let item of this.amphuresOption) {
          if (item.province_id == this.IDCity) {
            this.ArrayAmphures.push(item.amphur_name_eng)
          }
        }
      }
    }

    if (this.registerForm.value.aumpher) {
      for (let item of this.amphuresOption) {
        if (this.registerForm.value.aumpher == item.amphur_name_eng) {
          this.districtsID = item.amphur_id
          for (let item of this.districtsOption) {
            if (this.districtsID == item.amphur_id) {
              this.ArrayDistricts.push(item.district_name_eng)
            }
          }
        }
      }
    }

    if (this.registerForm.value.tumbon) {
      for (let item of this.districtsOption) {
        if (this.registerForm.value.tumbon == item.district_name_eng && this.districtsID == item.amphur_id) {
          this.zipCodeID = item.district_code
          for (let item of this.zipcodeOption) {
            if (this.zipCodeID == item.district_code) {
              this.ArrayZipcode.push(item.zipcode_name)
              this.registerForm.get('post').setValue(this.ArrayZipcode)

            }
          }
        }
      }
    }
  }
  disableButtonCreate = true
  disableButtonDelete = true
  disableTable = true

  showButtonAdd() {
    this.checkForm = true
    if (this.checkForm = true) {
      this.disableButtonAdd = true
      this.disableButtonEdit = false
      this.disableButtonDelete = false
      this.disableTable = false
      this.disableButtonCreate = false
      this.registerForm.get('firstName').setValue('');
      this.registerForm.get('lastName').setValue("");
      this.registerForm.get('username').setValue("");
      this.registerForm.get('password').setValue("")
      this.registerForm.get('confirmPassword').setValue("")
      this.registerForm.get('type').setValue("นิสิต")
      this.registerForm.get('email').setValue("")
      this.registerForm.get('age').setValue("")
      this.registerForm.get('address').setValue("")
      this.registerForm.get('post').setValue("")
      this.ArrayAmphures = ["เลือก"]
      this.ArrayDistricts = ["เลือก"]
      this.ArrayZipcode = [""]
      console.log(this.registerForm.value.aumpher)
    }
  }

  arrayBuffer: any;
  arrayTest: any
  file: File;
  arrayName = []
  arraySurname = []
  arrayId = []
  arrayStatus = []
  arrayEmail = []
  incomingfile(event) {
    this.file = event.target.files[0];
  }
  Upload() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var test = XLSX.utils.sheet_to_json(worksheet, { raw: true })
      this.arrayTest = test

      // console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      this.setDataExcel()
    }
    fileReader.readAsArrayBuffer(this.file);
  }
  obj
  total = []
  testexcel() {
    var obj = this.total

    this.http.post<any>('http://localhost:4001/excel', obj).subscribe((res) => {
      console.log(obj)
    })
    this.onGetTable()
  }
  setDataExcel() {
    for (let item of this.arrayTest) {
      var splitted = item.ชื่อ.split(" ");
      this.arrayName.push(splitted[1])
      this.arraySurname.push(splitted[2])
      this.arrayId.push(item.รหัส)
      this.arrayStatus.push(item.status)
      this.arrayEmail.push(item.รหัส + "@go.buu.ac.th")
    }

    var array = this.arrayTest
    this.obj
    for (var i = 0; i < array.length; i++) {
      this.obj = { name: this.arrayName[i], surname: this.arraySurname[i], username: this.arrayId[i], password: this.arrayId[i], types: this.arrayStatus[i], email: this.arrayId[i] + "@go.buu.ac.th" }
      this.total.push(this.obj)
      // console.log(this.total)
    }
    // this.obj = [{ name: this.arrayName, surname: this.arraySurname, username: this.arrayId, password: this.arrayId, types: this.arrayStatus, email: this.arrayEmail }]
    // console.log(this.obj)
    // var total = []
    // for (let item of this.obj) {
    //   total = [
    //     { name: item.username + item.surname },
    //   ]
    // }
    // console.log(total)

  }
  dataOtShow = 5

  otShow = []
  order: string
  reverse: boolean = false;
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

}