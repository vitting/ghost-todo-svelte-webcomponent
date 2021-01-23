<svelte:options tag="ghost-todo-comp-sv" />

<script lang="ts">
  import cuid from "cuid";
  import type { TodoItem } from "./interfaces/todo_item.interface";
  import { createEventDispatcher, onMount } from "svelte";
  import TodoItemsStore from "./stores/TodoItems.store";

  const dispatch = createEventDispatcher();

  export let inittodos: string = "";
  let todoInput: string = "";

  function handleSubmit() {
    if (todoInput) {
      const newTodoItem: TodoItem = {
        id: cuid(),
        title: todoInput,
        completed: false,
      };

      TodoItemsStore.update((items) => [...items, newTodoItem]);

      todoInput = "";
    }
  }

  function handleComplete(item: TodoItem) {
    item.completed = !item.completed;
    TodoItemsStore.update((items) => {
      return items.map((todo) => {
        if (todo.id === item.id) {
          todo.completed = item.completed;
        }

        return todo;
      });
    });
  }

  function handleRemoveItem(item: TodoItem) {
    TodoItemsStore.update((items) => {
      return items.filter((todo) => todo.id !== item.id);
    });
  }

  onMount(() => {
    if (inittodos) {
      const todos: TodoItem[] = inittodos.split(",").map<TodoItem>((item) => {
        const newItem: TodoItem = {
          id: cuid(),
          title: item.trim(),
          completed: false,
        };

        return newItem;
      });

      TodoItemsStore.set(todos);
    } else {
      TodoItemsStore.set([]);
    }
  });

  $: {
    if ($TodoItemsStore) {
      dispatch("todoChange", $TodoItemsStore);
    }
  }
</script>

<main>
  <h2>Svelte Web Component</h2>
  <form on:submit|preventDefault={handleSubmit}>
    <div class="control">
      <input type="text" bind:value={todoInput} />
      <button type="submit">Add</button>
    </div>
  </form>

  {#if $TodoItemsStore?.length}
    <ul>
      {#each $TodoItemsStore as todo (todo.id)}
        <li>
          <div class="container">
            <button type="button" title="Remove" on:click={() => handleRemoveItem(todo)}>
              ❌
            </button>
            <div class:completed={todo?.completed} class="item">
              <span>{todo?.title}</span>
              <input
                type="checkbox"
                on:change={(e) => handleComplete(todo)}
              />
            </div>
          </div>
        </li>
      {/each}
    </ul>
  {:else}
    <p>Get started, write your first Todo item now...</p>
  {/if}
</main>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

  main {
    display: block;
    font-family: "Roboto", sans-serif;
  }

  ul {
    list-style: none;
    padding: 0;
    width: 300px;
  }

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

  li {
    padding: 5px;
    background-color: rgb(144, 146, 27);
    color: white;
    margin-bottom: 5px;
    border-radius: 6px;
  }

  .container {
    display: flex;
    align-items: center;

    .item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &.completed {
        text-decoration: line-through #5454ce 2px;
      }
    }
  }

  button {
    padding: 0;
    margin-right: 5px;
    border: none;
    background-color: transparent;
    display: inline-block;
  }
</style>
