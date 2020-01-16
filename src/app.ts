'use strict';

class TodoService { 
    
    static lastId = 0;

    constructor(private todos : Todo[]) {
        
    }

    add(todo: Todo) {
        var newId = TodoService.getNextId();
    }

    getAll() {
        return this.todos;
    }

    static getNextId() {
        return TodoService.lastId +=1;
    }
}

interface Todo {
    name : string; 
    state : number;
}

enum TodoState {
    New = 1,
    Active = 2,
    Complete = 3,
    Deleted = 4
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

class TodoStateChanger {

    constructor(private newState: TodoState) {
    }

    canChangeState(todo: Todo): boolean {
        return !!todo;
    }

    changeState(todo: Todo): Todo {
        if(this.canChangeState(todo)){
            todo.state = this.newState;
        }
        return todo;
    }
    
}

let todo = new SmartTodo("pick up drycleaning")

todo.state = TodoState.Complete;

todo.state
