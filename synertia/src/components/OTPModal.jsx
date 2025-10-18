import React, { useState, useEffect, useRef } from 'react';
import { Mail, Clock, RefreshCw, X, Shield } from 'lucide-react';

export default function OTPModal({ 
    isOpen, 
    onClose, 
    userData, 
    onOTPVerified 
}) {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [otpId, setOtpId] = useState(null);
    const [timeLeft, setTimeLeft] = useState(60);
    const [rateLimitTime, setRateLimitTime] = useState(0); // For resend rate limiting
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [attemptsRemaining, setAttemptsRemaining] = useState(3);
    
    const inputRefs = useRef([]);
    const timerRef = useRef(null);
    const rateLimitTimerRef = useRef(null);

    // Request OTP when modal opens
    useEffect(() => {
        if (isOpen && userData) {
            // Reset all states when modal opens
            setOtp(['', '', '', '', '', '']);
            setTimeLeft(60);
            setRateLimitTime(0);
            setError('');
            setSuccess('');
            setAttemptsRemaining(3);
            requestOTP();
        }
        
        // Cleanup timers when modal closes
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (rateLimitTimerRef.current) clearInterval(rateLimitTimerRef.current);
        };
    }, [isOpen, userData]);

    // OTP expiry timer countdown
    useEffect(() => {
        if (isOpen && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            
            return () => {
                if (timerRef.current) clearInterval(timerRef.current);
            };
        }
    }, [isOpen, timeLeft > 0]);

    // Rate limit timer countdown
    useEffect(() => {
        if (rateLimitTime > 0) {
            rateLimitTimerRef.current = setInterval(() => {
                setRateLimitTime((prev) => {
                    if (prev <= 1) {
                        clearInterval(rateLimitTimerRef.current);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            
            return () => {
                if (rateLimitTimerRef.current) clearInterval(rateLimitTimerRef.current);
            };
        }
    }, [rateLimitTime > 0]);

    const requestOTP = async () => {
        try {
            setError('');
            setSuccess('');
            
            const response = await fetch('http://localhost:8000/api/otp/request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userData.id,
                    email: userData.email,
                    userName: userData.name,
                    userRole: userData.role
                })
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle rate limiting error
                if (response.status === 429 && data.remainingTime) {
                    setRateLimitTime(data.remainingTime);
                    setError(data.error);
                } else {
                    throw new Error(data.error || 'Failed to send OTP');
                }
                return;
            }

            setOtpId(data.otpId);
            setTimeLeft(data.expiresIn || 60);
            setRateLimitTime(30); // Set 30-second rate limit
            setSuccess('OTP sent successfully to your email!');
            
            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.message || 'Failed to send OTP. Please check your email configuration.');
        }
    };

    const handleResendOTP = async () => {
        try {
            setIsResending(true);
            setError('');
            setSuccess('');
            setOtp(['', '', '', '', '', '']);
            
            const response = await fetch('http://localhost:8000/api/otp/resend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userData.id,
                    email: userData.email,
                    userName: userData.name,
                    userRole: userData.role
                })
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle rate limiting error
                if (response.status === 429 && data.remainingTime) {
                    setRateLimitTime(data.remainingTime);
                    setError(data.error);
                } else {
                    throw new Error(data.error || 'Failed to resend OTP');
                }
                return;
            }

            setOtpId(data.otpId);
            setTimeLeft(data.expiresIn || 60);
            setRateLimitTime(30); // Reset 30-second rate limit
            setAttemptsRemaining(3);
            setSuccess('New OTP sent successfully!');
            
            // Focus first input
            setTimeout(() => {
                inputRefs.current[0]?.focus();
                setSuccess('');
            }, 2000);
        } catch (err) {
            setError(err.message || 'Failed to resend OTP');
        } finally {
            setIsResending(false);
        }
    };

    const handleOTPChange = (index, value) => {
        if (!/^\d*$/.test(value)) return; // Only allow digits

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-verify when all 6 digits are entered
        if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
            handleVerifyOTP(newOtp.join(''));
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = pastedData.split('');
        setOtp([...newOtp, ...Array(6 - newOtp.length).fill('')]);
        
        if (newOtp.length === 6) {
            handleVerifyOTP(pastedData);
        }
    };

    const handleVerifyOTP = async (otpCode = otp.join('')) => {
        if (otpCode.length !== 6) {
            setError('Please enter all 6 digits');
            return;
        }

        try {
            setIsVerifying(true);
            setError('');

            const response = await fetch('http://localhost:8000/api/otp/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    otpId,
                    otp: otpCode,
                    userId: userData.id
                })
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.attemptsRemaining !== undefined) {
                    setAttemptsRemaining(data.attemptsRemaining);
                }
                throw new Error(data.error || 'Invalid OTP');
            }

            // OTP verified successfully
            setSuccess('OTP verified! Logging in...');
            
            // Call the onOTPVerified callback to complete login
            setTimeout(() => {
                onOTPVerified(userData.id);
            }, 1000);

        } catch (err) {
            setError(err.message);
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } finally {
            setIsVerifying(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-900 to-blue-600 text-white p-6 rounded-t-2xl relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-1"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <div className="flex items-center justify-center mb-2">
                        <Shield className="w-12 h-12" />
                    </div>
                    <h2 className="text-2xl font-bold text-center">Verify OTP</h2>
                    <p className="text-center text-sm opacity-90 mt-2">
                        We've sent a 6-digit code to
                    </p>
                    <p className="text-center font-semibold">{userData?.email}</p>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    {/* Success Message */}
                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center">
                            <Mail className="w-5 h-5 mr-2" />
                            {success}
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                            {attemptsRemaining < 3 && (
                                <p className="text-sm mt-1">
                                    Attempts remaining: {attemptsRemaining}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Rate Limit Warning */}
                    {rateLimitTime > 0 && (
                        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                            Please wait {rateLimitTime} seconds before requesting a new OTP
                        </div>
                    )}

                    {/* Timer */}
                    <div className="flex items-center justify-center space-x-2">
                        <Clock className={`w-5 h-5 ${timeLeft < 20 ? 'text-red-500' : 'text-blue-600'}`} />
                        <span className={`font-mono text-2xl font-bold ${timeLeft < 20 ? 'text-red-500' : 'text-blue-600'}`}>
                            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                        </span>
                    </div>

                    {/* OTP Input */}
                    <div className="flex justify-center space-x-3" onPaste={handlePaste}>
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleOTPChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-14 text-center text-2xl font-bold border-2 border-blue-300 rounded-lg focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                disabled={isVerifying || timeLeft === 0}
                            />
                        ))}
                    </div>

                    {/* Verify Button */}
                    <button
                        onClick={() => handleVerifyOTP()}
                        disabled={otp.join('').length !== 6 || isVerifying || timeLeft === 0}
                        className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {isVerifying ? 'Verifying...' : 'Verify OTP'}
                    </button>

                    {/* Resend OTP */}
                    <div className="text-center">
                        <button
                            onClick={handleResendOTP}
                            disabled={isResending || rateLimitTime > 0}
                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center mx-auto disabled:text-gray-400 disabled:cursor-not-allowed"
                        >
                            <RefreshCw className={`w-4 h-4 mr-2 ${isResending ? 'animate-spin' : ''}`} />
                            {isResending ? 'Sending...' : 'Resend OTP'}
                        </button>
                        {rateLimitTime > 0 && (
                            <p className="text-xs text-gray-500 mt-1">
                                Available in {rateLimitTime}s
                            </p>
                        )}
                    </div>

                    {/* User Info */}
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <p className="text-sm text-gray-600">Logging in as</p>
                        <p className="font-bold text-gray-800">{userData?.name}</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                            userData?.role === 'manager' 
                                ? 'bg-red-100 text-red-700' 
                                : 'bg-green-100 text-green-700'
                        }`}>
                            {userData?.role?.toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
