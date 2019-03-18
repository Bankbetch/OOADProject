import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AdminComponent } from './admin/admin.component';
import { Routes, RouterModule } from '@angular/router';
import { SettingUserComponent } from './setting-user/setting-user.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
const router: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'หน้าหลัก', component: MainComponent },
  { path: 'เจ้าหน้าที่', component: AdminComponent },
  { path: 'เจ้าหน้าที่/จัดการผู้ใช้งาน', component: SettingUserComponent },
  { path: '**', redirectTo: '/login' }
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AdminComponent,
    SettingUserComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(router, { enableTracing: false }),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
