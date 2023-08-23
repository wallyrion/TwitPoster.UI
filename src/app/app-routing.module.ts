import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TwitpostsComponent} from "./components/twitposts/twitposts.component";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  { path: '', redirectTo: '/twitposts', pathMatch: 'full' },
  { path: 'twitposts', component: TwitpostsComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
