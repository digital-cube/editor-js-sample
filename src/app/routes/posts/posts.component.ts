import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  ngOnInit() {
    this.http.get('/api/wiki/posts', {
      headers: {
        Authorization: 'Bearer' + ' ' + localStorage.getItem('jwt')
      }
    }).subscribe({
      next: res => {
        console.log('res', res);
        this.posts = res['data'];
      }
    })
  }

  onCreatePost() {
    this.http.post('/api/wiki/posts', {}, {
      headers: {
        Authorization: 'Bearer' + ' ' + localStorage.getItem('jwt')
      }
    }).subscribe({
      next: res => {
        console.log('res', res);
        this.router.navigate([`posts/${res['id']}`])
      }
    })
  }
}
