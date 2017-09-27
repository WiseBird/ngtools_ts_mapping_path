import {Component} from '@angular/core';
import {LibComponent} from 'lib/lib.component';

@Component({
               selector: 'app-root',
               templateUrl: './app.component.html',
               styleUrls: ['./app.component.css']
           })
export class AppComponent extends LibComponent {
    title = 'app component!';
}
