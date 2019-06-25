import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import { PeopleDetailComponent } from './people-detail/people-detail.component';
import { PeopleListComponent } from './people-list/people-list.component';

const routes: Routes = [
  {
    path: "people",
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "list"
      },
      {
        path: "list",
        component: PeopleListComponent
      },
      {
        path: ":filter",
        component: PeopleListComponent
      },
      {
        path: ":personID/detail",
        component: PeopleDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,   {
      // Tell the router to use the hash instead of HTML5 pushstate.
      useHash: false,

      // Enable the Angular 6+ router features for scrolling and anchors.
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
      enableTracing: false
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
