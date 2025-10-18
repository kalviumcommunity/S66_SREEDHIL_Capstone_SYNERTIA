#!/bin/bash

# Authentication System Test Script
# This script tests the updated authentication with USERNAME login

echo "🧪 Testing SYNERTIA Authentication System"
echo "=========================================="
echo ""

BASE_URL="http://localhost:8000/api"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📋 Test 1: Register New User with Username${NC}"
echo "-------------------------------------------"
REGISTER_RESPONSE=$(curl -s -X POST ${BASE_URL}/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Manager",
    "username": "testmanager",
    "email": "manager@test.com",
    "password": "password123",
    "role": "manager"
  }')

echo "Response: $REGISTER_RESPONSE"
echo ""

echo -e "${YELLOW}📋 Test 2: Login with Username (not email)${NC}"
echo "-------------------------------------------"
LOGIN_RESPONSE=$(curl -s -X POST ${BASE_URL}/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testmanager",
    "password": "password123"
  }')

echo "Response: $LOGIN_RESPONSE"
echo ""

# Extract access token (requires jq - install with: npm install -g jq or apt-get install jq)
if command -v jq &> /dev/null; then
    ACCESS_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.accessToken')
    
    if [ "$ACCESS_TOKEN" != "null" ] && [ "$ACCESS_TOKEN" != "" ]; then
        echo -e "${GREEN}✅ Login successful! Token received.${NC}"
        echo ""
        
        echo -e "${YELLOW}📋 Test 3: Access Protected Route${NC}"
        echo "-------------------------------------------"
        USER_RESPONSE=$(curl -s -X GET ${BASE_URL}/auth/user \
          -H "Authorization: Bearer $ACCESS_TOKEN")
        
        echo "Response: $USER_RESPONSE"
        echo ""
        
        # Check if username is in response
        if echo "$USER_RESPONSE" | grep -q "testmanager"; then
            echo -e "${GREEN}✅ Protected route works! Username found in response.${NC}"
        else
            echo -e "${RED}❌ Username not found in user response${NC}"
        fi
    else
        echo -e "${RED}❌ Login failed - no token received${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Install 'jq' to enable token extraction and protected route test${NC}"
    echo "   Install: npm install -g jq  OR  apt-get install jq"
fi

echo ""
echo "=========================================="
echo -e "${GREEN}🎉 Testing Complete!${NC}"
echo ""
echo "Manual Tests:"
echo "1. Open http://localhost:5173/login"
echo "2. You should see 'Username' field (not 'Email')"
echo "3. Enter username: testmanager"
echo "4. Enter password: password123"
echo "5. Select role: Manager"
echo "6. Click Sign in"
echo "7. Should redirect to /manager dashboard"
