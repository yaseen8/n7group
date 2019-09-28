import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { YourJobsPage } from './pages/your-jobs/your-jobs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing-page',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule'
  },
  { path: 'my-account', loadChildren: './pages/my-account/my-account.module#MyAccountPageModule' },
  { path: 'my-attendence', loadChildren: './pages/my-attendence/my-attendence.module#MyAttendencePageModule' },
  { path: 'messages', loadChildren: './pages/messages/messages.module#MessagesPageModule' },
  { path: 'register/:email', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'get-started', loadChildren: './pages/get-started/get-started.module#GetStartedPageModule' },
  { path: 'sign-in', loadChildren: './pages/sign-in/sign-in.module#SignInPageModule' },
  { path: 'landing-page', loadChildren: './pages/landing-page/landing-page.module#LandingPagePageModule' },
  { path: 'attendence-detail', loadChildren: './pages/my-attendence/attendence-detail/attendence-detail.module#AttendenceDetailPageModule' },
  { path: 'new-jobs', loadChildren: './pages/new-jobs/new-jobs.module#NewJobsPageModule' },
  { path: 'job-detail', loadChildren: './pages/new-jobs/job-detail/job-detail.module#JobDetailPageModule' },
  { path: 'your-jobs',
   component : YourJobsPage,
  children : [
    { path: 'job-history',
     loadChildren: './pages/your-jobs/job-history/job-history.module#JobHistoryPageModule'
    },
    { path: 'job-schedule',
     loadChildren: './pages/your-jobs/job-schedule/job-schedule.module#JobSchedulePageModule'
     },
     {
      path: '',
      redirectTo: 'job-history',
      pathMatch: 'full'
    }
  ]
 },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
