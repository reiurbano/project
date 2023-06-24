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

try {
    const tweetButton = selectForm("#tweetButton");
    tweetButton.addEventListener("click", createTweets);
} catch (err) { }

try {
    const newProfileForm = selectForm("#changeProfile");
    newProfileForm.addEventListener("submit", profileSet);
} catch (err) { }

try {
    const newPasswordForm = selectForm("#changePassword");
    newPasswordForm.addEventListener("submit", passwordSet);
} catch (err) { }

// Session Management
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
            } else if (data.valid && (filePath == `${path()}/index.html`)) {
                getTweets();
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

// Register, Login & Logout Functions
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
}

// Tweet Functions
function createTweets() {
    const contentArea = document.querySelector("#tweet").value;
    fetch(`${endpoint}createtweet.php`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({
            content: contentArea
        })
    })
        .then(response => console.log(response.text()))
        .then(data => {
            document.querySelector("#tweet").value = "";
            getTweets();
        })
}

function getTweets() {
    fetch(`${endpoint}gettweets.php`, {
        credentials: 'include',
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            let tweets = "";
            data.forEach((tweet) => {
                tweets += `
                    <div class="card mt-3">
                        <div class="card-body">
                            <p class="fw-bold">${tweet.firstname} ${tweet.lastname}</p>
                            <p>${tweet.content}</p>
                            <p class="fw-bold">${tweet.date}</p>
                            ${(tweet.user) ? `<button onclick="deleteTweets(${tweet.id})" class="btn btn-danger">Delete Tweet</button>` : ''}
                        </div>
                    </div>
                `;
            })
            document.querySelector("#feed").innerHTML = tweets;
        })
}

function deleteTweets(q) {
    fetch(`${endpoint}deletetweet.php?id=${q}`, {
        credentials: 'include',
        method: 'POST'
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            getTweets();
        })
}

// Profile Setting Functions
function profileSet() {
    const newfirstname = selectValue("#newFirstname");
    const newlastname = selectValue("#newLastname");
    const newemail = selectValue("#newEmail");
    const newbirthdate = selectValue("#newBirthdate");

    fetch(`${endpoint}changeprofile.php`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstname: newfirstname,
            lastname: newlastname,
            email: newemail,
            birthdate: newbirthdate
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
            } else {
                alert(data.message);
            }
        })
}

function passwordSet() {
    const newPassword = selectValue("#newPass");
    const confirm_newPassword = selectValue("#confirm_newPass");

    if (newPassword === confirm_newPassword) {
        fetch(`${endpoint}changepassword.php`, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: newPassword
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                } else {
                    alert(data.success);
                }
            })
    } else {
        alert("Passwords do not Match");
    }
}