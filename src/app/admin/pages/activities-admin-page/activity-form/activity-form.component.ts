import { Component, inject, OnInit, output, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';
import { ClientsService } from '../../../../clients/services/clients.service';
import { UsersService } from '../../../../users/services/user.service';
import { TextareaInputComponent } from '../../../../common/components/forms/textarea-input/textarea-input.component';
import { SelectData } from '../../../../common/components/select/interfaces/select-data.interface';
import { SelectComponent } from '../../../../common/components/select/select.component';
import { isUUIDValidator } from '../../../../common/validators/uuid.validator';
import { DateTimeLocalComponent } from '../../../../common/components/date-time-local/date-time-local.component';
import { isValidDate } from '../../../../common/validators/date-valid.validator';
import { LoaderComponent } from '../../../../common/components/loader/loader.component';
import { TitleComponent } from '../../../../common/components/title/title.component';
import { ActivitiesService } from '../../../../activities/activities.service';
import { Activity } from '../../../../activities/interfaces/activity.interface';
import { DateUtils } from '../../../../utils/date-utils';
import { Location } from '@angular/common';

@Component({
  selector: 'app-activity-form',
  imports: [
    ReactiveFormsModule,
    TextareaInputComponent,
    SelectComponent,
    DateTimeLocalComponent,
    LoaderComponent,
    TitleComponent,
  ],
  templateUrl: './activity-form.component.html',
})
export class ActivityFormComponent implements OnInit {
  clientsService = inject(ClientsService);
  usersService = inject(UsersService);
  activityService = inject(ActivitiesService);
  location = inject(Location);

  error = output(); //Emit errors to main component
  loading = signal(false); //Manage state of requests

  activityID = toSignal(
    inject(ActivatedRoute).paramMap.pipe(map((data) => data.get('id')))
  ); //Get id from the url
  clients = signal<SelectData[] | null>(null); //Data to show in the form select
  users = signal<SelectData[] | null>(null);

  fb = inject(FormBuilder);

  activityForm = this.fb.group({
    client: ['', [Validators.required, isUUIDValidator]],
    appliesTo: ['', [Validators.required, isUUIDValidator]],
    details: ['', [Validators.required, Validators.maxLength(1000)]],
    limitDate: ['', [Validators.required, isValidDate]],
  });

  ngOnInit(): void {
    this.usersService
      .getUsers({exclude_pagination: true})
      .pipe(
        map(
          (data): SelectData[] =>
            data?.data.map((user) => ({
              id: user.id,
              optionText: user.name,
            })) ?? []
        )
      )
      .subscribe((data) => this.users.set(data));

    if (this.activityID() === 'new') return;
    console.log('No es new');

    this.activityService.get(this.activityID() ?? '').subscribe({
      next: (activity) => this.loadForm(activity),
      error: (req_error) => {
        this.error.emit(req_error);
        this.location.back();
      },
    });
  }

  loadForm(activity: Activity) {
    this.activityForm.reset({
      appliesTo: activity.appliesTo.id,
      client: activity.client.id,
      details: activity.details,
      limitDate: DateUtils.toDateLocal(activity.limitDate),
    });
  }

  async onSubmit() {
    this.activityForm.markAllAsTouched();
    if (this.activityForm.invalid) return;

    const data: Partial<Activity> = {
      ...(this.activityForm.value as any),
    };

    if (this.activityID() === 'new') {
      this.activityService
        .create(data)
        .subscribe((activity) => console.log(activity));
    } else {
      const updated = await firstValueFrom(
        this.activityService.update(this.activityID() ?? '', data)
      );
      console.log(updated);
    }
  }

  handleValueSelected(value: string) {
    // this.loading.set(true);
    this.clientsService
      .getClientsAssignedToUser(value)
      .pipe(
        map((data): SelectData[] =>
          data.clientAssigned.map((clientRelatedResponse) => ({
            id: clientRelatedResponse.client.id ?? '',
            optionText: clientRelatedResponse.client.fullName,
          }))
        )
      )
      .subscribe({
        next: (data) => {
          this.loading.set(false);
          this.clients.set(data);
        }
      });
  }
}
