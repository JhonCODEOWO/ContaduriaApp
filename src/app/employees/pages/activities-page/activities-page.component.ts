import { Component, inject, OnInit, signal } from '@angular/core';
import { AppComponent } from "../../../app.component";
import { TitleComponent } from "../../../common/components/title/title.component";
import { ActivityResponse } from '../../../activities/interfaces/activity-response.interface';
import { ActivitiesService } from '../../../activities/activities.service';
import { AuthService } from '../../../auth/services/auth.service';
import { ListActivitiesComponent } from '../../../activities/components/list-activities/list-activities.component';
import { CollapseComponent } from "../../../common/components/collapse/collapse.component";

@Component({
  selector: 'app-activities-page',
  imports: [TitleComponent, ListActivitiesComponent, CollapseComponent],
  templateUrl: './activities-page.component.html',
})
export class ActivitiesPageComponent implements OnInit{
  activities = signal<ActivityResponse | null>(null);

  activityService = inject(ActivitiesService);
  userID = inject(AuthService).getUserLogged?.id ?? '';

  ngOnInit(): void {
      this.activityService.getActivities(this.userID).subscribe({
        next: (activities) => this.activities.set(activities),
        error: (error) => console.log(error),
      })
  }
}
