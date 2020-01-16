'use strict';

class TodoService implements ITodoService, IIdGenerator { 
    
    private static _lastId = 0;

    get nextId(){
        return TodoService._lastId += 1;
    }

    constructor(private todos : Todo[]) {   
    }

    add(todo: Todo) {
        todo.id = this.nextId;
        this.todos.push(todo);
        return todo;
    }

    getAll(): Todo[] {
        let clone = JSON.stringify(this.todos)
        return JSON.parse(clone)
    }

    delete(todoId: number): void{
        let toDelete = this.getById(todoId);

        let deletedIndex = this.todos.indexOf(toDelete);

        this.todos.splice(deletedIndex, 1);
    };

    getById(todoId: number): Todo {
        let filtered = this.todos.filter(data => data.id === todoId);

        if (filtered.length) {
            return filtered[0]
        }

        return ;
    }

    clone<T>(src: T): T {
        let clone = JSON.stringify(src);
        return JSON.parse(clone);
    };
    
}

class SmartTodo {
    
    _state: TodoState;
    
    name: string;

    get state() {
        return TodoState.Complete;
    }

    set state(newState) {
        
        if(newState === TodoState.Complete) {

            var canBeCompleted = this.state === TodoState.Active || this.state === TodoState.Deleted;
        }

        if (!canBeCompleted){
            throw "todo must be active or Deled in order to be marked as Completed"
        }

        this._state = newState;
    }

    constructor(name: string){
        this.name = name;
    }
}

abstract class TodoStateChanger {

    constructor(private newState: TodoState) {
    }

    abstract canChangeState(todo: Todo): boolean;

    changeState(todo: Todo): Todo {
        if(this.canChangeState(todo)){
            todo.state = this.newState;
        }
        return todo;
    }

}

class CompleteTodoStateChanger extends TodoStateChanger {

    constructor() {
        super(TodoState.Complete);
    }

    canChangeState(todo: Todo): boolean {
        return !!todo && (
            todo.state === TodoState.Active || todo.state === TodoState.Deleted
        );
    }

}

let todo = new SmartTodo("pick up drycleaning")

todo.state = TodoState.Complete;

todo.state
