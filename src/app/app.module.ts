import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostComponent } from './components/post/post.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { PostCommentComponent } from './components/post-comment/post-comment.component';
import { TwitpostsComponent } from './components/twitposts/twitposts.component';
import { NgOptimizedImage } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { PostCommentsComponent } from './components/post-comments/post-comments.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { InfiniteScrollModule } from "ngx-infinite-scroll";

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostCommentComponent,
    TwitpostsComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    PostCommentsComponent,
    NotFoundComponent,
  ],
  imports: [
    MatButtonModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    FormsModule,
    MatIconModule,
    MatBottomSheetModule,
    NgOptimizedImage,
    HttpClientModule,
    MatToolbarModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
