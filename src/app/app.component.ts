import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {LightPageComponent} from "./components/light-page/light-page.component";
import {NgClass} from "@angular/common";
import {environment} from "../environment/environment";
import {OidcSecurityService} from "angular-auth-oidc-client";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, LightPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'CycloPAT';
  protected readonly environment = environment;

  constructor(private oidcSecurityService: OidcSecurityService) {
  }

  ngOnInit() {
    // @ts-ignore
    this.oidcSecurityService.checkAuth().subscribe(({isAuthenticated, userData}) => {
        console.log(isAuthenticated);
        console.log(userData);
        if (isAuthenticated) {
          console.log("User is authenticated");
          console.log("User data: ", userData);
        } else {
          console.log("User is not authenticated");
          this.login()
        }
      }
    );
  }


  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff().subscribe((result: any) => console.log(result));
  }
}
