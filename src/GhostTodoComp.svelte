<svelte:options tag="ghost-todo-comp" />

<script lang="ts">
  import cuid from "cuid";
  import type { TodoItem } from "./interfaces/todo_item.interface";
  import { createEventDispatcher, onMount } from "svelte";
  import GhostTodoFormComp from "./GhostTodoFormComp.svelte";
  import GhostTodoItemComp from "./GhostTodoItemComp.svelte";
  import TodoItemsStore from "./stores/TodoItems.store";

  const dispatch = createEventDispatcher();

  export let initTodos: string = "";

  function handleSubmit(event: CustomEvent<TodoItem>) {
    TodoItemsStore.update((items) => [...items, event.detail]);
  }

  function handleComplete(event: CustomEvent<TodoItem>) {
    const item = event.detail;

    TodoItemsStore.update((items) => {
      return items.map((todo) => {
        if (todo.id === item.id) {
          todo.completed = item.completed;
        }

        return todo;
      });
    });
  }

  function handleRemoveItem(event: CustomEvent<TodoItem>) {
    const item = event.detail;

    TodoItemsStore.update((items) => {
      return items.filter((todo) => todo.id !== item.id);
    });
  }

  onMount(() => {
    if (initTodos) {
      const todos: TodoItem[] = initTodos.split(",").map<TodoItem>((item) => {
        const newItem: TodoItem = {
          id: cuid(),
          title: item.trim(),
          completed: false,
        };

        return newItem;
      });

      TodoItemsStore.set(todos);
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
  <GhostTodoFormComp on:submitTodo={handleSubmit} />

  {#if $TodoItemsStore?.length}
    <ul>
      {#each $TodoItemsStore as todo (todo.id)}
        <GhostTodoItemComp
          item={JSON.stringify(todo)}
          on:changeTodoCompleted={handleComplete}
          on:clickTodoRemove={handleRemoveItem}
        />
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
</style>
