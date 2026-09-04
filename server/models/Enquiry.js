// server/models/Enquiry.js
const db = require('../config/db');

class Enquiry {
  static async create({ customer_name, phone, email, service_id, service_name, message }) {
    const query = `
      INSERT INTO enquiries (customer_name, phone, email, service_id, service_name, message)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    const [result] = await db.execute(query, [
      customer_name,
      phone,
      email || null,
      service_id || null,
      service_name,
      message,
    ]);
    return result.insertId;
  }

  static async getAll(status = null) {
    let query = `
      SELECT id, customer_name, phone, email, service_id, service_name, message, status, admin_notes, created_at, updated_at
      FROM enquiries
    `;
    const params = [];

    if (status && status !== 'all') {
      query += ` WHERE status = ? `;
      params.push(status);
    }

    query += ` ORDER BY created_at DESC;`;
    const [rows] = await db.execute(query, params);
    return rows;
  }

  static async getById(id) {
    const query = `SELECT * FROM enquiries WHERE id = ? LIMIT 1;`;
    const [rows] = await db.execute(query, [id]);
    return rows[0] || null;
  }

  static async updateStatus(id, status, admin_notes = null) {
    const query = `
      UPDATE enquiries 
      SET status = ?, admin_notes = COALESCE(?, admin_notes)
      WHERE id = ?;
    `;
    const [result] = await db.execute(query, [status, admin_notes, id]);
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const query = `DELETE FROM enquiries WHERE id = ?;`;
    const [result] = await db.execute(query, [id]);
    return result.affectedRows > 0;
  }

  static async getStats() {
    const query = `
      SELECT 
        COUNT(*) AS totalEnquiries,
        SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) AS newEnquiries,
        SUM(CASE WHEN status = 'contacted' THEN 1 ELSE 0 END) AS contactedEnquiries,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completedEnquiries
      FROM enquiries;
    `;
    const [rows] = await db.execute(query);
    return rows[0];
  }
}

module.exports = Enquiry;