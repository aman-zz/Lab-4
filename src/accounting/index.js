const readline = require('readline-sync');

// Global balance storage - equivalent to STORAGE-BALANCE in data.cob
let balance = 1000.00;

/**
 * Read balance - equivalent to DataProgram READ operation
 * @returns {number} current balance
 */
function readBalance() {
    return balance;
}

/**
 * Write balance - equivalent to DataProgram WRITE operation
 * @param {number} newBalance
 */
function writeBalance(newBalance) {
    balance = newBalance;
}

/**
 * View balance operation - equivalent to Operations TOTAL
 */
function viewBalance() {
    const currentBalance = readBalance();
    console.log(`Current balance: $${currentBalance.toFixed(2)}`);
}

/**
 * Credit account operation - equivalent to Operations CREDIT
 */
function creditAccount() {
    const amountInput = readline.question("Enter credit amount: ");
    const amount = parseFloat(amountInput);

    if (isNaN(amount) || amount < 0) {
        console.log("Invalid amount. Please enter a positive number.");
        return;
    }

    const currentBalance = readBalance();
    const newBalance = currentBalance + amount;
    writeBalance(newBalance);
    console.log(`Amount credited. New balance: $${newBalance.toFixed(2)}`);
}

/**
 * Debit account operation - equivalent to Operations DEBIT
 */
function debitAccount() {
    const amountInput = readline.question("Enter debit amount: ");
    const amount = parseFloat(amountInput);

    if (isNaN(amount) || amount < 0) {
        console.log("Invalid amount. Please enter a positive number.");
        return;
    }

    const currentBalance = readBalance();
    if (currentBalance >= amount) {
        const newBalance = currentBalance - amount;
        writeBalance(newBalance);
        console.log(`Amount debited. New balance: $${newBalance.toFixed(2)}`);
    } else {
        console.log("Insufficient funds for this debit.");
    }
}

/**
 * Main program loop - equivalent to MainProgram
 */
function main() {
    console.log("--------------------------------");
    console.log("Account Management System");
    console.log("1. View Balance");
    console.log("2. Credit Account");
    console.log("3. Debit Account");
    console.log("4. Exit");
    console.log("--------------------------------");

    while (true) {
        const choiceInput = readline.question("Enter your choice (1-4): ");
        const choice = parseInt(choiceInput);

        switch (choice) {
            case 1:
                viewBalance();
                break;
            case 2:
                creditAccount();
                break;
            case 3:
                debitAccount();
                break;
            case 4:
                console.log("Exiting the program. Goodbye!");
                return;
            default:
                console.log("Invalid choice, please select 1-4.");
        }

        // Display menu again for next iteration
        console.log("\n--------------------------------");
        console.log("Account Management System");
        console.log("1. View Balance");
        console.log("2. Credit Account");
        console.log("3. Debit Account");
        console.log("4. Exit");
        console.log("--------------------------------");
    }
}

// Start the application
if (require.main === module) {
    main();
}

module.exports = {
    readBalance,
    writeBalance,
    viewBalance,
    creditAccount,
    debitAccount,
    getBalance: () => balance,
    setBalance: (newBalance) => { balance = newBalance; },
    main
};