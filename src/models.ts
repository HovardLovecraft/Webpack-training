
interface ITodoService {
    add(todo: Todo): Todo;
    delete(todoId: number): void;
    getAll(): Todo[];
    getById(todoId: number): Todo;
}

interface IIdGenerator {
    nextId: number;
}

interface Todo {
    id: number,
    name : string; 
    state : number;
}

enum TodoState {
    New = 1,
    Active = 2,
    Complete = 3,
    Deleted = 4
}