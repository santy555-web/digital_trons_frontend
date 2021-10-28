import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllScheduleComponent } from './all-schedule/all-schedule.component';
import { AuthGuard } from './auth';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'all_schedule', canActivate: [AuthGuard], component: AllScheduleComponent },
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
