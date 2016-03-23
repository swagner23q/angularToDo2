export class Task {
  public done: boolean = false;
  constructor(public description: string, public priority: string, public category: string, public id?: number) {
  }
}
