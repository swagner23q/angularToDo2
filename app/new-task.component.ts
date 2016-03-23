import {Component, EventEmitter} from 'angular2/core';
import {Task} from './task.model';

@Component({
  selector: 'new-task',
  inputs: ['categoryList'],
  outputs: ['onSubmitNewTask'],
  template:`
    <div class="task-form">
    <h3>Create Task</h3>
    <input placeholder="Description" class="col-sm-8 input-lg" #newDescription>
    <select #newPriority>
      <option value="low" selected>low</option>
      <option value="medium">medium</option>
      <option value="high">high</option>
    </select>
    <input placeholder="Category" class="col-sm-8 input-lg" #newCategory>
    <button (click)="addTask(newDescription, newPriority, newCategory)" class="btn-success btn-lg add-button">Add</button>
    </div>
    `
})
export class NewTaskComponent {
  public onSubmitNewTask: EventEmitter<Task>;
  constructor(){
    this.onSubmitNewTask = new EventEmitter();
  }
  addTask(userDescription: HTMLInputElement, userPriority: HTMLInputElement, userCategory: HTMLInputElement){
    var newTask = new Task(userDescription.value, userPriority.value, userCategory.value);
    this.onSubmitNewTask.emit(newTask);
    userDescription.value = "";
    userPriority.value = "low";
    userCategory.value = "";
  }
}
