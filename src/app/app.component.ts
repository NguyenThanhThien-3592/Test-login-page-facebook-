import { Component } from '@angular/core';
declare const FB: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'login-page';
  pages: any = [];
  ngOnInit() {
    console.log('hello');
    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '916323669463786',
        cookie: true,
        xfbml: true,
        version: 'v17.0',
      });

      FB.getLoginStatus((response: any) => {
        statusChangeCallback(response);
      });

      FB.AppEvents.logPageView();
    };

    function statusChangeCallback(response: any) {
      console.log('statusChangeCallback');
      console.log(response);
      // The response object is returned with a status field that lets the
      // app know the current login status of the person.
      // Full docs on the response object can be found in the documentation
      // for FB.getLoginStatus().
      if (response.status === 'connected') {
        // Logged into your app and Facebook.
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function (response: any) {
          console.log('Successful login for: ' + response.name);
          document.getElementById('status')!.innerHTML =
            'Thanks for logging in, ' + response.name + '!';
        });

        FB.api('/me/accounts', function (response: any) {
          if (response && !response.error) {
            console.log('page: ', response); // Danh sách các trang của người dùng
          }
        });
      } else {
        // The person is not logged into your app or we are unable to tell.
        document.getElementById('status')!.innerHTML =
          'Please log ' + 'into this app.';
      }
    }

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

  loginToPage(pageId: string) {
    FB.login(
      (response: any) => {
        if (response.status === 'connected') {
          console.log('Đăng nhập thành công vào trang: ' + pageId);
          // Thực hiện các xử lý khác sau khi đăng nhập vào trang
        }
      },
      {
        scope: 'public_profile,email',
        auth_type: 'rerequest',
        return_scopes: true,
      }
    );
  }
}
