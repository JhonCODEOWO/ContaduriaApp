import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { isNil, omitBy } from 'lodash';
import { Activity } from './interfaces/activity.interface';
import { ActivityResponse } from './interfaces/activity-response.interface';

@Injectable({ providedIn: 'root' })
export class ActivitiesService {
  route = `${environment.API_URL}/activities`;
  httpClient = inject(HttpClient);

  getActivities(idUser?: string, limit: number = 5, offset = 0): Observable<ActivityResponse> {
    let httpParams = new HttpParams().set('limit', limit).set('offset', offset);

    if(idUser) httpParams = httpParams.set('idUser', idUser);
    return this.httpClient.get<ActivityResponse>(`${this.route}`, { params: httpParams });
  }

  create(activity: Partial<Activity>): Observable<Activity>{
    const body = omitBy(activity, (value) => value === null); //Quitar campos null
    return this.httpClient.post<Activity>(this.route, body);
  }
}
