let users = JSON.parse(localStorage.getItem('users')) || {};  // Load users from local storage or initialize
let currentUser = localStorage.getItem('currentUser');
let walletBalance = parseFloat(localStorage.getItem('walletBalance')) || 0;
let lastUpdate = parseInt(localStorage.getItem('lastUpdate')) || Date.now();
let balanceInterval;

if (currentUser) {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('username').textContent = currentUser;
    updateWallet();
    updateBalanceSinceLastUpdate();
    startBalanceIncrease();
}

function signUp() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    
    if (username && password) {
        if (!users[username]) {
            users[username] = password;
            localStorage.setItem('users', JSON.stringify(users));
            alert('Sign up successful. Please log in.');
        } else {
            alert('Username already exists. Please choose another one.');
        }
    } else {
        alert('Please enter a valid username and password.');
    }
}

function logIn() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    if (users[username] && users[username] === password) {
        currentUser = username;
        localStorage.setItem('currentUser', currentUser);
        document.getElementById('auth').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('username').textContent = currentUser;
        updateWallet();
        updateBalanceSinceLastUpdate();
        startBalanceIncrease();
    } else {
        alert('Invalid username or password.');
    }
}

function buyPlan(amount) {
    walletBalance += amount;
    localStorage.setItem('walletBalance', walletBalance);
    localStorage.setItem('lastUpdate', Date.now());
    updateWallet();
}

function updateWallet() {
    document.getElementById('wallet-balance').textContent = walletBalance.toFixed(2);
}

function withdraw() {
    if (confirm('Are you sure you want to withdraw your balance?')) {
        walletBalance = 0;
        localStorage.setItem('walletBalance', walletBalance);
        clearInterval(balanceInterval);
        updateWallet();
        alert('Balance withdrawn.');
    }
}

function updateBalanceSinceLastUpdate() {
    const now = Date.now();
    const secondsElapsed = Math.floor((now - lastUpdate) / 1000);
    walletBalance *= Math.pow(1.00005, secondsElapsed);
    lastUpdate = now;
    localStorage.setItem('walletBalance', walletBalance);
    localStorage.setItem('lastUpdate', lastUpdate);
    updateWallet();
}

function startBalanceIncrease() {
    clearInterval(balanceInterval); // Ensure no previous interval is running
    balanceInterval = setInterval(() => {
        walletBalance *= 1.00005; // Increase balance by 5% every second
        localStorage.setItem('walletBalance', walletBalance);
        localStorage.setItem('lastUpdate', Date.now());
        updateWallet();
    }, 10000); // 1000 milliseconds = 1 second
}


