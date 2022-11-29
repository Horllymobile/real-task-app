import { TodoService } from './../../core/services/todo.service';
import { Component, Input, OnInit } from '@angular/core';
import { TodoStatus } from 'src/app/core/enums/TodoStatus';
import { ITodo } from 'src/app/core/model/Todo';
import { fadeInRight400ms } from 'src/app/core/animation/fade-in';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  animations: [fadeInRight400ms],
  providers: [DatePipe],
})
export class TodoItemComponent implements OnInit {
  @Input() item!: ITodo;
  todoStatus = TodoStatus;

  today: string | null = new Date().toISOString();

  constructor(private todoService: TodoService, private datePipe: DatePipe) {}

  ngOnInit() {}

  markInProgress(item: ITodo) {
    this.todoService.markInProgress({
      id: item.id,
      status: TodoStatus.PROGRESS,
    });
  }

  markAsDone(item: ITodo) {
    this.todoService.markInDone({ id: item.id, status: TodoStatus.DONE });
  }

  deleteTodo(id: number | undefined) {
    this.todoService.deleteTodo(id);
  }

  checkDueDate(item: ITodo) {
    const dueDate = this.datePipe.transform(item.end_date, 'YYYY-MM-dd');
    this.today = this.datePipe.transform(this.today, 'YYYY-MM-dd');
    return this.today === dueDate;
  }
}
