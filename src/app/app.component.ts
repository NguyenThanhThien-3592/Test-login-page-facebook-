import { Component } from '@angular/core';
import { Router } from '@angular/router';

declare const FB: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'login-page';

  isLogin = false;

  constructor(private router: Router) {}

  ngOnInit() {
    (window as any).fbAsyncInit = () => {
      FB.init({
        appId: '206673099006855',
        cookie: true,
        xfbml: true,
        version: 'v17.0',
      });

      FB.getLoginStatus((response: any) => {
        statusChangeCallback(response);
      });
      FB.AppEvents.logPageView('PageView');
    };

    const statusChangeCallback = (response: any) => {
      console.log('statusChangeCallback');
      console.log(response);
      if (response.status === 'connected') {
        // Logged into your app and Facebook.
        this.isLogin = true;
        console.log('login: ', this.isLogin);
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function (response: any) {
          console.log('Successful login for: ' + response.name);
          document.getElementById('status')!.innerHTML =
            'Thanks for logging in, ' + response.name + '!';
        });
      } else {
        document.getElementById('status')!.innerHTML =
          'Please log ' + 'into this app.';
      }
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0] as HTMLElement;
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode!.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  logout() {
    FB.logout((response: any) => {
      console.log('Đăng xuất thành công');
      this.router.navigate(['/']);
    });
  }
}
