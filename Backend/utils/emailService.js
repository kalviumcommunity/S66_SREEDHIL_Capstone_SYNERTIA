const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
    // Validate email configuration
    if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'your-email@gmail.com') {
        throw new Error('❌ EMAIL_USER not configured in .env file. Please set your actual Gmail address.');
    }
    
    if (!process.env.EMAIL_APP_PASSWORD || process.env.EMAIL_APP_PASSWORD === 'your-16-digit-app-password') {
        throw new Error('❌ EMAIL_APP_PASSWORD not configured in .env file. Please generate Gmail App Password from https://myaccount.google.com/apppasswords');
    }

    console.log('📧 Email Configuration:');
    console.log('   - Email User:', process.env.EMAIL_USER);
    console.log('   - App Password:', process.env.EMAIL_APP_PASSWORD ? '✅ Set (length: ' + process.env.EMAIL_APP_PASSWORD.length + ')' : '❌ Not set');
    
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASSWORD // Use App Password, not regular password
        }
    });
};

// Send OTP email
const sendOTPEmail = async (email, otp, userName, userRole) => {
    try {
        const transporter = createTransporter();

        const mailOptions = {
            from: `SYNERTIA <${process.env.EMAIL_USER}>`,
            to: email,
            subject: '🔐 Your SYNERTIA Login OTP Code',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body {
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            background-color: #f4f7fa;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            max-width: 600px;
                            margin: 40px auto;
                            background-color: #ffffff;
                            border-radius: 12px;
                            overflow: hidden;
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
                            color: white;
                            padding: 30px 20px;
                            text-align: center;
                        }
                        .header h1 {
                            margin: 0;
                            font-size: 28px;
                            font-weight: 700;
                        }
                        .header p {
                            margin: 5px 0 0;
                            font-size: 14px;
                            opacity: 0.9;
                        }
                        .content {
                            padding: 40px 30px;
                        }
                        .greeting {
                            font-size: 18px;
                            color: #1e293b;
                            margin-bottom: 20px;
                        }
                        .message {
                            color: #475569;
                            line-height: 1.6;
                            margin-bottom: 30px;
                        }
                        .otp-box {
                            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
                            border: 2px solid #3b82f6;
                            border-radius: 10px;
                            padding: 25px;
                            text-align: center;
                            margin: 30px 0;
                        }
                        .otp-label {
                            color: #1e40af;
                            font-size: 14px;
                            font-weight: 600;
                            margin-bottom: 10px;
                            text-transform: uppercase;
                            letter-spacing: 1px;
                        }
                        .otp-code {
                            font-size: 36px;
                            font-weight: 700;
                            color: #1e3a8a;
                            letter-spacing: 8px;
                            font-family: 'Courier New', monospace;
                            margin: 10px 0;
                        }
                        .timer {
                            color: #dc2626;
                            font-size: 14px;
                            font-weight: 600;
                            margin-top: 10px;
                        }
                        .role-badge {
                            display: inline-block;
                            background: ${userRole === 'manager' ? '#dc2626' : '#059669'};
                            color: white;
                            padding: 5px 15px;
                            border-radius: 20px;
                            font-size: 12px;
                            font-weight: 600;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                        }
                        .warning-box {
                            background-color: #fef3c7;
                            border-left: 4px solid #f59e0b;
                            padding: 15px;
                            margin: 20px 0;
                            border-radius: 5px;
                        }
                        .warning-box p {
                            margin: 0;
                            color: #92400e;
                            font-size: 14px;
                        }
                        .footer {
                            background-color: #f8fafc;
                            padding: 20px;
                            text-align: center;
                            border-top: 1px solid #e2e8f0;
                        }
                        .footer p {
                            margin: 5px 0;
                            color: #64748b;
                            font-size: 13px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🔐 SYNERTIA</h1>
                            <p>Dynamic Workforce Assignment System</p>
                        </div>
                        
                        <div class="content">
                            <p class="greeting">Hello <strong>${userName}</strong>! <span class="role-badge">${userRole}</span></p>
                            
                            <p class="message">
                                You are attempting to log in to your SYNERTIA account. 
                                To complete the authentication process, please use the One-Time Password (OTP) below:
                            </p>
                            
                            <div class="otp-box">
                                <p class="otp-label">Your OTP Code</p>
                                <div class="otp-code">${otp}</div>
                                <p class="timer">⏱️ Valid for 60 seconds</p>
                            </div>
                            
                            <div class="warning-box">
                                <p><strong>⚠️ Security Notice:</strong> If you did not initiate this login request, please ignore this email and secure your account immediately.</p>
                            </div>
                            
                            <p class="message" style="margin-top: 20px;">
                                This OTP is for single use only and will expire in <strong>1 minute</strong>. 
                                For your security, never share this code with anyone.
                            </p>
                        </div>
                        
                        <div class="footer">
                            <p><strong>SYNERTIA Team</strong></p>
                            <p>Dynamic Workforce Management Platform</p>
                            <p style="color: #94a3b8; font-size: 12px; margin-top: 10px;">
                                This is an automated message. Please do not reply to this email.
                            </p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ OTP Email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
};

module.exports = { sendOTPEmail };
