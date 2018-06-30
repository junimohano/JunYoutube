import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  @Output() searchVideo = new EventEmitter<string>();
  @Output() searchPlaylist = new EventEmitter<boolean>();

  searchForm = this.formBuilder.group({
    inputUrl: ['', [Validators.required, Validators.minLength(11)]]
  });

  get inputUrlControl(): AbstractControl {
    return this.searchForm.get('inputUrl');
  }

  readonly exampleUrl = 'https://www.youtube.com/watch?v=ffxKSjUwKdU&list=PLXDm2cr3AfgWNE167nmXmeEI4fIsT2Ee_';
  private readonly searchDebounceTime = 300;

  private get isRouteUrlValid(): boolean {
    return this.router.url !== '/watch' && this.router.url !== '/watch?utm_source=web_app_manifest';
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initUrl();
    this.inputUrlControl.valueChanges
      .pipe(
        filter(() => this.inputUrlControl.valid),
        debounceTime(this.searchDebounceTime)
      )
      .subscribe(url => this.searchClick(url));
  }

  searchClick(url: string = null) {
    this.searchVideo.emit(url ? url : this.inputUrlControl.value);
    this.searchPlaylist.emit(true);
  }

  onClickExampleUrl() {
    this.patchUrl(this.exampleUrl);
  }

  private initUrl() {
    if (this.isRouteUrlValid) {
      const url = 'https://www.youtube.com' + this.router.url;
      this.patchUrl(url);
    }
  }

  private patchUrl(url: string) {
    this.searchForm.patchValue({ inputUrl: url });
  }
}
