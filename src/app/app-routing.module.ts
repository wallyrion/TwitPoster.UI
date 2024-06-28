import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TwitpostsComponent } from './components/twitposts/twitposts.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';

const routes: Routes = [
  { path: '', component: TwitpostsComponent },
  { path: 'auth-callback', component: AuthCallbackComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
