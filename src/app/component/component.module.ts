import { CreateTodoComponent } from './create-todo/create-todo.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TodoItemComponent, CreateTodoComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],
  exports: [TodoItemComponent],
})
export class ComponentModule {}
