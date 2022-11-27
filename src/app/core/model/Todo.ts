import { TodoStatus } from '../enums/TodoStatus';

export interface ITodo {
  id?: string;
  name: string;
  start_date?: string;
  end_date?: string;
  status?: TodoStatus;
}
