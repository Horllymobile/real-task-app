import { TodoStatus } from '../enums/TodoStatus';

export interface ITodo {
  id?: number;
  name: number;
  start_date?: string;
  end_date?: string;
  status?: TodoStatus;
}
