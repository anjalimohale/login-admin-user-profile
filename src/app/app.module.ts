import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';  
import { FormsModule } from '@angular/forms'; 
import { RouterModule, Routes } from '@angular/router';
import {ToastrModule} from 'ngx-toastr';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { AddDialogComponent } from './admin-profile/add-dialog/add-dialog.component';
import { EditDialogComponent } from './admin-profile/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './admin-profile/delete-dialog/delete-dialog.component';
import { ViewDialogComponent } from './admin-profile/view-dialog/view-dialog.component';
import { ChangePwdComponent } from './change-pwd/change-pwd.component';

import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import {CdkTableModule } from '@angular/cdk/table';
import { StarterContentComponent } from './starter-content/starter-content.component';
import { StarterControlSidebarComponent } from './starter-control-sidebar/starter-control-sidebar.component';
import { StarterHeaderComponent } from './starter-header/starter-header.component';
import { StarterLeftSideComponent } from './starter-left-side/starter-left-side.component';
import { StarterFooterComponent } from './starter-footer/starter-footer.component';
import { BreadcrumbService } from './breadcrumb.service';
// import { BreadcrumbModule,MenuModule } from 'primeng/primeng';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

const appRoutes: Routes = ([
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'starter-content', component: StarterContentComponent },
  { path: 'profile-details', component: ProfileDetailsComponent,  canActivate: [AuthGuardService] }, 
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'admin-profile', component: AdminProfileComponent, canActivate: [AuthGuardService] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
]);

@NgModule({
  declarations: [
    AppComponent,ProfileComponent,
    LoginComponent,AdminProfileComponent,
    RegisterComponent,ForgotPasswordComponent,
    ResetPasswordComponent,ProfileDetailsComponent,
    AddDialogComponent,
    EditDialogComponent,DeleteDialogComponent,
    ViewDialogComponent,ChangePwdComponent,
    StarterContentComponent, StarterControlSidebarComponent,
    StarterFooterComponent,StarterHeaderComponent,
    StarterLeftSideComponent
    
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot(),ToastrModule, HttpClientModule,
    ReactiveFormsModule, FormsModule, MatSelectModule,
    BrowserAnimationsModule, MatToolbarModule,MatSortModule,
    NoopAnimationsModule, MatInputModule, MatButtonModule,
    MatCardModule, MatDialogModule, MatProgressSpinnerModule,
    MatGridListModule, MatTableModule, MatPaginatorModule,
    CdkTableModule,NgMultiSelectDropDownModule.forRoot(),
  ],
  exports:[RouterModule],
  entryComponents:[AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    ViewDialogComponent,
    ChangePwdComponent],
  providers: [AuthenticationService, AuthGuardService,BreadcrumbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
