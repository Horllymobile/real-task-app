import { Injectable } from '@angular/core';
import { ITodo } from '../model/Todo';
import { map } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { TodoStatus } from '../enums/TodoStatus';
import { Socket } from 'ngx-socket-io';

export interface AnalyticsByStatus {
  label: string;
  number: number;
}

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(private socket: Socket) {}

  getAnalyticsByStatus(name: string) {
    return this.socket.fromEvent<AnalyticsByStatus[]>(name).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getAnalytics(
    name: string,
    payload?: { start_date: string; end_date: string }
  ) {
    this.socket.emit(name, payload);
  }
}
