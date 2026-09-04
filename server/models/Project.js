// server/models/Project.js
const db = require('../config/db');

class Project {
  static async getAll(category = null) {
    let query = `
      SELECT id, title, slug, category, description, image_url, is_featured, completion_date, created_at 
      FROM projects 
    `;
    const params = [];

    if (category && category !== 'all') {
      query += ` WHERE LOWER(category) = LOWER(?) `;
      params.push(category);
    }

    query += ` ORDER BY created_at DESC;`;
    const [rows] = await db.execute(query, params);
    return rows;
  }

  static async getFeatured() {
    const query = `
      SELECT id, title, slug, category, description, image_url 
      FROM projects 
      WHERE is_featured = TRUE 
      ORDER BY created_at DESC 
      LIMIT 6;
    `;
    const [rows] = await db.execute(query);
    return rows;
  }

  static async getById(id) {
    const query = `SELECT * FROM projects WHERE id = ? LIMIT 1;`;
    const [rows] = await db.execute(query, [id]);
    return rows[0] || null;
  }

  static async create({ title, slug, category, description, image_url, is_featured, completion_date }) {
    const query = `
      INSERT INTO projects (title, slug, category, description, image_url, is_featured, completion_date)
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
    const [result] = await db.execute(query, [
      title,
      slug,
      category,
      description,
      image_url,
      is_featured ? 1 : 0,
      completion_date || null,
    ]);
    return result.insertId;
  }

  static async update(id, { title, slug, category, description, image_url, is_featured, completion_date }) {
    const query = `
      UPDATE projects 
      SET title = ?, slug = ?, category = ?, description = ?, image_url = COALESCE(?, image_url), is_featured = ?, completion_date = ?
      WHERE id = ?;
    `;
    const [result] = await db.execute(query, [
      title,
      slug,
      category,
      description,
      image_url,
      is_featured ? 1 : 0,
      completion_date || null,
      id,
    ]);
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const query = `DELETE FROM projects WHERE id = ?;`;
    const [result] = await db.execute(query, [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Project;