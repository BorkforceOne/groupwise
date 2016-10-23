import { Component, OnInit } from '@angular/core';
import { Routes, Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  isActiveRoute(route: string) {
    return this.router.url == route;
  }
}
