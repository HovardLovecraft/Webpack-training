
export interface ITodoService {
    add(todo: Todo): Todo;
    delete(todoId: number): void;
    getAll(): Todo[];
    getById(todoId: number): Todo;
}

export interface IIdGenerator {
    nextId: number;
}

export interface Todo {
    id: number,
    name : string; 
    state : number;
}

export enum TodoState {
    New = 1,
    Active = 2,
    Complete = 3,
    Deleted = 4
}