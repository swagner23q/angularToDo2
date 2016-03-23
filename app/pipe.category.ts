import {Pipe, PipeTransform} from 'angular2/core';
import {Task} from './task.model';

@Pipe({
  name: "category",
  pure: false
})
export class CategoryPipe implements PipeTransform {
    transform(input: Task[], args) {
      var desiredCategoryState = args[0];
        return input.filter((task) => {
            return task.category === desiredCategoryState;
        });
    }
  }
