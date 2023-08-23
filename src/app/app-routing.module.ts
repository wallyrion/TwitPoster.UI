import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TwitpostsComponent} from "./components/twitposts/twitposts.component";

const routes: Routes = [
  { path: '', redirectTo: '/twitposts', pathMatch: 'full' },
  { path: 'twitposts', component: TwitpostsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
