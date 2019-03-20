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
  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router, private titleService: Title) {
    this.titleService.setTitle("จัดการผู้ใช้งาน");
  }

  public ngOnInit() {
    this.onGetTable(),
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


  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    var r = confirm("กดokเพื่อเพิ่มข้อมูล");
    if (r == true) {
      this.allowAlertAdd = true
      setTimeout(() => {
        this.allowAlertAdd = false
      }, 5000);
      var obj = { name: this.registerForm.value.firstName, surname: this.registerForm.value.lastName, username: this.registerForm.value.username, password: this.registerForm.value.password, types: this.registerForm.value.type, age: this.registerForm.value.age, email: this.registerForm.value.email, address: this.registerForm.value.address, tumbon: this.registerForm.value.tumbon, aumpher: this.registerForm.value.aumpher, city: this.registerForm.value.province, post: this.registerForm.value.post }
      this.http.post<any>('http://localhost:4001/settinguser', obj).subscribe((res) => {
        this.onGetTable()
        this.OnClear()
      })
    }
  }

  onClickEdit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    var r = confirm("กดokเพื่อแกไขข้อมูล");
    if (r == true) {
      this.allowAlertEdit = true
      setTimeout(() => {
        this.allowAlertEdit = false
      }, 5000);
      var obj = { name: this.registerForm.value.firstName, surname: this.registerForm.value.lastName, username: this.registerForm.value.username, password: this.registerForm.value.password, types: this.registerForm.value.type, age: this.registerForm.value.age, email: this.registerForm.value.email, address: this.registerForm.value.address, tumbon: this.registerForm.value.tumbon, aumpher: this.registerForm.value.aumpher, city: this.registerForm.value.province, post: this.registerForm.value.post }
      console.log(this.registerForm.value.type)
      this.http.patch<any>('http://localhost:4001/getdata/', obj).subscribe((res) => {
        console.log("test2")
        this.disableButtonAdd = false
        this.onGetTable()
        this.OnClear()
      })
    }

  }




  onSetData(event, username: string) {
    if (event.target.checked) {
      this.arrayDeleteCheck = event.target.value
      this.dataDelete.push(this.arrayDeleteCheck)
      console.log(event.target.value)
      console.log(username)
      if (event.target.value === username) {
        this.disableButtonDelete = true
      }
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
        this.allowAlertDelete = true
        setTimeout(() => {
          this.allowAlertDelete = false
        }, 5000);
        this.http.post('http://localhost:4001/deletedata/', this.dataDelete).subscribe((res) => {
          this.onGetTable()
          this.OnClear()
        })
      }
      if (this.arrayDeleteCheck == "" || this.dataDelete.length === 0) {
        alert("กรุณาเลือกข้อมูลที่จะลบ")
      }
    }

  }

  onGetTable() {
    this.http.get<any>("http://localhost:4001/getdata").subscribe(result => {
      this.data = result.data
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
    this.bfunc()
    this.registerForm.controls['username'].disable()
    this.checkForm = true
    this.disableButtonEdit = true
    this.disableButtonCreate = true
    this.disableButtonDelete = false
  }

  OnClear() {
    this.disableSelectbox = false
    this.disableButtonAdd = false
    this.disableButtonEdit = false
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
    this.checkForm = false
    this.disableButtonCreate = true
    this.disableTable = true
    this.disableButtonDelete = false
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
      console.log(this.disableButtonCreate)
    }
  }
}