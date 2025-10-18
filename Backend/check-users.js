require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function checkUsers() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/synertia');
        console.log('Connected to MongoDB');
        
        const users = await User.find({}).select('name username email role');
        
        console.log('\n=== USERS IN DATABASE ===\n');
        users.forEach((user, index) => {
            console.log(`User ${index + 1}:`);
            console.log(`  Name: "${user.name}" (length: ${user.name.length})`);
            console.log(`  Username: "${user.username}"`);
            console.log(`  Email: "${user.email}"`);
            console.log(`  Role: "${user.role}"`);
            console.log('---');
        });
        
        await mongoose.disconnect();
        console.log('\nDisconnected from MongoDB');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkUsers();
