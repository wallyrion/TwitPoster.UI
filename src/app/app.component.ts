import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'twitposter';

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {  }

  ngOnInit(): void {
    this.matIconRegistry.addSvgIcon(
        'thumb-up',
        this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/thumb-up.svg')
    );

    this.matIconRegistry.addSvgIcon(
        'thumbed-up',
        this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/thumbed-up.svg')
    );
  }
}
