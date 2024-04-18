import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'forbidden',component:ForbiddenComponent},
  {path:'admin',component:AdminComponent, canActivate:[AuthGuard], data:{roles:['Admin']}},
  {path:'user',component:UserComponent,  canActivate:[AuthGuard], data:{roles:['User']} },
  {path:'login',component:LoginComponent},
  {path:'course',component:CourseManagementComponent, canActivate:[AuthGuard], data:{roles:['Admin']}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
