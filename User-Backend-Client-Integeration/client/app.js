const username = document.querySelector('#username');
const email = document.querySelector('#email');

const createUser = async() => {
    try {

        if(!username.value || !email.value ) {
            alert('All fields are required');
            return;
        }

        const user = {
            username: username.value,
            email: email.value
        }

        const response = await fetch('http://localhost:5000/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        console.log(data, "data");

        window.location.replace("./users/users.html");

    } catch (error) {
        console.log(error);
        alert(error.message)
    }
}