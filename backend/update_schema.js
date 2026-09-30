const pool = require('./config/db');

async function updateSchema() {
  try {
    console.log('Altering Bookings table...');

    const queries = [
      `ALTER TABLE Bookings ADD COLUMN IF NOT EXISTS hotel_name VARCHAR(255)`,
      `ALTER TABLE Bookings ADD COLUMN IF NOT EXISTS hotel_image TEXT`,
      `ALTER TABLE Bookings ADD COLUMN IF NOT EXISTS price DECIMAL(10,2)`,
      `ALTER TABLE Bookings ADD COLUMN IF NOT EXISTS check_in DATE`,
      `ALTER TABLE Bookings ADD COLUMN IF NOT EXISTS check_out DATE`,
      `ALTER TABLE Bookings ADD COLUMN IF NOT EXISTS guests INT`,
      `ALTER TABLE Bookings ADD COLUMN IF NOT EXISTS place_name VARCHAR(255)`,
      `ALTER TABLE Bookings ADD COLUMN IF NOT EXISTS quantity INT`,
      `ALTER TABLE Bookings ADD COLUMN IF NOT EXISTS total_price DECIMAL(10,2)`,
      `ALTER TABLE Bookings ADD COLUMN IF NOT EXISTS food_image TEXT`,
      `ALTER TABLE Bookings ADD COLUMN IF NOT EXISTS restaurant VARCHAR(255)`
    ];

    for (let query of queries) {
      try {
        await pool.query(query);
        console.log(`Executed: ${query}`);
      } catch (err) {
        // IF NOT EXISTS might not be supported in older MySQL for columns, 
        // if it errors we just ignore and continue
        if (err.code !== 'ER_DUP_FIELDNAME' && !err.message.includes('Duplicate column')) {
          console.error(`Error on query: ${query}`);
          console.error(err.message);
        }
      }
    }
    
    console.log('Update complete.');
    process.exit(0);
  } catch (error) {
    console.error('Error updating schema:', error);
    process.exit(1);
  }
}

updateSchema();
