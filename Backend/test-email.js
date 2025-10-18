// Test Email Configuration Script
// Run this to verify your Gmail App Password is working

require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('\n🔍 Testing Email Configuration...\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Check environment variables
console.log('📋 Configuration Check:');
console.log('   EMAIL_USER:', process.env.EMAIL_USER || '❌ NOT SET');
console.log('   EMAIL_APP_PASSWORD:', process.env.EMAIL_APP_PASSWORD ? `✅ Set (length: ${process.env.EMAIL_APP_PASSWORD.length})` : '❌ NOT SET');
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Validate configuration
if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'your-email@gmail.com') {
    console.error('❌ ERROR: EMAIL_USER not configured!');
    console.error('   Please update Backend/.env with your actual Gmail address\n');
    process.exit(1);
}

if (!process.env.EMAIL_APP_PASSWORD || process.env.EMAIL_APP_PASSWORD === 'your-16-digit-app-password') {
    console.error('❌ ERROR: EMAIL_APP_PASSWORD not configured!');
    console.error('   Please update Backend/.env with your Gmail App Password');
    console.error('   Get it from: https://myaccount.google.com/apppasswords\n');
    process.exit(1);
}

if (process.env.EMAIL_APP_PASSWORD.length !== 16) {
    console.warn('⚠️  WARNING: App Password should be 16 characters (no spaces)');
    console.warn(`   Current length: ${process.env.EMAIL_APP_PASSWORD.length}`);
    console.warn('   Make sure to remove all spaces from the password\n');
}

// Test email sending
const testEmail = async () => {
    console.log('📧 Attempting to send test email...\n');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    });

    try {
        const info = await transporter.sendMail({
            from: `SYNERTIA <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Send to yourself for testing
            subject: '✅ Test Email - SYNERTIA OTP System',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; border-radius: 10px; text-align: center;">
                        <h1 style="margin: 0;">✅ Success!</h1>
                        <p style="margin: 10px 0 0; opacity: 0.9;">Email Configuration Working</p>
                    </div>
                    <div style="padding: 30px; background: #f8fafc; border-radius: 10px; margin-top: 20px;">
                        <h2 style="color: #1e293b;">🎉 SYNERTIA Email System Configured</h2>
                        <p style="color: #475569; line-height: 1.6;">
                            If you received this email, your Gmail SMTP configuration is working correctly!
                        </p>
                        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <p style="margin: 0; color: #059669; font-weight: bold;">✅ Email User: ${process.env.EMAIL_USER}</p>
                            <p style="margin: 10px 0 0; color: #059669; font-weight: bold;">✅ App Password: Configured</p>
                        </div>
                        <p style="color: #475569;">
                            <strong>Next Step:</strong> Your OTP system is ready to use!
                        </p>
                        <p style="color: #64748b; font-size: 14px; margin-top: 20px;">
                            This is a test email from SYNERTIA Backend. You can safely ignore it.
                        </p>
                    </div>
                </div>
            `
        });
        
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        console.log('✅ EMAIL SENT SUCCESSFULLY!\n');
        console.log('📬 Message ID:', info.messageId);
        console.log('📧 Sent to:', process.env.EMAIL_USER);
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        console.log('🎉 Your email configuration is working correctly!');
        console.log('📥 Check your inbox (and spam folder) for the test email\n');
        console.log('✅ OTP system is ready to use!\n');
        
    } catch (error) {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        console.error('❌ EMAIL SENDING FAILED!\n');
        console.error('Error:', error.message);
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        // Provide specific solutions based on error
        if (error.message.includes('Invalid login')) {
            console.error('🔧 SOLUTION:');
            console.error('   1. Verify your Gmail App Password is correct');
            console.error('   2. Make sure you removed all spaces (should be 16 characters)');
            console.error('   3. Generate a new App Password: https://myaccount.google.com/apppasswords');
            console.error('   4. Update Backend/.env with the new password');
            console.error('   5. Restart this test\n');
        } else if (error.message.includes('ETIMEDOUT') || error.message.includes('ECONNREFUSED')) {
            console.error('🔧 SOLUTION:');
            console.error('   1. Check your internet connection');
            console.error('   2. Check if firewall is blocking port 587');
            console.error('   3. Try from a different network\n');
        } else {
            console.error('🔧 SOLUTION:');
            console.error('   1. Check Backend/.env has correct values');
            console.error('   2. Ensure 2-Step Verification is enabled on your Google Account');
            console.error('   3. Generate App Password: https://myaccount.google.com/apppasswords');
            console.error('   4. See EMAIL_SETUP_TROUBLESHOOTING.md for detailed help\n');
        }
    }
};

testEmail();
