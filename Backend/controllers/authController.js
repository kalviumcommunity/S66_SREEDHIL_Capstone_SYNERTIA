const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation/authValidation");

const register = async (req, res) => {
    try {
        // Joi validation
        const { error } = registerValidation(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name, email, role, googleId, isGoogleAuth, adminCode } = req.body;
        
        // Validate manager admin code for manager registration
        if (role === 'manager') {
            if (!adminCode || adminCode !== process.env.MANAGER_ADMIN_CODE) {
                return res.status(403).json({ 
                    error: "Invalid admin code. Manager registration requires a valid authorization code from the CEO."
                });
            }
        }
        
        // Check if EMAIL already exists (names can be duplicate - many people share same names)
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // If it's a Google auth registration and user exists
            if (isGoogleAuth && existingUser.googleId === googleId) {
                // User already exists with this Google account
                return res.status(400).json({ 
                    error: `This Google account is already registered as ${existingUser.role}`,
                    existingRole: existingUser.role
                });
            }
            
            // Email must be unique
            return res.status(400).json({ error: "Email already exists. Please use a different email address." });
        }

        // Hash the EMAIL as password (email is used for login authentication)
        const hashedPassword = await bcrypt.hash(email, 10);
        
        // Generate username from email (before @ symbol)
        const username = email.split('@')[0];
        
        const user = new User({ 
            name, 
            username, // Auto-generated from email
            email, 
            password: hashedPassword, // Email hashed as password
            role,
            googleId: googleId || null,
            isGoogleAuth: isGoogleAuth || false,
            hasManualPassword: !isGoogleAuth, // True for manual registration
            profileCompleted: !isGoogleAuth // True for manual, false for OAuth
        });

        await user.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Registration failed" });
    }
};

const login = async (req, res) => {
    try {
        console.log("Login request received", req.body);

        // Joi validation
        const { error } = loginValidation(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { username, password } = req.body;
        
        console.log("\n=== LOGIN ATTEMPT ===");
        console.log("Provided username:", `"${username}"`);
        console.log("Username length:", username.length);
        console.log("Provided password (first 3 chars):", password.substring(0, 3) + '***');
        
        // STRICT EXACT MATCH: Find user where name field EXACTLY equals username input
        // This is case-sensitive and space-sensitive
        const user = await User.findOne({ name: username });

        if (!user) {
            console.log("❌ USER NOT FOUND - No exact match for name:", `"${username}"`);
            console.log("Available names in database:");
            const allUsers = await User.find({}).select('name');
            allUsers.forEach(u => console.log(`  - "${u.name}"`));
            
            return res.status(404).json({ 
                error: "User not found. Please enter your name EXACTLY as it appears in the dashboard (including spaces and capitalization)." 
            });
        }

        console.log("✅ EXACT MATCH FOUND:");
        console.log("  Database name:", `"${user.name}"`);
        console.log("  Name matches:", user.name === username);
        console.log("  User details:", { 
            email: user.email, 
            role: user.role,
            hasManualPassword: user.hasManualPassword 
        });

        // Verify password - compare provided password with hashed password in database
        // For backwards compatibility, this works with both email-hashed and password-hashed users
        const isMatch = await bcrypt.compare(password, user.password);
        
        console.log("\n=== PASSWORD VERIFICATION ===");
        console.log("Password matches:", isMatch);
        
        if (!isMatch) {
            console.log("❌ INVALID PASSWORD - Password does not match");
            return res.status(401).json({ 
                error: "Invalid credentials. Please check your email/password." 
            });
        }

        console.log("✅ AUTHENTICATION SUCCESSFUL - Proceeding to OTP");
        console.log("=== END LOGIN ATTEMPT ===\n");
        
        // Return user data for OTP verification flow
        res.status(200).json({
            message: "Credentials validated. OTP verification required.",
            requireOTP: true,
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("❌ LOGIN FAILED - Server error:", error);
        res.status(500).json({ error: "Login failed" });
    }
};

// Complete login after OTP verification
const completeLogin = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Generate JWT tokens
        const accessToken = jwt.sign(
            { userId: user._id, username: user.username, email: user.email, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        );

        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
        );

        // Save refresh token to database
        user.refreshToken = refreshToken;
        await user.save();

        console.log("Login completed successfully for user:", user.username);
        
        res.status(200).json({
            message: "Login successful",
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                role: user.role,
                profileCompleted: user.profileCompleted,
                gender: user.gender,
                dateOfBirth: user.dateOfBirth
            }
        });

    } catch (error) {
        console.error("Complete login failed", error);
        res.status(500).json({ error: "Failed to complete login" });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user data" });
    }
};

