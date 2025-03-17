const title = document.querySelector("#title");
const description = document.querySelector("#description");
const row = document.querySelector(".row");

const fetchData = async () => {
  console.log("fetching");
  const response = await fetch("http://localhost:5000/getTodo");
  const data = await response.json();

  console.log(data);
  row.innerHTML = "";

  if (data.todos.length < 1) {
    row.innerHTML = "<h4>No Todos Found</h4>";
    return;
  }

  data.todos.forEach((todo) => {
    row.innerHTML += `
            <div class="col-md-4">
                    <div class="card mb-4">
                        <div class="card-body">
                            <h5 class="card-title">${todo.title}</h5>
                            <p class="card-text">${todo.description}</p>
                        </div>
                    </div>
                </div>
            `;
  });
};

document.body.onload = fetchData();
