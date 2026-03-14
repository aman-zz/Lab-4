const { readBalance, writeBalance, viewBalance, creditAccount, debitAccount, getBalance, setBalance } = require('./index');

jest.mock('readline-sync');

const readline = require('readline-sync');

describe('Student Account Management System - Unit Tests', () => {
    beforeEach(() => {
        // Reset balance to initial state before each test
        setBalance(1000.00);
        jest.clearAllMocks();
    });

    describe('TC001 - Verify initial account balance', () => {
        test('should return initial balance of $1000.00', () => {
            expect(readBalance()).toBe(1000.00);
        });
    });

    describe('TC002 - Credit account with valid amount', () => {
        test('should add $500.00 to balance', () => {
            readline.question.mockReturnValueOnce('500.00');
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

            creditAccount();

            expect(getBalance()).toBe(1500.00);
            expect(consoleSpy).toHaveBeenCalledWith('Amount credited. New balance: $1500.00');

            consoleSpy.mockRestore();
        });
    });

    describe('TC003 - Debit account with sufficient funds', () => {
        test('should subtract $200.00 from balance of $1500.00', () => {
            setBalance(1500.00);
            readline.question.mockReturnValueOnce('200.00');
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

            debitAccount();

            expect(getBalance()).toBe(1300.00);
            expect(consoleSpy).toHaveBeenCalledWith('Amount debited. New balance: $1300.00');

            consoleSpy.mockRestore();
        });
    });

    describe('TC004 - Attempt debit with insufficient funds', () => {
        test('should not debit when balance is insufficient', () => {
            setBalance(1300.00);
            readline.question.mockReturnValueOnce('2000.00');
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

            debitAccount();

            expect(getBalance()).toBe(1300.00);
            expect(consoleSpy).toHaveBeenCalledWith('Insufficient funds for this debit.');

            consoleSpy.mockRestore();
        });
    });

    describe('TC005 - Multiple credit operations', () => {
        test('should handle cumulative credits', () => {
            readline.question.mockReturnValueOnce('100.00');
            creditAccount();
            expect(getBalance()).toBe(1100.00);

            readline.question.mockReturnValueOnce('250.50');
            creditAccount();
            expect(getBalance()).toBe(1350.50);
        });
    });

    describe('TC006 - Multiple debit operations', () => {
        test('should handle cumulative debits', () => {
            setBalance(1350.50);
            readline.question.mockReturnValueOnce('50.00');
            debitAccount();
            expect(getBalance()).toBe(1300.50);

            readline.question.mockReturnValueOnce('100.25');
            debitAccount();
            expect(getBalance()).toBe(1200.25);
        });
    });

    describe('TC007 - Credit zero amount', () => {
        test('should not change balance when crediting zero', () => {
            setBalance(1200.25);
            readline.question.mockReturnValueOnce('0.00');
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

            creditAccount();

            expect(getBalance()).toBe(1200.25);
            expect(consoleSpy).toHaveBeenCalledWith('Amount credited. New balance: $1200.25');

            consoleSpy.mockRestore();
        });
    });

    describe('TC008 - Debit zero amount', () => {
        test('should not change balance when debiting zero', () => {
            setBalance(1200.25);
            readline.question.mockReturnValueOnce('0.00');
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

            debitAccount();

            expect(getBalance()).toBe(1200.25);
            expect(consoleSpy).toHaveBeenCalledWith('Amount debited. New balance: $1200.25');

            consoleSpy.mockRestore();
        });
    });

    describe('TC009 - Credit large amount', () => {
        test('should handle large credit amounts', () => {
            setBalance(1200.25);
            readline.question.mockReturnValueOnce('999999.99');
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

            creditAccount();

            expect(getBalance()).toBe(1001200.24);
            expect(consoleSpy).toHaveBeenCalledWith('Amount credited. New balance: $1001200.24');

            consoleSpy.mockRestore();
        });
    });

    describe('TC012 - Exact balance debit', () => {
        test('should allow debiting exact balance amount', () => {
            setBalance(500.00);
            readline.question.mockReturnValueOnce('500.00');
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

            debitAccount();

            expect(getBalance()).toBe(0.00);
            expect(consoleSpy).toHaveBeenCalledWith('Amount debited. New balance: $0.00');

            consoleSpy.mockRestore();
        });
    });

    describe('TC014 - Negative amount credit attempt', () => {
        test('should reject negative credit amounts', () => {
            setBalance(1000.00);
            readline.question.mockReturnValueOnce('-100.00');
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

            creditAccount();

            expect(getBalance()).toBe(1000.00);
            expect(consoleSpy).toHaveBeenCalledWith('Invalid amount. Please enter a positive number.');

            consoleSpy.mockRestore();
        });
    });

    describe('TC015 - Negative amount debit attempt', () => {
        test('should reject negative debit amounts', () => {
            setBalance(1000.00);
            readline.question.mockReturnValueOnce('-100.00');
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

            debitAccount();

            expect(getBalance()).toBe(1000.00);
            expect(consoleSpy).toHaveBeenCalledWith('Invalid amount. Please enter a positive number.');

            consoleSpy.mockRestore();
        });
    });

    describe('TC016 - Decimal precision handling', () => {
        test('should handle decimal amounts correctly', () => {
            setBalance(1000.00);
            readline.question.mockReturnValueOnce('123.45');
            creditAccount();
            expect(getBalance()).toBe(1123.45);

            readline.question.mockReturnValueOnce('67.89');
            debitAccount();
            expect(getBalance()).toBe(1055.56);
        });
    });

    describe('TC011 - Balance persistence across operations', () => {
        test('should maintain balance across multiple operations', () => {
            setBalance(2000.00);
            readline.question.mockReturnValueOnce('100.00');
            creditAccount();
            expect(getBalance()).toBe(2100.00);

            readline.question.mockReturnValueOnce('50.00');
            debitAccount();
            expect(getBalance()).toBe(2050.00);
        });
    });

    describe('TC001 - View balance functionality', () => {
        test('should display current balance', () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

            viewBalance();

            expect(consoleSpy).toHaveBeenCalledWith('Current balance: $1000.00');

            consoleSpy.mockRestore();
        });
    });

    // Note: TC010 (Invalid menu choice), TC013 (Application exit), TC017 (Menu loop)
    // would require integration testing of the main() function with mocked readline
    // For unit tests, we focus on the core business logic functions
});