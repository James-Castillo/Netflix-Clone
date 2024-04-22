import { Component, NgZone, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {

  constructor(private router: Router, private ngZone: NgZone, private _authService: AuthService) {}

  ngAfterViewInit(): void {
    const googleBtn = document.getElementById("google-btn");
    if (!googleBtn) {
      console.error("Element with ID 'google-btn' not found.");
      return;
    }

    google.accounts.id.initialize({
      client_id: '29484926712-o2ddub4s3vuefasnhu1cpnqj080g7i11.apps.googleusercontent.com',
      callback: (resp: any) => this.handleLogin(resp)
    });

    try {
      google.accounts.id.renderButton(googleBtn, {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: 350
      });
    } catch (error) {
      console.error("Error rendering Google login button:", error);
    }
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]))
  }

  handleLogin(response: any) {
    if (response) {
      // decode the token
      const payload = this.decodeToken(response.credential);
      // store in the session
      sessionStorage.setItem("loggedInUser", JSON.stringify(payload));
      // navigate to home/browser
      this.ngZone.run(() => {
        this.router.navigate(['browse']);
      });
    }
  }
}