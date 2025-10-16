// src/utils/api.js
export const API_URL = "https://synertia.netlify.app"; // Adjust if deployed

export const loginUser = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    return response.json();
};
