const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");/*Boton login de registro */
const container = document.getElementById("container");
window.resizeTo(800, 600); // Cambia el tamaño de la ventana a 800x600 píxeles

registerButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

loginButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

document.getElementById('btn_Ingresar').addEventListener('click', function() {
    menu();
});

function menu() {
    window.location.href = 'menu.html';
}

document.querySelector('.register-container form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
        username: formData.get('username'),
        full_name: formData.get('full_name'),
        email: formData.get('email'),
        password: formData.get('password')
    };

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log(result.message || result.error);
    } catch (error) {
        console.error('Error:', error);
    }
});

document.querySelector('.login-container form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
        username: formData.get('username'),
        password: formData.get('password')
    };

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log(result.message || result.error);
    } catch (error) {
        console.error('Error:', error);
    }
});
