// Constant Variables
const endpoint = "http://localhost/project/api/";
const selectValue = (q) => {
    return document.querySelector(q).value;
}
const selectForm = (q) => {
    return document.querySelector(q);
}
const path = () => {
    const split = window.location.pathname.split("/");
    split.pop();
    return split.toString().replaceAll(",", "/");
}

// Events
try {
    const loginForm = selectForm("#loginForm");
    loginForm.addEventListener("submit", login);
} catch (err) { }

try {
    const registrationForm = selectForm("#registrationForm");
    registrationForm.addEventListener("submit", register);
} catch (err) { }

// Functions
function register(evt) {
    evt.preventDefault();

    const firstname = selectValue("#firstname");
    const lastname = selectValue("#lastname");
    const email = selectValue("#email");
    const birthdate = selectValue("#birthdate");
    const password = selectValue("#password");
    const confirm_password = selectValue("#confirm_password");

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

    const email = selectValue("#email");
    const password = selectValue("#password");

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