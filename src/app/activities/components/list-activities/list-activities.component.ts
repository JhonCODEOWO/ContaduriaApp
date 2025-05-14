import { Component, computed, inject, input, output } from '@angular/core';
import { Activity } from '../../interfaces/activity.interface';
import { DatePipe } from '@angular/common';
import { CheckDateAvailablePipe } from '../../../common/pipes/check-date-available.pipe';
import { AuthService } from '../../../auth/services/auth.service';
import { RouterLink } from '@angular/router';
import { ActivitiesService } from '../../activities.service';
import { AlertErrorComponent } from '../../../common/components/alert-error/alert-error.component';

@Component({
  selector: 'list-activities',
  imports: [DatePipe, CheckDateAvailablePipe, RouterLink, AlertErrorComponent],
  templateUrl: './list-activities.component.html',
})
export class ListActivitiesComponent {
  activitiesService = inject(ActivitiesService);

  activities = input.required<Activity[]>();
  isAdmin = inject(AuthService).isAdmin;
  deleted = output<string>();
  error = output();

  onDelete(id: string){
    this.activitiesService.delete(id).subscribe({
      next: result => (result)? this.deleted.emit(id): '',
      error: error => this.error.emit(error)
    });
  }
}
