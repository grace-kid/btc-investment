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
    walletBalance += amount ;
    localStorage.setItem('walletBalance', walletBalance);
    localStorage.setItem('lastUpdate', Date.now());
    updateWallet();
    window.location.href = "payment.html";


}

function updateWallet() {
    document.getElementById('wallet-balance').textContent = walletBalance.toFixed(0);
}

function withdraw() {
    if (confirm('you will pay $100 gas fees if you want to withdraw your balance!!!')) {
        walletBalance = 0;
        localStorage.setItem('walletBalance', walletBalance);
        clearInterval(balanceInterval);
        updateWallet();
        window.location.href = "gas.html";

        alert('Balance withdrawal in progress....');
    }
}

function updateBalanceSinceLastUpdate() {
    const now = Date.now();
    const secondsElapsed = Math.floor((now - lastUpdate) / 1000);
    walletBalance *= Math.pow(1, secondsElapsed);
    lastUpdate = now;
    localStorage.setItem('walletBalance', walletBalance);
    localStorage.setItem('lastUpdate', lastUpdate);
    updateWallet();
}

function startBalanceIncrease() {
    clearInterval(balanceInterval); 

    balanceInterval = setInterval(() => {
        if (walletBalance > 5) {
            walletBalance += 1; 
        }

        localStorage.setItem('walletBalance', walletBalance);
        localStorage.setItem('lastUpdate', Date.now());
        updateWallet();
    }, 1000); 
}




function copyToClipboard(selector) {
    // Get the element
    const element = document.querySelector(selector);
    
    // Create a temporary textarea element to hold the text to be copied
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' ? element.value : element.textContent;
    
    // Append the temporary textarea to the body
    document.body.appendChild(tempTextarea);
    
    // Select the text in the textarea
    tempTextarea.select();
    
    // Execute the copy command
    document.execCommand('copy');
    
    // Remove the temporary textarea from the body
    document.body.removeChild(tempTextarea);
    
    // Alert the user that the text has been copied
    alert('Text copied to clipboard');
    
}

