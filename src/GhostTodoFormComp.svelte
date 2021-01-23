<svelte:options tag="ghost-todo-form-comp" />

<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import cuid from "cuid";
  import type { TodoItem } from "./interfaces/todo_item.interface";

  const dispatch = createEventDispatcher();

  let todoInput: string = "";

  function handleSubmit() {
    if (todoInput) {
      const newTodoItem: TodoItem = {
        id: cuid(),
        title: todoInput,
        completed: false,
      };

      dispatch("submitTodo", newTodoItem);
      todoInput = "";
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div class="control">
    <input type="text" bind:value={todoInput} />
    <button type="submit">Add</button>
  </div>
</form>

<style lang="scss">
  form {
    .control {
      width: 300px;
      display: flex;
      input {
        flex: 1;
        margin-right: 5px;
      }
    }

    button {
      background-color: #5454ce;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 5px;
      outline: lightgray;
    }
  }
</style>
