import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
