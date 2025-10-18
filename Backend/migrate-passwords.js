require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

async function migratePasswords() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/synertia');
        console.log('Connected to MongoDB\n');
        
        const users = await User.find({});
        console.log(`Found ${users.length} users to check\n`);
        
        let updatedCount = 0;
        
        for (const user of users) {
            console.log(`\nChecking user: ${user.name} (${user.email})`);
            
            // Test if email already matches password
            const emailMatch = await bcrypt.compare(user.email, user.password);
            
            if (emailMatch) {
                console.log(`  ✅ Already using email as password - no update needed`);
            } else {
                console.log(`  ⚠️  Password doesn't match email - UPDATING...`);
                
                // Hash the email as the new password
                const hashedEmail = await bcrypt.hash(user.email, 10);
                user.password = hashedEmail;
                await user.save();
                
                updatedCount++;
                console.log(`  ✅ Updated password to email hash`);
                
                // Verify the update
                const verifyMatch = await bcrypt.compare(user.email, user.password);
                console.log(`  Verification: ${verifyMatch ? '✅ SUCCESS' : '❌ FAILED'}`);
            }
        }
        
        console.log(`\n=== MIGRATION COMPLETE ===`);
        console.log(`Total users: ${users.length}`);
        console.log(`Updated: ${updatedCount}`);
        console.log(`Already correct: ${users.length - updatedCount}`);
        
        await mongoose.disconnect();
        console.log('\nDisconnected from MongoDB');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

console.log('=== PASSWORD MIGRATION SCRIPT ===');
console.log('This will update all user passwords to use email as the authentication method.');
console.log('Starting in 2 seconds...\n');

setTimeout(() => {
    migratePasswords();
}, 2000);
