require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

async function checkPassword() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/synertia');
        console.log('Connected to MongoDB\n');
        
        // Find the user "Albs"
        const user = await User.findOne({ name: 'Albs' });
        
        if (!user) {
            console.log('User "Albs" not found!');
            await mongoose.disconnect();
            return;
        }
        
        console.log('=== USER FOUND ===');
        console.log('Name:', user.name);
        console.log('Email:', user.email);
        console.log('Username:', user.username);
        console.log('Role:', user.role);
        console.log('Has Manual Password:', user.hasManualPassword);
        console.log('Is Google Auth:', user.isGoogleAuth);
        console.log('\n=== PASSWORD TESTING ===');
        
        // Test if password matches email
        const emailMatch = await bcrypt.compare('albinalbs845@gmail.com', user.password);
        console.log('Does "albinalbs845@gmail.com" match stored password?', emailMatch ? '✅ YES' : '❌ NO');
        
        // Test various common passwords (if it was set manually)
        const testPasswords = ['Albs', 'albs', 'password', '123456'];
        for (const testPwd of testPasswords) {
            const match = await bcrypt.compare(testPwd, user.password);
            if (match) {
                console.log(`✅ PASSWORD FOUND: "${testPwd}" matches!`);
            }
        }
        
        console.log('\n=== DIAGNOSIS ===');
        console.log('Stored password hash (first 20 chars):', user.password.substring(0, 20) + '...');
        console.log('Password hash length:', user.password.length);
        
        await mongoose.disconnect();
        console.log('\nDisconnected from MongoDB');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkPassword();
