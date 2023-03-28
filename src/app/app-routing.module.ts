import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./routes/login/login.component";
import {PostsComponent} from "./routes/posts/posts.component";
import {PostComponent} from './routes/post/post.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'posts', component: PostsComponent},
  {path: 'posts/:id', component: PostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
