import { Component } from '@angular/core';
declare const FB: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'login-page';
  ngOnInit() {
    console.log('hello');
    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '916323669463786',
        cookie: true,
        xfbml: true,
        version: 'v16.0',
      });
      FB.getLoginStatus((response: any) => {
        statusChangeCallback(response);
      });

      FB.AppEvents.logPageView();
    };

    function statusChangeCallback(response: any) {
      console.log(response);
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
}
