// server/models/Service.js
const db = require('../config/db');

class Service {
  static async getAll() {
    const query = `
      SELECT id, title, slug, description, image_url, is_featured, sort_order, created_at, updated_at
      FROM services 
      ORDER BY sort_order ASC, created_at DESC;
    `;
    const [rows] = await db.execute(query);
    return rows;
  }

  static async getFeatured() {
    const query = `
      SELECT id, title, slug, description, image_url 
      FROM services 
      WHERE is_featured = TRUE 
      ORDER BY sort_order ASC 
      LIMIT 6;
    `;
    const [rows] = await db.execute(query);
    return rows;
  }

  static async getById(id) {
    const query = `SELECT * FROM services WHERE id = ? LIMIT 1;`;
    const [rows] = await db.execute(query, [id]);
    return rows[0] || null;
  }

  static async create({ title, slug, description, image_url, is_featured, sort_order }) {
    const query = `
      INSERT INTO services (title, slug, description, image_url, is_featured, sort_order)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    const [result] = await db.execute(query, [
      title,
      slug,
      description,
      image_url || null,
      is_featured ? 1 : 0,
      sort_order || 0,
    ]);
    return result.insertId;
  }

  static async update(id, { title, slug, description, image_url, is_featured, sort_order }) {
    const query = `
      UPDATE services 
      SET title = ?, slug = ?, description = ?, image_url = COALESCE(?, image_url), is_featured = ?, sort_order = ?
      WHERE id = ?;
    `;
    const [result] = await db.execute(query, [
      title,
      slug,
      description,
      image_url,
      is_featured ? 1 : 0,
      sort_order || 0,
      id,
    ]);
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const query = `DELETE FROM services WHERE id = ?;`;
    const [result] = await db.execute(query, [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Service;