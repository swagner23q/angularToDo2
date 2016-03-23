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





//   transform(input: Task[], args) {
//     var desiredCategoryState = args[0];
//     if(desiredCategoryState === "work") {
//       return input.filter((task) => {
//         return task.category === "work";
//       });
//     } else if (desiredCategoryState === "home") {
//       return input.filter((task) => {
//         return task.category === "home";
//       });
//     } else if (desiredCategoryState === "hobby") {
//       return input.filter((task) => {
//         return task.category === "hobby";
//       });
//     } else {
//       return input;
//     }
//   }
// }
