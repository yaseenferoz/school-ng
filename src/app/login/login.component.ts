import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  constructor(private authService: AuthService, private router: Router) {}
  errorMessage:any;

login() {
  this.authService.login(this.username, this.password).subscribe(
    (data: any) => {
      console.log('Login successful');
      // Redirect to welcome page
      this.router.navigate(['/welcome']); // Replace 'welcome' with the appropriate route
    },
    (error) => {
      console.error('Login failed:', error);
      if (error?.error?.message) {
        this.errorMessage = error.error.message;
      } else {
        this.errorMessage = 'An error occurred during login.';
      }
    }
  );
}

  
}
