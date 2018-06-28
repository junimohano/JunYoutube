import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { SearchData } from '../../models/search-data.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  @Input() searchData: SearchData;

  @Output() searchVideo = new EventEmitter<string>();
  @Output() searchPlaylist = new EventEmitter<boolean>();

  @ViewChild('inputUrl') inputUrl: ElementRef;

  searchInput: (event: KeyboardEvent) => void;
  readonly minimumInputLength = 11;
  readonly exampleUrl = 'https://www.youtube.com/watch?v=ffxKSjUwKdU&list=PLXDm2cr3AfgWNE167nmXmeEI4fIsT2Ee_';
  private readonly inputDebounceTime = 300;

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (this.router.url !== '/watch' && this.router.url !== '/watch?utm_source=web_app_manifest') {
      const url = 'https://www.youtube.com' + this.router.url;
      this.searchClick(url);
    }

    this.inputChanges(this.inputDebounceTime).subscribe(value => {
      if (value.length > this.minimumInputLength) {
        this.searchClick(value);
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

  searchClick(url: string = null) {
    this.searchVideo.emit(url ? url : this.inputUrl.nativeElement.value);
    this.searchPlaylist.emit(true);
  }

  onClickExampleUrl() {
    this.searchClick(this.exampleUrl);
  }
}
