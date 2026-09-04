// server/viewEnquiries.js
const db = require('./config/db');

const showEnquiries = async () => {
  try {
    const [rows] = await db.execute(
      'SELECT id, customer_name, phone, email, service_name, message, status, created_at FROM enquiries ORDER BY id DESC'
    );
    console.log('\n--- 📋 CUSTOMER ENQUIRIES IN DATABASE ---');
    console.table(rows);
    process.exit(0);
  } catch (err) {
    console.error('Error fetching data:', err.message);
    process.exit(1);
  }
};

showEnquiries();