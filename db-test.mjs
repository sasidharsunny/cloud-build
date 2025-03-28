import { Sequelize } from 'sequelize';

const connectionString = process.env.POSTGRES_CONNECTION_STRING;
console.log('Connection string:', connectionString);

const db = new Sequelize(connectionString, {
  logging: true,
  dialect: 'postgres',
  dialectOptions: {
    connectTimeout: 1000
  }
});

async function testConnection() {
  try {
    await db.authenticate();
    console.log('Connection successful!');
    
    // Test query
    const result = await db.query('SELECT NOW()');
    console.log('Database time:', result[0][0].now);
  } catch (error) {
    console.error('Connection error:', error.message);
    console.error('Error details:', error);
  }
}

testConnection();
