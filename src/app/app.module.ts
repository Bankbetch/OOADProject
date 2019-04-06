import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AdminComponent } from './admin/admin.component';
import { Routes, RouterModule } from '@angular/router';
import { SettingUserComponent } from './setting-user/setting-user.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from '../app/setting-user/FilterPipe.component';
import { ManageExamComponent } from './manage-exam/manage-exam.component';
import { AddSubjectComponent } from './manage-exam/add-subject/add-subject.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ManageBuildComponent } from './manage-build/manage-build.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OrderModule } from 'ngx-order-pipe';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
const router: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'หน้าหลัก', component: MainComponent },
  { path: 'เจ้าหน้าที่', component: AdminComponent },
  { path: 'เจ้าหน้าที่/จัดการผู้ใช้งาน', component: SettingUserComponent },
  { path: 'เจ้าหน้าที่/จัดการวิชา', component: ManageExamComponent },
  { path: 'เจ้าหน้าที่/จัดการรายวิชาสอน/เพิ่มรายวิชาสอน', component: AddSubjectComponent },
  { path: 'เจ้าหน้าที่/จัดการตึก', component: ManageBuildComponent },
  { path: '**', redirectTo: '/login' }
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AdminComponent,
    SettingUserComponent,
    LoginComponent,
    FilterPipe,
    ManageExamComponent,
    AddSubjectComponent,
    ManageBuildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(router, { enableTracing: false }),
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    OrderModule,
    NgMultiSelectDropDownModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
