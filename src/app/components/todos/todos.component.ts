import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[];

  constructor(
    private todoService:TodoService
  ) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => { 
      this.todos = todos;
    });
  }

  /** On Delete Function when you click x */
  deleteTodo(todo: Todo) { 
    // This removes it from the UI 
    this.todos = this.todos.filter(t => t.id !== todo.id);
    // This removes it from the server
    this.todoService.deleteTodo(todo).subscribe();
  }

  /** Add Todo function */
  addTodo(todo: Todo) { 
    this.todoService.addTodo(todo).subscribe(todo => { 
      this.todos.push(todo);
    });
  }
}
