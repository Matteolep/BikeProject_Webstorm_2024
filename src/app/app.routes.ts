import { Routes } from '@angular/router';
import {LightPageComponent} from "./components/light-page/light-page.component";
import {ConnectPageComponent} from "./components/connect-page/connect-page.component";

export const routes: Routes = [
  {path: "connect", component: ConnectPageComponent},
  {path: "light", component: LightPageComponent},
  {path: "**", redirectTo: "connect"}
];
