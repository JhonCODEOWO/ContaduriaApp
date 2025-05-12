import { Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';
import { ClientsService } from '../../../../clients/services/clients.service';
import { UsersService } from '../../../../users/services/user.service';
import { Client } from '../../../../clients/interfaces/client.interface';
import { User } from '../../../../users/interfaces/user.interface';
import { TextareaInputComponent } from '../../../../common/components/forms/textarea-input/textarea-input.component';
import { SelectData } from '../../../../common/components/select/interfaces/select-data.interface';
import { SelectComponent } from '../../../../common/components/select/select.component';
import { isUUIDValidator } from '../../../../common/validators/uuid.validator';
import { DateTimeLocalComponent } from "../../../../common/components/date-time-local/date-time-local.component";
import { isValidDate } from '../../../../common/validators/date-valid.validator';
import { LoaderComponent } from '../../../../common/components/loader/loader.component';
import { TitleComponent } from "../../../../common/components/title/title.component";
import { ActivitiesService } from '../../../../activities/activities.service';
import { Activity } from '../../../../activities/interfaces/activity.interface';

@Component({
  selector: 'app-activity-form',
  imports: [ReactiveFormsModule, TextareaInputComponent, SelectComponent, DateTimeLocalComponent, LoaderComponent, TitleComponent],
  templateUrl: './activity-form.component.html',
})
export class ActivityFormComponent implements OnInit {
  clientsService = inject(ClientsService);
  usersService = inject(UsersService);
  activityService = inject(ActivitiesService);

  activityID = toSignal(
    inject(ActivatedRoute).paramMap.pipe(map((data) => data.get('id')))
  );
  clients = signal<SelectData[] | null>(null);
  users = signal<SelectData[] | null>(null);

  fb = inject(FormBuilder);

  activityForm = this.fb.group({
    client: ['', [Validators.required, isUUIDValidator]],
    appliesTo: ['', [Validators.required, isUUIDValidator]],
    details: ['', [Validators.required, Validators.maxLength(1000)]],
    limitDate: ['', [Validators.required, isValidDate]],
  });

  ngOnInit(): void {
    this.clientsService
      .getClients()
      .pipe(
        map((data): SelectData[] =>
          data.map((client) => ({ id: client.id, optionText: client.fullName }))
        )
      )
      .subscribe((selectData) => this.clients.set(selectData));
    
    this.usersService
      .getUsers()
      .pipe(
        map((data): SelectData[] => data?.data.map(user => ({id: user.id, optionText: user.name})) ?? [])
      )
      .subscribe((data) => this.users.set(data));
  }

  onSubmit() {
    this.activityForm.markAllAsTouched();
    if (this.activityForm.invalid) return;

    const data: Partial<Activity> = {
      ...(this.activityForm.value) as any
    }

    this.activityService.create(data).subscribe(activity => console.log(activity));
  }
}
