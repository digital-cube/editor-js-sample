import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username;
  password;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  onSubmit() {
    this.http.post('/api/tenants/login', {
      username: this.username,
      password: this.password
    })
      .subscribe({
        next: res => {
          console.log('res', res);
          localStorage.setItem('jwt', res['token']);
          this.router.navigate(['posts']);
        },
        error: err => {
          console.log('err', err);
        }
      })
  }

}
