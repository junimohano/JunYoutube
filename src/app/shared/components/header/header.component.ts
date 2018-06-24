import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  goToGithub() {
    this.openNewWindow('https://github.com/junimohano');
  }
  goToPortfolio() {
    this.openNewWindow('http://junan.ca');
  }

  private openNewWindow(url: string): void {
    window.open(url, '_blank');
  }
}
