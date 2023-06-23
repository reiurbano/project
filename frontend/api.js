// Constant Variables
const endpoint = "http://localhost/project/api/";
const select = (q) => {
    return document.querySelector(q).value;
}
const path = () => {
    const split = window.location.pathname.split("/");
    split.pop();
    return split.toString().replaceAll(",", "/");
}

// Events
try {
    const loginForm = select("#loginForm");
    loginForm.addEventListener("submit", login);
} catch (err) { }

try {
    const registrationForm = select("#registrationForm");
    registrationForm.addEventListener("submit", register);
} catch (err) { }

// Functions
function register(evt) {
    evt.preventDefault();

    const firstname = select("#firstname");
    const lastname = select("#lastname");
    const email = select("#email");
    const birthdate = select("#birthdate");
    const password = select("#password");
    const confirm_password = select("#confirm_password");

    if (password === confirm_password) {
        fetch(`${endpoint}register.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'credentials': 'include'
            },
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                email: email,
                birthdate: birthdate,
                password: password
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    window.location.replace("login.html");
                } else {
                    alert(data.message);
                }
            })
    } else {
        alert("Passwords do no match!");
    }
}

function login(evt) {
    evt.preventDefault();

    const email = select("#email");
    const password = select("#password");

    fetch(`${endpoint}login.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'credentials': 'include'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                window.location.replace("index.html");
            } else {
                alert(data.message);
            }
        })
}