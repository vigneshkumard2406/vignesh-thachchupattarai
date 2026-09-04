// server/resetPassword.js
const bcrypt = require('bcryptjs');
const db = require('./config/db');

const reset = async () => {
  try {
    const username = 'admin';
    const rawPassword = '123'; // Simple password for testing

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(rawPassword, salt);

    // Delete old admin and insert fresh
    await db.execute('DELETE FROM admins WHERE username = ?', [username]);
    await db.execute(
      'INSERT INTO admins (username, email, password_hash) VALUES (?, ?, ?)',
      [username, 'admin@vigneshwood.com', hash]
    );

    console.log('====================================');
    console.log('✅ Admin reset successful!');
    console.log('Username: admin');
    console.log('Password: 123');
    console.log('====================================');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

reset();