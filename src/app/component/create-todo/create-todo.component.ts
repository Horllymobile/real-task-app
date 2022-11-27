import { ITodo } from './../../core/model/Todo';
import { TodoService } from './../../core/services/todo.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoStatus } from 'src/app/core/enums/TodoStatus';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent implements OnInit {
  form!: FormGroup;
  today = new Date().toISOString();
  start = '';
  end = '';
  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private todoService: TodoService,
    private alertCtrl: AlertController
  ) {
    this.form = fb.group({
      title: ['', [Validators.required]],
    });
  }

  get formControls() {
    return this.form.controls;
  }

  get formValues() {
    return this.form.value;
  }

  ngOnInit() {}

  async onSubmit(data: any) {
    if (this.start && this.end) {
      const todo: ITodo = {
        name: data.title,
        start_date: this.start,
        end_date: this.end,
      };
      this.todoService.createTodo(todo);
      this.form.reset();
      await this.modalCtrl.dismiss();
    }
  }

  onDateChange(event: any, type: 'start' | 'end') {
    if (type === 'start') {
      this.start = event.detail.value;
    } else {
      this.end = event.detail.value;
    }
  }

  async close() {
    if (!this.form.dirty) {
      await this.modalCtrl.dismiss();
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Close',
        message: 'Are you sure',
        buttons: [
          'No',
          {
            text: 'Yes',
            handler: async () => {
              await this.modalCtrl.dismiss();
            },
          },
        ],
      });
      await alert.present();
    }
  }
}
