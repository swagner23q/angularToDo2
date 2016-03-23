import { Component, EventEmitter } from 'angular2/core';
import { TaskComponent } from './task.component';
import { Task } from './task.model';
import { EditTaskDetailsComponent } from './edit-task-details.component';
import { NewTaskComponent } from './new-task.component';
import { DonePipe } from './pipe.done';
import { PriorityPipe } from './pipe.priority';
import { CategoryPipe } from './pipe.category';


@Component({
  selector: 'task-list',
  inputs: ['taskList','categories'],
  outputs: ['onTaskSelect'],
  pipes: [DonePipe, PriorityPipe, CategoryPipe],
  directives: [TaskComponent, EditTaskDetailsComponent, NewTaskComponent],
  template: `
  <select (change)="onChangeDone($event.target.value)" class="filter">
    <option value="all">Show All</option>
    <option value="done">Show Done</option>
    <option value="notDone" selected>Show Not Done</option>
  </select>
  <select (change)="onChangePriority($event.target.value)" class="filter">
    <option value="low" selected>low</option>
    <option value="medium">medium</option>
    <option value="high">high</option>
  </select>
  <select (change)="onChangeCategory($event.target.value)" class="filter">
    <option selected>Sort by category</option>
    <option *ngFor="#category of categories" value={{category}}>{{category}}</option>
  </select>
  <task-display *ngFor="#currentTask of taskList | done:filterDone | priority:filterPriority | category:filterCategory"
    (click)="taskClicked(currentTask)"
    [class.selected]="currentTask === selectedTask"
    [task]="currentTask">
  </task-display>
  <edit-task-details *ngIf="selectedTask" [task]="selectedTask">
  </edit-task-details>
  <new-task (onSubmitNewTask)="createTask($event)"></new-task>
  `
})
export class TaskListComponent {
  public taskList: Task[];
  public onTaskSelect: EventEmitter<Task>;
  public selectedTask: Task;
  public filterDone: string = "notDone";
  public filterPriority: string = "low";
  public filterCategory: string;
  public categories: string[];
  constructor() {
    this.onTaskSelect = new EventEmitter();
    this.categories = [
      "home",
      "work",
      "hobby"
    ];
  }

  taskClicked(clickedTask: Task): void {
    this.selectedTask = clickedTask;
    this.onTaskSelect.emit(clickedTask);
  }
  createTask(newTask: Task): void {
    newTask.id = this.taskList.length;
    this.taskList.push(newTask);
    this.categories.push(newTask.category);
  }
  onChangeDone(filterOption) {
    this.filterDone = filterOption;
  }
  onChangePriority(filterOption) {
    this.filterPriority = filterOption;
  }
  onChangeCategory(filterOption) {
    this.filterCategory = filterOption;
  }
}
