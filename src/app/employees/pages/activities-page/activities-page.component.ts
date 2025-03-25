import { Component } from '@angular/core';
import { AppComponent } from "../../../app.component";
import { TitleComponent } from "../../../common/components/title/title.component";

@Component({
  selector: 'app-activities-page',
  imports: [TitleComponent],
  templateUrl: './activities-page.component.html',
})
export class ActivitiesPageComponent { }
