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


  login() {
    this.authService.login(this.username, this.password).subscribe(
      () => {
        console.log('Login successful');
        // Redirect to welcome page
        this.router.navigate(['/welcome']); // Replace 'welcome' with the appropriate route
      },
      error => {
        console.error('Login failed:', error);
        // Handle login error (e.g., display error message)
      }
    );
    return false; // Prevent default form submission
  }
  
}
