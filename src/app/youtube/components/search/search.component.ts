import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {
  @Input() searchData: SearchData;
  @Output() searchVideo = new EventEmitter();
  @Output() searchPlaylist = new EventEmitter();

  searchInput: (event: KeyboardEvent) => void;
  minimumInputLength = 11;
  inputDebounceTime = 300;

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (this.router.url !== '/watch' && this.router.url !== '/watch?utm_source=web_app_manifest') {
      this.searchData.inputUrl = 'https://www.youtube.com' + this.router.url;
    }

    this.inputChanges(this.inputDebounceTime).subscribe(value => {
      if (value.length > this.minimumInputLength) {
        this.searchClick();
      }
    });
  }

  inputChanges(debounce: number): Observable<string> {
    return Observable.create(observer => {
      this.searchInput = (event: KeyboardEvent) => {
        observer.next((<HTMLInputElement>event.target).value);
      };
    }).pipe(distinctUntilChanged(), debounceTime(debounce));
  }

  ngAfterViewInit(): void {
    if (this.searchData.inputUrl !== '') {
      this.searchClick();
    }
  }

  searchClick() {
    this.searchData.index = '';
    this.searchData.nextToken = null;
    this.searchData.firstUrl = this.searchData.inputUrl;

    this.searchVideo.emit(this.searchData.inputUrl);
    this.searchPlaylist.emit(true);
  }
}
