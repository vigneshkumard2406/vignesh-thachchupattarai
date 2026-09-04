// server/createAdmin.js
const bcrypt = require('bcryptjs');
const db = require('./config/db');

const createSuperAdmin = async () => {
  try {
    const username = 'admin';
    const email = 'admin@vigneshwood.com';
    const rawPassword = 'AdminPassword123!';

    // 1. Password-ai secure-ah hash panrom
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(rawPassword, salt);

    // 2. Already admin irukkaan-nu check panrom
    const [existing] = await db.execute(
      'SELECT id FROM admins WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existing.length > 0) {
      // Already irundha password-ai update panniduvom
      await db.execute(
        'UPDATE admins SET password_hash = ? WHERE username = ?',
        [passwordHash, username]
      );
      console.log('🔄 Existing Admin password has been reset!');
    } else {
      // Pudhu admin create panrom
      await db.execute(
        'INSERT INTO admins (username, email, password_hash) VALUES (?, ?, ?)',
        [username, email, passwordHash]
      );
      console.log('✅ New Admin Account created successfully!');
    }

    console.log('----------------------------------------------------');
    console.log(`🔑 Username: ${username}`);
    console.log(`🔑 Password: ${rawPassword}`);
    console.log('----------------------------------------------------');

    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating admin:', err.message);
    process.exit(1);
  }
};

createSuperAdmin();