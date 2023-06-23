// Constant Variables
const endpoint = "http://localhost/project/api/";
const filePath = window.location.pathname;
const selectValue = (q) => {
    return document.querySelector(q).value;
}
const selectForm = (q) => {
    return document.querySelector(q);
}
const path = () => {
    const split = filePath.split("/");
    split.pop();
    return split.toString().replaceAll(",", "/");
}

// Events
try {
    window.addEventListener("load", checkSess);
} catch (err) { }

try {
    const loginForm = selectForm("#loginForm");
    loginForm.addEventListener("submit", login);
} catch (err) { }

try {
    const registrationForm = selectForm("#registrationForm");
    registrationForm.addEventListener("submit", register);
} catch (err) { }

try {
    const logoutButton = selectForm("#logout");
    logoutButton.addEventListener("click", logout);
} catch (err) { }

// Functions
function checkSess() {
    fetch(`${endpoint}login.php`, {
        credentials: 'include',
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            if (data.valid && (filePath == `${path()}/login.html` || filePath == `${path()}/register.html`)) {
                window.location.replace("index.html");
            } else if (!data.valid && (filePath != `${path()}/login.html` && filePath != `${path()}/register.html`)) {
                window.location.replace("login.html");
            } else if (data.valid && (filePath != `${path()}/login.html` && filePath != `${path()}/register.html`)) {
                fetch(`${endpoint}login.php?id=${data.user_id}`, {
                    credentials: 'include',
                    method: 'GET'
                })
                    .then(response => response.json())
                    .then(data => {
                        document.querySelector("#user").innerHTML = 
                        `${data.user.firstname} ${data.user.lastname}`;
                    })
            }
        })
}

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
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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

function logout() {
    fetch(`${endpoint}logout.php`, {
        credentials: 'include',
        method: 'POST'
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            window.location.replace("login.html");
        })
        .catch(err => console.log('err', err))
}