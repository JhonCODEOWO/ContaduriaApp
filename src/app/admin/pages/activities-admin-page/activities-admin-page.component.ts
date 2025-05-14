import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivitiesService } from '../../../activities/activities.service';
import { ListActivitiesComponent } from "../../../activities/components/list-activities/list-activities.component";
import { Activity } from '../../../activities/interfaces/activity.interface';
import { ActivityResponse } from '../../../activities/interfaces/activity-response.interface';
import { TitleComponent } from "../../../common/components/title/title.component";
import { CreateBtnComponent } from "../../../common/components/crud/create-btn/create-btn.component";
import { ObjectUtils } from '../../../utils/object-utils';

@Component({
  selector: 'activities-admin-page',
  imports: [ListActivitiesComponent, TitleComponent, CreateBtnComponent],
  templateUrl: './activities-admin-page.component.html',
})
export class ActivitiesAdminPageComponent implements OnInit{
  activitiesService = inject(ActivitiesService);
  responseActivity = signal<ActivityResponse | null>(null);
  error = signal<null | any>(null);

  ngOnInit(): void {
      this.activitiesService.getActivities().subscribe(response => {
        this.responseActivity.set(response);
      });
  }

  handleDeleted(id: string) {
    if(this.responseActivity()){
      this.responseActivity.update(actualData => (actualData)? ({...actualData, data: actualData?.data.filter(element => element.id != id) }): actualData);
    }
  }

  handleError(error: any) {
    this.error.set(error);
    setTimeout(() => {
      this.error.set(null);
    }, 3000)
  }
}
