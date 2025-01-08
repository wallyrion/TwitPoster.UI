import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatAnchor } from '@angular/material/button';

@Component({
    selector: 'app-about',
    imports: [RouterOutlet, MatAnchor, RouterLink],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss'
})
export class AboutComponent {}
