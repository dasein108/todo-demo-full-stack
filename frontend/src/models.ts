interface IEditable {
  editMode: boolean;
}

export class TodoItem {
  id?: number;
  title: string = "";
  completed: boolean = false;
  created_at?: Date;
  completed_at?: Date;
}

// TODO: Class to prevent refresh items in edit mode
export class EditTodoItem extends TodoItem implements IEditable {
  editMode: boolean = false;
  constructor(edit: boolean = false) {
    super();
    this.editMode = edit;
  }
}
