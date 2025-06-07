import React, { useState } from 'react';
import { UserCircle, Lock } from 'lucide-react';

export default function Login() {
    const [role, setRole] = useState('employee');

    return (
        <div style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}>
            <div>
                <div>
                    <img src="logo-transparent-png.png" alt="logo"/>
                    <h1>Welcome to SYNERTIA</h1>
                    <p>Dynamic Workforce Assignment System</p>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        login(role);
                    }}
                >
                    <div>
                        <label>Username</label>
                        <div>
                            <UserCircle/>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label>Password</label>
                        <div>
                            <Lock/>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label>Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="employee">Employee</option>
                            <option value="manager">Manager</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
}
