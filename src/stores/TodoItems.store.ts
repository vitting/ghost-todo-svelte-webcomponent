import { writable } from 'svelte/store';
import type { TodoItem } from "../interfaces/todo_item.interface";

const TodoItemsStore = writable<TodoItem[]>(null);

export default TodoItemsStore;