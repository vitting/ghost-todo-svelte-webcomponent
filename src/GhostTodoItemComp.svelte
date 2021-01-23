<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { TodoItem } from "./interfaces/todo_item.interface";

  export let item: string;
  let todo: TodoItem;
  let completed: boolean = false;

  const dispatch = createEventDispatcher();

  function handleRemoveItem() {
    dispatch("clickTodoRemove", todo);
  }

  function handleCheckClick() {
    todo.completed = completed;
    dispatch("changeTodoCompleted", todo);
  }

  onMount(() => {
    if (item) {
      todo = JSON.parse(item);
    }
  });
</script>

<li>
  <div class="container">
    <button type="button" title="Remove" on:click={handleRemoveItem}>
      ❌
    </button>
    <div class:completed={todo?.completed} class="item">
      <span>{todo?.title}</span>
      <input
        type="checkbox"
        bind:checked={completed}
        on:change={handleCheckClick}
      />
    </div>
  </div>
</li>

<style lang="scss">
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
