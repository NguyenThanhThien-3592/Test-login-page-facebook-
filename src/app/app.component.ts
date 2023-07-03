import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
declare const FB: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'login-page';
  num = 0;
  numBehaviorSubject = new BehaviorSubject(0);
  pages: any = [];
  pagesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.pages);
  isLogin = false;
  constructor(private router: Router) {}
  increase() {
    this.numBehaviorSubject.next(this.num + 1);
  }
  ngOnInit() {
    this.numBehaviorSubject.subscribe((num) => (this.num = num));

    (window as any).fbAsyncInit = () => {
      FB.init({
        appId: '916323669463786',
        autoLogAppEvents: true,
        cookie: true,
        xfbml: true,
        version: 'v17.0',
      });

      console.log('Init fbAsyncInit');

      FB.getLoginStatus((response: any) => {
        statusChangeCallback(response);
      });
      FB.AppEvents.logPageView();
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

        FB.api('/me/accounts', (response: any) => {
          if (response && !response.error) {
            console.log('page: ', response.data);
            this.pages = response.data;
            this.pagesSubject.next(response.data);
          }
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

    this.pagesSubject.subscribe((response) => {
      this.pages = response;
      console.log('update: pages');
    });
  }

  loginToPage(pageId: string) {
    this.logout();
    FB.login(
      (response: any) => {
        if (response.status === 'connected') {
          console.log('Đăng nhập thành công vào trang: ' + pageId);
        }
      },
      {
        scope: 'public_profile,email',
        auth_type: 'rerequest',
        return_scopes: true,
      }
    );
  }

  logout() {
    FB.logout((response: any) => {
      console.log('Đăng xuất thành công');
      this.router.navigate(['/']);
    });
  }
}
