import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  goToGithub() {
    window.open('https://github.com/junimohano', '_blank');
  }
  goToPortfolio() {
    window.open('http://junan.ca', '_blank');
    // window.location.href = 'http://junan.ca';
  }

}
