const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes('xxxxx')) {
      console.warn('⚠️  MongoDB URI not configured. Skipping database connection.');
      console.warn('   Update MONGODB_URI in .env file to connect to database.');
      return null;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn('⚠️  Running in offline mode. Database features unavailable.');
    // Don't exit - allow app to run without database for development
    return null;
  }
};

module.exports = connectDB;
