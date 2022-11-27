import { TodoService } from './../../core/services/todo.service';
import { CreateTodoComponent } from './../../component/create-todo/create-todo.component';
import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { ITodo } from 'src/app/core/model/Todo';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TodoStatus } from 'src/app/core/enums/TodoStatus';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {
  todos$!: Observable<{ page: number; size: number; data: Array<ITodo> }>;
  todoStatus = TodoStatus;
  chip = '';
  page = 0;
  size = 20;
  constructor(
    private modalCtrl: ModalController,
    private todoService: TodoService,
    private socket: Socket
  ) {}

  ngOnInit() {
    this.getTodos(this.page, this.size);
  }

  getTodos(page: number, size: number) {
    this.todoService.findAllTodos({ page, size });
    this.todos$ = this.todoService.getTasks('findAllTodo').pipe(
      map((todos) => {
        this.page = todos.page;
        return todos;
      })
    );
  }

  async openTodoForm() {
    const modal = await this.modalCtrl.create({
      component: CreateTodoComponent,
      initialBreakpoint: 0.4,
      breakpoints: [0.5, 0.4, 0.3, 0.2, 0.1],
      backdropDismiss: false,
    });

    await modal.present();
  }

  onFilter(status?: TodoStatus) {
    if (status) {
      this.chip = status;
      this.filterTodo(status);
    } else {
      this.chip = '';
      this.filterTodo(status);
    }
  }

  filterTodo(status?: TodoStatus) {
    this.todoService.filterTodos(status);
    this.todos$ = this.todoService.getTasks('filterTodo').pipe(
      map((todos) => {
        this.page = todos.page;
        return todos;
      })
    );
  }

  searchTodo(event: any) {
    this.todoService.searchTodos(event.detail.value);
    this.todos$ = this.todoService.getTasks('searchTodo').pipe(
      map((todos) => {
        this.page = todos.page;
        return todos;
      })
    );
  }

  async onIonInfinite(event: any) {
    let done = false;
    this.page + 1;
    this.todoService.findAllTodos({ page: this.page, size: this.size });
    this.todos$ = this.todoService.getTasks('findAllTodo').pipe(
      map((todos) => {
        this.page = todos.page;
        (event as InfiniteScrollCustomEvent).target.complete();
        return todos;
      })
    );
  }
}
