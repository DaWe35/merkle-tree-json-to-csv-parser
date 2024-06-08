const fs = require('fs');
const { parse } = require('json2csv');

// Load the JSON file
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// Extract and process the necessary data
const claims = data.claims;
const records = [];

for (const [address, claim] of Object.entries(claims)) {
  const amountHex = claim.amount;
  const amountDecimal = (BigInt(amountHex) / 1000000000000000000n).toString(); // Convert hex to decimal and divide by 1e18
  records.push({ address, amount: amountDecimal });
}

// Define the CSV fields
const fields = ['address', 'amount'];

// Convert JSON to CSV
const csv = parse(records, { fields });

// Write the CSV to a file
fs.writeFileSync('output.csv', csv);

console.log('CSV file has been created successfully.');