const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({ error: "Refresh token required" });
        }

        // Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        
        // Find user and check if refresh token matches
        const user = await User.findById(decoded.userId);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ error: "Invalid refresh token" });
        }

        // Generate new access token
        const accessToken = jwt.sign(
            { userId: user._id, username: user.username, email: user.email, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ accessToken });
    } catch (error) {
        console.error("Refresh token error:", error);
        res.status(403).json({ error: "Invalid or expired refresh token" });
    }
};

const googleAuth = async (req, res) => {
    try {
        const { googleId, email, name, role, adminCode } = req.body;

        console.log("Google auth request:", { googleId, email, name, role });

        if (!googleId || !email || !name || !role) {
            return res.status(400).json({ error: "Missing required Google user data" });
        }

        // CRITICAL: Check if user exists with this Google ID OR email
        let user = await User.findOne({ 
            $or: [
                { googleId: googleId },
                { email: email }
            ]
        });

        if (user) {
            console.log("Existing user found:", { id: user._id, role: user.role, googleId: user.googleId });
            
            // If user was found by email but doesn't have googleId, link the Google account
            if (!user.googleId && user.email === email) {
                console.log("Linking Google account to existing user");
                user.googleId = googleId;
                user.isGoogleAuth = true;
                await user.save();
            }
            
            // User exists - verify role matches
            if (user.role !== role) {
                console.log("Role mismatch:", { requestedRole: role, existingRole: user.role });
                return res.status(403).json({ 
                    error: `This account is registered as ${user.role}. You cannot login as ${role} with this account.`,
                    existingRole: user.role
                });
            }

            // Existing user - return for OTP verification (NO admin code check)
            console.log("Google login successful for existing user - OTP required");
            return res.status(200).json({
                message: "Credentials validated. OTP verification required.",
                requireOTP: true,
                user: {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            });
        }

        // NEW USER REGISTRATION
        // Validate manager admin code ONLY for NEW manager registrations
        if (role === 'manager') {
            if (!adminCode || adminCode !== process.env.MANAGER_ADMIN_CODE) {
                return res.status(403).json({ 
                    error: "Invalid admin code. Manager registration requires a valid authorization code from the CEO. Please use the Manager Registration page."
                });
            }
        }
        
        // User doesn't exist - create new user
        console.log("Creating new Google user with role:", role);
        
        // Generate unique username from email + random string to avoid collisions
        const baseUsername = email.split('@')[0];
        let username = baseUsername;
        let usernameExists = await User.findOne({ username });
        let counter = 1;
        
        // Keep trying until we find a unique username
        while (usernameExists) {
            username = `${baseUsername}${counter}`;
            usernameExists = await User.findOne({ username });
            counter++;
        }
        
        console.log("Generated unique username:", username);
        
        // Hash EMAIL as password (for consistent login experience)
        const hashedPassword = await bcrypt.hash(email, 10);

        user = new User({
            name,
            username,
            email,
            password: hashedPassword, // Email hashed as password
            role: role,
            googleId,
            isGoogleAuth: true,
            hasManualPassword: false,
            profileCompleted: true // Auto-complete for OAuth users
        });

        await user.save();
        console.log("New Google user created - OTP required", { id: user._id, username, role });

        // Return user data for OTP verification flow
        res.status(201).json({
            message: "Credentials validated. OTP verification required.",
            requireOTP: true,
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Google auth error:", error);
        
        // Handle duplicate key errors specifically
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({ 
                error: `This ${field} is already registered. Please use a different account.`
            });
        }
        
        res.status(500).json({ error: "Google authentication failed" });
    }
};

const completeProfile = async (req, res) => {
    try {
        const { userId } = req.user; // From auth middleware
        const { name, gender, dateOfBirth } = req.body;

        if (!name || !gender || !dateOfBirth) {
            return res.status(400).json({ error: "Name, gender, and date of birth are required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update user profile
        user.name = name;
        user.gender = gender;
        user.dateOfBirth = new Date(dateOfBirth);
        user.profileCompleted = true;
        
        await user.save();

        res.status(200).json({
            message: "Profile completed successfully",
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                role: user.role,
                profileCompleted: user.profileCompleted,
                gender: user.gender,
                dateOfBirth: user.dateOfBirth
            }
        });
    } catch (error) {
        console.error("Profile completion error:", error);
        res.status(500).json({ error: "Failed to complete profile" });
    }
};

module.exports = { register, login, completeLogin, getUser, refreshToken, googleAuth, completeProfile };