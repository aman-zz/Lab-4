# COBOL Student Account Management System - Test Plan

This test plan covers the business logic and functionality of the COBOL-based student account management system. It is designed to validate requirements with business stakeholders and will serve as the basis for creating unit and integration tests in the Node.js transformation.

## Test Cases

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status | Comments |
|--------------|----------------------|----------------|------------|-----------------|---------------|--------|----------|
| TC001 | Verify initial account balance | Application is freshly started | 1. Start the application<br>2. Select option 1 (View Balance) | Display shows "Current balance: $1000.00" |  |  | Initial balance requirement |
| TC002 | Credit account with valid amount | Application is running, balance is $1000.00 | 1. Select option 2 (Credit Account)<br>2. Enter amount: 500.00<br>3. Select option 1 to view balance | Balance displays $1500.00 |  |  | Positive credit transaction |
| TC003 | Debit account with sufficient funds | Application is running, balance is $1500.00 | 1. Select option 3 (Debit Account)<br>2. Enter amount: 200.00<br>3. Select option 1 to view balance | Balance displays $1300.00 |  |  | Valid debit transaction |
| TC004 | Attempt debit with insufficient funds | Application is running, balance is $1300.00 | 1. Select option 3 (Debit Account)<br>2. Enter amount: 2000.00 | Display shows "Insufficient funds for this debit." and balance remains $1300.00 |  |  | No overdraft allowed |
| TC005 | Multiple credit operations | Application is running, balance is $1000.00 | 1. Credit $100.00<br>2. Credit $250.50<br>3. View balance | Balance displays $1350.50 |  |  | Cumulative credits |
| TC006 | Multiple debit operations | Application is running, balance is $1350.50 | 1. Debit $50.00<br>2. Debit $100.25<br>3. View balance | Balance displays $1200.25 |  |  | Cumulative debits |
| TC007 | Credit zero amount | Application is running, balance is $1200.25 | 1. Select option 2 (Credit Account)<br>2. Enter amount: 0.00<br>3. View balance | Balance remains $1200.25 (no change) |  |  | Edge case: zero credit |
| TC008 | Debit zero amount | Application is running, balance is $1200.25 | 1. Select option 3 (Debit Account)<br>2. Enter amount: 0.00<br>3. View balance | Balance remains $1200.25 (no change) |  |  | Edge case: zero debit |
| TC009 | Credit large amount | Application is running, balance is $1200.25 | 1. Select option 2 (Credit Account)<br>2. Enter amount: 999999.99<br>3. View balance | Balance displays $1001200.24 |  |  | Large amount handling |
| TC010 | Invalid menu choice | Application is running | 1. Enter choice: 5<br>2. Enter choice: 0<br>3. Enter choice: a (non-numeric) | Display shows "Invalid choice, please select 1-4." for each invalid input, menu redisplays |  |  | Input validation |
| TC011 | Balance persistence across operations | Application is running, balance modified to $2000.00 | 1. Perform several credit/debit operations<br>2. Restart application<br>3. View balance immediately | Balance shows $2000.00 (persisted) |  |  | Data persistence requirement |
| TC012 | Exact balance debit | Application is running, balance is $500.00 | 1. Select option 3 (Debit Account)<br>2. Enter amount: 500.00<br>3. View balance | Balance displays $0.00 |  |  | Debit exact balance |
| TC013 | Application exit | Application is running | 1. Select option 4 (Exit) | Application terminates with message "Exiting the program. Goodbye!" |  |  | Clean exit |
| TC014 | Negative amount credit attempt | Application is running, balance is $1000.00 | 1. Select option 2 (Credit Account)<br>2. Enter amount: -100.00 | Balance remains $1000.00 (no negative credits allowed) |  |  | Edge case: negative credit |
| TC015 | Negative amount debit attempt | Application is running, balance is $1000.00 | 1. Select option 3 (Debit Account)<br>2. Enter amount: -100.00 | Balance remains $1000.00 (no negative debits allowed) |  |  | Edge case: negative debit |
| TC016 | Decimal precision handling | Application is running, balance is $1000.00 | 1. Credit $123.45<br>2. Debit $67.89<br>3. View balance | Balance displays $1055.56 |  |  | Decimal precision (2 places) |
| TC017 | Menu loop functionality | Application is running | 1. Perform any valid operation<br>2. Verify menu redisplays after operation completes | Menu continues to display until exit is selected |  |  | Continuous operation loop |

## Test Execution Notes

- **Environment:** Ubuntu Linux with GnuCOBOL compiler
- **Data Setup:** Initial balance is $1000.00 for all tests unless otherwise specified
- **Input Format:** Amounts should be entered with 2 decimal places (e.g., 100.00)
- **Reset Procedure:** Restart application between tests that require clean state
- **Performance:** No specific performance requirements defined
- **Security:** No authentication/authorization requirements in current system

## Coverage Summary

This test plan covers:
- ✅ Account initialization
- ✅ Balance inquiry
- ✅ Credit transactions (valid and edge cases)
- ✅ Debit transactions (valid, insufficient funds, edge cases)
- ✅ Data persistence
- ✅ Input validation
- ✅ Application flow and exit
- ✅ Error handling

## Future Use

This test plan will be used to:
1. Validate business requirements with stakeholders
2. Create unit tests for individual functions in Node.js
3. Create integration tests for end-to-end workflows
4. Ensure the Node.js transformation maintains equivalent functionality