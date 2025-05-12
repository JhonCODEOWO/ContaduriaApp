import { Component, input } from '@angular/core';
import { Activity } from '../../interfaces/activity.interface';
import { DatePipe } from '@angular/common';
import { CheckDateAvailablePipe } from '../../../common/pipes/check-date-available.pipe';

@Component({
  selector: 'list-activities',
  imports: [DatePipe, CheckDateAvailablePipe],
  templateUrl: './list-activities.component.html',
})
export class ListActivitiesComponent {
  activities = input.required<Activity[]>();
}
