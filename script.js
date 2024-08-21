// JavaScript for Visitor Count
document.addEventListener("DOMContentLoaded", function () {
    updateVisitorCount();
});

function updateVisitorCount() {
    if (localStorage.getItem("visitorCount")) {
        let count = parseInt(localStorage.getItem("visitorCount"), 10);
        count++;
        localStorage.setItem("visitorCount", count);
    } else {
        localStorage.setItem("visitorCount", 1);
    }
    document.getElementById("visitor-count").innerText = `Visitor Count: ${localStorage.getItem("visitorCount")}`;
}

// JavaScript for Caesar Cipher
function encryptCaesar() {
    const input = document.getElementById('caesar-input').value.toUpperCase();
    const shift = parseInt(document.getElementById('caesar-shift').value);
    const output = input.replace(/[A-Z]/g, (char) =>
        String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65)
    );
    document.getElementById('caesar-output').value = output;
}

function decryptCaesar() {
    const input = document.getElementById('caesar-input').value.toUpperCase();
    const shift = parseInt(document.getElementById('caesar-shift').value);
    const output = input.replace(/[A-Z]/g, (char) =>
        String.fromCharCode(((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65)
    );
    document.getElementById('caesar-output').value = output;
}

// JavaScript for Vigenère Cipher
function encryptVigenere() {
    const input = document.getElementById('vigenere-input').value.toUpperCase();
    const key = document.getElementById('vigenere-key').value.toUpperCase();
    let output = '';
    for (let i = 0, j = 0; i < input.length; i++) {
        const c = input.charCodeAt(i);
        if (c >= 65 && c <= 90) {
            output += String.fromCharCode(((c - 65 + (key.charCodeAt(j % key.length) - 65)) % 26) + 65);
            j++;
        } else {
            output += input.charAt(i);
        }
    }
    document.getElementById('vigenere-output').value = output;
}

function decryptVigenere() {
    const input = document.getElementById('vigenere-input').value.toUpperCase();
    const key = document.getElementById('vigenere-key').value.toUpperCase();
    let output = '';
    for (let i = 0, j = 0; i < input.length; i++) {
        const c = input.charCodeAt(i);
        if (c >= 65 && c <= 90) {
            output += String.fromCharCode(((c - 65 - (key.charCodeAt(j % key.length) - 65) + 26) % 26) + 65);
            j++;
        } else {
            output += input.charAt(i);
        }
    }
    document.getElementById('vigenere-output').value = output;
}

// JavaScript for Atbash Cipher
function encryptAtbash() {
    const input = document.getElementById('atbash-input').value.toUpperCase();
    const output = input.replace(/[A-Z]/g, (char) =>
        String.fromCharCode(155 - char.charCodeAt(0))
    );
    document.getElementById('atbash-output').value = output;
}

function decryptAtbash() {
    encryptAtbash(); // Atbash is symmetric, so encryption and decryption are the same
}

// JavaScript for Rail Fence Cipher
function encryptRailFence() {
    const text = document.getElementById("railfence-input").value;
    const key = parseInt(document.getElementById("railfence-key").value, 10);
    let rail = Array.from({ length: key }, () => []);
    let dir = false;
    let row = 0;

    for (let i = 0; i < text.length; i++) {
        rail[row].push(text[i]);
        if (row === 0 || row === key - 1) dir = !dir;
        row += dir ? 1 : -1;
    }

    const output = rail.flat().join('');
    document.getElementById('railfence-output').value = output;
}

function decryptRailFence() {
    const cipher = document.getElementById("railfence-input").value;
    const key = parseInt(document.getElementById("railfence-key").value, 10);
    let rail = Array.from({ length: key }, () => Array(cipher.length).fill(null));
    let dir = false;
    let row = 0;
    let idx = 0;

    for (let i = 0; i < cipher.length; i++) {
        rail[row][i] = '*';
        if (row === 0 || row === key - 1) dir = !dir;
        row += dir ? 1 : -1;
    }

    for (let i = 0; i < key; i++) {
        for (let j = 0; j < cipher.length; j++) {
            if (rail[i][j] === '*' && idx < cipher.length) {
                rail[i][j] = cipher[idx++];
            }
        }
    }

    let result = '';
    dir = false;
    row = 0;

    for (let i = 0; i < cipher.length; i++) {
        result += rail[row][i];
        if (row === 0 || row === key - 1) dir = !dir;
        row += dir ? 1 : -1;
    }

    document.getElementById('railfence-output').value = result;
}

// JavaScript for Columnar Transposition Cipher
function encryptColumnar() {
    const text = document.getElementById("columnar-input").value;
    const key = document.getElementById("columnar-key").value;
    const numCols = key.length;
    const numRows = Math.ceil(text.length / numCols);
    const grid = Array.from({ length: numRows }, () => Array(numCols).fill(''));
    let k = 0;

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (k < text.length) {
                grid[i][j] = text[k++];
            }
        }
    }

    const sortedKey = key.split('').map((char, i) => ({ char, index: i }))
                             .sort((a, b) => a.char.localeCompare(b.char))
                             .map(item => item.index);

    let output = '';
    for (const col of sortedKey) {
        for (const row of grid) {
            if (row[col] !== '') {
                output += row[col];
            }
        }
    }

    document.getElementById('columnar-output').value = output;
}

function decryptColumnar() {
    const text = document.getElementById("columnar-input").value;
    const key = document.getElementById("columnar-key").value;
    const numCols = key.length;
    const numRows = Math.ceil(text.length / numCols);
    const grid = Array.from({ length: numRows }, () => Array(numCols).fill(''));
    const sortedKey = key.split('').map((char, i) => ({ char, index: i }))
                             .sort((a, b) => a.char.localeCompare(b.char))
                             .map(item => item.index);

    let k = 0;
    for (const col of sortedKey) {
        for (let row = 0; row < numRows; row++) {
            if (k < text.length) {
                grid[row][col] = text[k++];
            }
        }
    }

    let output = '';
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (grid[row][col] !== '') {
                output += grid[row][col];
            }
        }
    }

    document.getElementById('columnar-output').value = output;
}

// JavaScript for Playfair Cipher (Simplified)
function encryptPlayfair() {
    const input = document.getElementById('playfair-input').value.toUpperCase();
    const key = document.getElementById('playfair-key').value.toUpperCase();
    // Simplified placeholder implementation
    const output = input; // Placeholder
    document.getElementById('playfair-output').value = output;
}

function decryptPlayfair() {
    const input = document.getElementById('playfair-input').value.toUpperCase();
    const key = document.getElementById('playfair-key').value.toUpperCase();
    // Simplified placeholder implementation
    const output = input; // Placeholder
    document.getElementById('playfair-output').value = output;
}

// JavaScript for Hill Cipher (Simplified)
function encryptHill() {
    const input = document.getElementById('hill-input').value.toUpperCase();
    const key = document.getElementById('hill-key').value.split(',').map(Number);
    // Simplified placeholder implementation
    const output = input; // Placeholder
    document.getElementById('hill-output').value = output;
}

function decryptHill() {
    const input = document.getElementById('hill-input').value.toUpperCase();
    const key = document.getElementById('hill-key').value.split(',').map(Number);
    // Simplified placeholder implementation
    const output = input; // Placeholder
    document.getElementById('hill-output').value = output;
}
