import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorJsComponent } from './editor-js/editor-js.component';
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './routes/login/login.component';
import {FormsModule} from "@angular/forms";
import { PostsComponent } from './routes/posts/posts.component';
import { PostComponent } from './routes/post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorJsComponent,
    LoginComponent,
    PostsComponent,
    PostComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
