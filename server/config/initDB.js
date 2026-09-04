// server/config/initDB.js
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const initDB = async () => {
  let connection;
  try {
    // 1. Initial connection without database selected to ensure DB exists
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: Number(process.env.DB_PORT) || 3306,
    });

    const dbName = process.env.DB_NAME || 'vignesh_woodwork_db';
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
    );
    await connection.query(`USE \`${dbName}\`;`);

    // 2. Admins Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);

    // 3. Services Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS services (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(120) NOT NULL,
        slug VARCHAR(140) NOT NULL UNIQUE,
        description TEXT NOT NULL,
        image_url VARCHAR(255) NULL,
        is_featured BOOLEAN DEFAULT FALSE,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_services_featured (is_featured),
        INDEX idx_services_sort (sort_order)
      ) ENGINE=InnoDB;
    `);

    // 4. Projects Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        slug VARCHAR(170) NOT NULL UNIQUE,
        category VARCHAR(80) NOT NULL,
        description TEXT NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        is_featured BOOLEAN DEFAULT FALSE,
        completion_date DATE NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_projects_category (category),
        INDEX idx_projects_featured (is_featured)
      ) ENGINE=InnoDB;
    `);

    // 5. Enquiries Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        customer_name VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(100) NULL,
        service_id INT UNSIGNED NULL,
        service_name VARCHAR(120) NOT NULL,
        message TEXT NOT NULL,
        status ENUM('new', 'contacted', 'completed') DEFAULT 'new',
        admin_notes TEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_enquiries_service
          FOREIGN KEY (service_id)
          REFERENCES services(id)
          ON DELETE SET NULL
          ON UPDATE CASCADE,
        INDEX idx_enquiries_status (status),
        INDEX idx_enquiries_created (created_at DESC)
      ) ENGINE=InnoDB;
    `);

    // 6. Seed Default Admin if none exists
    const [existingAdmins] = await connection.query(`SELECT id FROM admins LIMIT 1;`);
    if (existingAdmins.length === 0) {
      const defaultUsername = 'admin';
      const defaultEmail = 'admin@vigneshwoodworks.com';
      const defaultPassword = 'AdminPassword123!';
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(defaultPassword, salt);

      await connection.query(
        `INSERT INTO admins (username, email, password_hash) VALUES (?, ?, ?);`,
        [defaultUsername, defaultEmail, hashedPassword]
      );

      console.log('----------------------------------------------------');
      console.log('🔑 Default Admin created:');
      console.log(`   Username: ${defaultUsername}`);
      console.log(`   Password: ${defaultPassword}`);
      console.log('----------------------------------------------------');
    }

    console.log('✅ MySQL Database & Tables initialized successfully.');
  } catch (error) {
    console.error('❌ Failed to initialize MySQL Database:', error.message);
    throw error;
  } finally {
    if (connection) await connection.end();
  }
};

module.exports = initDB;