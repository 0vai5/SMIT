const todoInput = document.querySelector("#todoInput");
const todoContainer = document.querySelector("#todoContainer");

const client = supabase.createClient("https://imkxzgepmknmohnfdiwe.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlta3h6Z2VwbWtubW9obmZkaXdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMzAxMjksImV4cCI6MjA1MjcwNjEyOX0.pl-QoLjbsbMV4p61KT3ASjEKd9CDsibhjFkKiGVy_wk")

const renderTodo = async () => {
  try {
    const { data: todos, error } = await client
      .from('Todo')
      .select('*')

    todoContainer.innerHTML = "";

    todos.forEach(todo => {
      const todoItem = `
        <li class="list-group-item">
          ${todo.todo}
          <button class="btn btn-sm btn-outline-primary" onclick="editTodo('${todo.id}')">Edit</button>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteTodo('${todo.id}')">Delete</button>
        </li>
      `;
      todoContainer.innerHTML += todoItem;
    });

  } catch (error) {
    console.log("Error", error.message);
  }
};

const createTodo = async () => {
  if (!todoInput.value) {
    alert("Please Enter a Todo");
    return;
  }

  try {
    const { data, error } = await client
      .from('Todo')
      .insert({
        todo: todoInput.value
      })
      .select();

    renderTodo();

  } catch (error) {
    console.log("Error occured", error);
  }
};

const editTodo = async (todoId) => {
  try {
    const updatedValue = prompt("Enter the value to be updated");
    if (!updatedValue) {
      alert("Please Enter the value");
      return;
    }

    const { data, error } = await client
      .from('Todo')
      .update({
        todo: updatedValue
      })
      .eq('id', todoId)
      .select();

    renderTodo();
  } catch (error) {
    console.log("Error", error);
  }
};

const deleteTodo = async (todoId) => {
  try {
    const { error } = await client
      .from('Todo')
      .delete()
      .eq('id', todoId);

    renderTodo();

  } catch (error) {
    console.log("Error", error);
  }
};