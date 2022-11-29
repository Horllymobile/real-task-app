import { Injectable } from '@angular/core';
import { ITodo } from '../model/Todo';
import { map } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { TodoStatus } from '../enums/TodoStatus';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private socket: Socket) {}

  getTasks(name: string, status?: TodoStatus) {
    return this.socket
      .fromEvent<{ page: number; size: number; data: Array<ITodo> }>(name)
      .pipe(
        map((todo) => {
          return todo;
        })
      );
  }

  findAllTodos(payload: { page: number; size: number }) {
    this.socket.emit('getAllTodos', payload);
  }

  createTodo(todo: ITodo) {
    this.socket.emit('createTodo', todo);
  }

  filterTodos(status?: TodoStatus) {
    this.socket.emit('filterTodo', status);
  }

  searchTodos(name: string) {
    this.socket.emit('searchTodo', name);
  }

  markInProgress(payload: {
    id: number | undefined;
    status: TodoStatus | undefined;
  }) {
    this.socket.emit('markInProgress', payload);
  }

  markInDone(payload: {
    id: number | undefined;
    status: TodoStatus | undefined;
  }) {
    this.socket.emit('markAsDone', payload);
  }

  deleteTodo(id: number | undefined) {
    this.socket.emit('deleteTodo', id);
  }
}
