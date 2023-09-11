import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TwitpostsComponent } from './components/twitposts/twitposts.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/twitposts', pathMatch: 'full' },
  { path: 'twitposts', component: TwitpostsComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
