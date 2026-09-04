// server/seedData.js
const db = require('./config/db');

const seedInitialData = async () => {
  try {
    console.log('Seeding initial woodworking services and projects...');

    // 1. Seed Services
    const [existingServices] = await db.execute('SELECT COUNT(*) as count FROM services');
    if (existingServices[0].count === 0) {
      const services = [
        [
          'Solid Wood Door & Window Works',
          'solid-wood-door-window-works',
          'Custom teak entrance doors, ornate pooja room frames, window shutters, and safety wood fittings made with seasoned timber.',
          'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
          1,
          1
        ],
        [
          'Bespoke Furniture Crafting',
          'bespoke-furniture-crafting',
          'Handcrafted solid teak & rosewood dining tables, cushioned sofa frames, beds with storage, and work desks.',
          'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=800&auto=format&fit=crop',
          1,
          2
        ],
        [
          'Cupboards & Modular Storage',
          'cupboards-modular-storage',
          'Floor-to-ceiling bedroom wardrobes, overhead loft framing, showcase shelves, and moisture-resistant kitchen cabinets.',
          'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800&auto=format&fit=crop',
          1,
          3
        ],
        [
          'Architectural Interior Woodwork',
          'architectural-interior-woodwork',
          'Acoustic wooden wall paneling, false ceiling rafters, decorative CNC jaali partitions, and balustrade railings.',
          'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
          1,
          4
        ]
      ];

      for (const s of services) {
        await db.execute(
          `INSERT INTO services (title, slug, description, image_url, is_featured, sort_order) VALUES (?, ?, ?, ?, ?, ?)`,
          s
        );
      }
      console.log('✅ Services seeded successfully');
    }

    // 2. Seed Projects
    const [existingProjects] = await db.execute('SELECT COUNT(*) as count FROM projects');
    if (existingProjects[0].count === 0) {
      const projects = [
        [
          'Hand-Carved Teak Pooja Door',
          'hand-carved-teak-pooja-door',
          'Doors',
          'Intricate Lakshmi floral motif carving in 100% aged Burma teak with polished brass lock fittings.',
          'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
          1,
          '2026-02-15'
        ],
        [
          'Walnut 8-Seater Dining Suite',
          'walnut-8-seater-dining-suite',
          'Furniture',
          'Monolithic solid timber top with traditional mortise-and-tenon understructure and water-resistant satin polyurethane coat.',
          'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?q=80&w=800&auto=format&fit=crop',
          1,
          '2026-01-20'
        ],
        [
          'Concealed Handle Minimalist Wardrobe',
          'concealed-handle-minimalist-wardrobe',
          'Storage',
          'Full-length marine-grade core with veneer polish exterior, hydraulic hanging rods, and integrated LED slots.',
          'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800&auto=format&fit=crop',
          1,
          '2026-02-28'
        ],
        [
          'Floating Living Room TV Credenza',
          'floating-living-room-tv-credenza',
          'Furniture',
          'Wall-hung media console with slatted wood acoustic doors and internal cable management channels.',
          'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=800&auto=format&fit=crop',
          1,
          '2026-03-01'
        ]
      ];

      for (const p of projects) {
        await db.execute(
          `INSERT INTO projects (title, slug, category, description, image_url, is_featured, completion_date) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          p
        );
      }
      console.log('✅ Projects seeded successfully');
    }

    console.log('🎉 Seed process finished.');
    process.exit(0);
  } catch (err) {
    console.error('Seed Error:', err);
    process.exit(1);
  }
};

seedInitialData();