const userCardContainer = document.querySelector("#userCardContainer");

const fetchUsers = async () => {
    const response = await fetch("http://localhost:5000/getAllUsers")
    const data = await response.json()

    console.log(data.data, "data");

    userCardContainer.innerHTML = ""

    data.data.forEach(user => {
        userCardContainer.innerHTML += `

        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">${user.username}</h5>
              <p class="card-text">Email: ${user.email}</p>
              <button class="btn btn-primary" onclick="editUser('${user.id}')">Edit</button>
              <button class="btn btn-danger" onclick="deleteUser('${user.id}')">Delete</button>
            </div>
          </div>
        </div>

        `
    })
}

const editUser = async (id) => {
    const response = await fetch(`http://localhost:5000/getUser/${id}`);
    const data = await response.json();

    
    const user = data.data;
    console.log(user, "data");  

    const username = prompt("Enter username", user.username);
    const email = prompt("Enter email", user.email);

    const response2 = await fetch(`http://localhost:5000/updateUser/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            email
        })
    });

    const data2 = await response2.json();

    console.log(data2);

    fetchUsers();

}

const deleteUser = async (id) => {
    const response = await fetch(`http://localhost:5000/deleteUser/${id}`, {
        method: "DELETE"
    });

    const data = await response.json();

    console.log(data);

    fetchUsers();
}

