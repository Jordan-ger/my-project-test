const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const userPage = document.getElementById('userPage');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');
const confirmPassword = document.getElementById('confirmPassword');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const userName = document.getElementById('userName');

const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const registerSubmitBtn = document.getElementById('registerSubmitBtn');
const logoutBtn = document.getElementById('logoutBtn');
const loginFromRegisterBtn = document.getElementById('loginFromRegisterBtn');  
function checkUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        showUserPage(user);
    } else {
        showLoginForm();
    }
}

function showLoginForm() {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    userPage.classList.add('hidden');
}

function showUserPage(user) {
    loginForm.classList.add('hidden');
    registerForm.classList.add('hidden');
    userPage.classList.remove('hidden');
    userName.textContent = `${user.firstName} ${user.lastName}`;
}

function showRegisterForm() {
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
}

loginBtn.addEventListener('click', () => {
    const email = loginEmail.value;
    const password = loginPassword.value;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        showUserPage(user);
    } else {
        alert('Неверная почта или пароль');
    }
});

registerBtn.addEventListener('click', showRegisterForm);

registerSubmitBtn.addEventListener('click', () => {
    const first = firstName.value;
    const last = lastName.value;
    const email = registerEmail.value;
    const password = registerPassword.value;
    const confirm = confirmPassword.value;

    if (!first || !last || !email || !password || !confirm) {
        alert('Все поля обязательны для заполнения');
        return;
    }

    if (password !== confirm) {
        alert('Пароли не совпадают');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(user => user.email === email)) {
        alert('Пользователь с такой почтой уже существует');
        return;
    }

    const newUser = { firstName: first, lastName: last, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Регистрация прошла успешно!');

        loginEmail.value = email;     showLoginForm();
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('user');
    showLoginForm();
});

loginFromRegisterBtn.addEventListener('click', showLoginForm);

checkUser();
