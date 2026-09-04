// server/models/Admin.js
const db = require('../config/db');

class Admin {
  static async findByUsernameOrEmail(identifier) {
    const query = `
      SELECT id, username, email, password_hash, created_at 
      FROM admins 
      WHERE LOWER(username) = LOWER(?) OR LOWER(email) = LOWER(?) 
      LIMIT 1;
    `;
    const [rows] = await db.execute(query, [identifier.trim(), identifier.trim()]);
    return rows[0] || null;
  }

  static async findById(id) {
    const query = `
      SELECT id, username, email, created_at 
      FROM admins 
      WHERE id = ? 
      LIMIT 1;
    `;
    const [rows] = await db.execute(query, [id]);
    return rows[0] || null;
  }
}

module.exports = Admin;