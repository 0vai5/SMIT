const title = document.querySelector("#title");
const description = document.querySelector("#description");
const row = document.querySelector(".row");

let allTodos = [];

const fetchData = async () => {
  console.log("fetching");
  const response = await fetch("http://localhost:5000/getTodo");
  const data = await response.json();

  allTodos = data.todos;

  console.log(data);
  row.innerHTML = "";

  if (data.todos.length < 1) {
    row.innerHTML = "<h4 class='text-white'>No Todos Found</h4>";
    return;
  }

  data.todos.forEach((todo) => {
    row.innerHTML += `
            <div class="col-md-4">
                    <div class="card mb-4 p-2">
                        <div class="card-body">
                            <h5 class="card-title">${todo.todo}</h5>
                            <p class="card-text">${todo.description}</p>
                        </div>
                        <div>

                        <button class='btn btn-success' onclick="editTodo('${todo._id}', '${todo.todo}', '${todo.description}')">Edit</button>
                        <button class='btn btn-danger' onclick="deleteTodo('${todo._id}')">Delete</button>
                        </div>
                    </div>
                </div>
            `;
  });
};

const createTodo = async () => {
  try {
    const todoObj = {
      todo: title.value,
      description: description.value,
    };

    if (!title.value || !description.value) {
      alert("All Fields are Required");
      return;
    }

    const response = await fetch("http://localhost:5000/createTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoObj),
    });
    const data = await response.json();

    fetchData();
  } catch (error) {
    console.log("Error Occured while creating", error.message);
  }
};

const editTodo = async (id, todo, desc) => {
  try {
    const editedTodo = prompt("New value for Todo", todo);
    const editedDesc = prompt("New value for Description", desc);

    const editedData = {
      todo: editedTodo,
      description: editedDesc,
    };

    const response = await fetch(`http://localhost:5000/updateTodo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData),
    });
    const data = await response.json();

    fetchData();
  } catch (error) {
    console.log("Error Occured", error.message);
  }
};

const deleteTodo = async (id) => {
  const response = await fetch(`http://localhost:5000/deleteTodo/${id}`, {
    method: "DELETE",
  });

  console.log(response);
  const data = await response.json();

  fetchData();
};

const deleteAll = async () => {
  const response = await fetch("http://localhost:5000/deleteAll", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids: allTodos.map((todo) => todo._id) }),
  });

  const data = await response.json();
  fetchData();
};

document.body.onload = fetchData();
