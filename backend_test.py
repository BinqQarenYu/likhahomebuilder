#!/usr/bin/env python3
"""
Backend API Testing Suite for Likha Home Builders
Tests all API endpoints at https://steel-house-project.preview.likhatechbuilder.com/api
"""

import requests
import json
import time
from datetime import datetime

# Base URL from frontend .env
BASE_URL = "https://steel-house-project.preview.likhatechbuilder.com/api"

# Test data
TEST_CONTACT_DATA = {
    "name": "Maria Santos",
    "email": "maria.santos@example.com", 
    "phone": "+63 912 345 6789",
    "subject": "Modular House Inquiry",
    "message": "Hello, I'm interested in your modular house designs. Can you provide more information about the pricing and construction timeline? I'm looking for a 2-bedroom setup for my family."
}

TEST_NEWSLETTER_DATA = {
    "email": "newsletter.subscriber@example.com"
}

TEST_PURCHASE_DATA = {
    "name": "Juan Dela Cruz",
    "email": "juan.buyer@example.com",
    "phone": "+63 912 123 4567", 
    "project_interest": "combo",
    "message": "I'm interested in the 4 projects combo package. I have a 500 sqm lot and would like to know about customization options."
}

def test_health_check():
    """Test the health check endpoint"""
    print("\n=== Testing Health Check Endpoint ===")
    try:
        response = requests.get(f"{BASE_URL}/", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if "message" in data and "status" in data and "version" in data:
                print("✅ Health check passed")
                return True
            else:
                print("❌ Health check response missing required fields")
                return False
        else:
            print("❌ Health check failed")
            return False
            
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False

def test_contact_form_submission():
    """Test contact form submission"""
    print("\n=== Testing Contact Form Submission ===")
    try:
        response = requests.post(
            f"{BASE_URL}/contact",
            json=TEST_CONTACT_DATA,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 201:
            data = response.json()
            if all(key in data for key in ["id", "name", "email", "subject", "message", "created_at"]):
                print("✅ Contact form submission successful")
                return True, data["id"]
            else:
                print("❌ Contact form response missing required fields")
                return False, None
        else:
            print("❌ Contact form submission failed")
            return False, None
            
    except Exception as e:
        print(f"❌ Contact form error: {e}")
        return False, None

def test_get_all_contacts():
    """Test getting all contacts"""
    print("\n=== Testing Get All Contacts ===")
    try:
        response = requests.get(f"{BASE_URL}/contact", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Number of contacts: {len(data)}")
            
            # Check if our test contact is in the list
            test_contact_found = False
            for contact in data:
                if contact.get("email") == TEST_CONTACT_DATA["email"]:
                    test_contact_found = True
                    print(f"✅ Test contact found in list: {contact.get('name')}")
                    break
            
            if test_contact_found:
                print("✅ Get all contacts successful - test data verified")
                return True
            else:
                print("⚠️ Get all contacts successful but test data not found (may be expected)")
                return True
        else:
            print("❌ Get all contacts failed")
            return False
            
    except Exception as e:
        print(f"❌ Get contacts error: {e}")
        return False

def test_newsletter_subscription():
    """Test newsletter subscription"""
    print("\n=== Testing Newsletter Subscription ===")
    try:
        response = requests.post(
            f"{BASE_URL}/newsletter",
            json=TEST_NEWSLETTER_DATA,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 201:
            data = response.json()
            if all(key in data for key in ["id", "email", "subscribed_at", "is_active"]):
                print("✅ Newsletter subscription successful")
                return True
            else:
                print("❌ Newsletter response missing required fields")
                return False
        else:
            print("❌ Newsletter subscription failed")
            return False
            
    except Exception as e:
        print(f"❌ Newsletter error: {e}")
        return False

def test_newsletter_duplicate():
    """Test newsletter duplicate email handling"""
    print("\n=== Testing Newsletter Duplicate Email ===")
    try:
        # Try to subscribe with same email again
        response = requests.post(
            f"{BASE_URL}/newsletter",
            json=TEST_NEWSLETTER_DATA,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 400:
            data = response.json()
            if "detail" in data and "already subscribed" in data["detail"].lower():
                print("✅ Duplicate email handling working correctly")
                return True
            else:
                print("❌ Duplicate email error message incorrect")
                return False
        else:
            print("❌ Duplicate email should return 400 error")
            return False
            
    except Exception as e:
        print(f"❌ Newsletter duplicate test error: {e}")
        return False

def test_get_newsletter_subscribers():
    """Test getting all newsletter subscribers"""
    print("\n=== Testing Get Newsletter Subscribers ===")
    try:
        response = requests.get(f"{BASE_URL}/newsletter", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Number of subscribers: {len(data)}")
            
            # Check if our test subscriber is in the list
            test_subscriber_found = False
            for subscriber in data:
                if subscriber.get("email") == TEST_NEWSLETTER_DATA["email"]:
                    test_subscriber_found = True
                    print(f"✅ Test subscriber found: {subscriber.get('email')}")
                    break
            
            if test_subscriber_found:
                print("✅ Get newsletter subscribers successful - test data verified")
                return True
            else:
                print("⚠️ Get subscribers successful but test data not found")
                return True
        else:
            print("❌ Get newsletter subscribers failed")
            return False
            
    except Exception as e:
        print(f"❌ Get subscribers error: {e}")
        return False

def test_purchase_inquiry():
    """Test purchase inquiry submission"""
    print("\n=== Testing Purchase Inquiry Submission ===")
    try:
        response = requests.post(
            f"{BASE_URL}/purchase",
            json=TEST_PURCHASE_DATA,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 201:
            data = response.json()
            if all(key in data for key in ["id", "name", "email", "project_interest", "created_at"]):
                print("✅ Purchase inquiry submission successful")
                return True
            else:
                print("❌ Purchase inquiry response missing required fields")
                return False
        else:
            print("❌ Purchase inquiry submission failed")
            return False
            
    except Exception as e:
        print(f"❌ Purchase inquiry error: {e}")
        return False

def test_get_purchase_inquiries():
    """Test getting all purchase inquiries"""
    print("\n=== Testing Get Purchase Inquiries ===")
    try:
        response = requests.get(f"{BASE_URL}/purchase", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Number of inquiries: {len(data)}")
            
            # Check if our test inquiry is in the list
            test_inquiry_found = False
            for inquiry in data:
                if inquiry.get("email") == TEST_PURCHASE_DATA["email"]:
                    test_inquiry_found = True
                    print(f"✅ Test inquiry found: {inquiry.get('name')} - {inquiry.get('project_interest')}")
                    break
            
            if test_inquiry_found:
                print("✅ Get purchase inquiries successful - test data verified")
                return True
            else:
                print("⚠️ Get inquiries successful but test data not found")
                return True
        else:
            print("❌ Get purchase inquiries failed")
            return False
            
    except Exception as e:
        print(f"❌ Get inquiries error: {e}")
        return False

def run_all_tests():
    """Run all backend API tests"""
    print("🚀 Starting Likha Home Builders Backend API Testing")
    print(f"Base URL: {BASE_URL}")
    print(f"Timestamp: {datetime.now()}")
    
    test_results = {}
    
    # Test 1: Health Check
    test_results["health_check"] = test_health_check()
    
    # Test 2: Contact Form Submission
    test_results["contact_submission"], contact_id = test_contact_form_submission()
    
    # Test 3: Get All Contacts
    test_results["get_contacts"] = test_get_all_contacts()
    
    # Test 4: Newsletter Subscription
    test_results["newsletter_subscription"] = test_newsletter_subscription()
    
    # Test 5: Newsletter Duplicate Handling
    test_results["newsletter_duplicate"] = test_newsletter_duplicate()
    
    # Test 6: Get Newsletter Subscribers
    test_results["get_subscribers"] = test_get_newsletter_subscribers()
    
    # Test 7: Purchase Inquiry
    test_results["purchase_inquiry"] = test_purchase_inquiry()
    
    # Test 8: Get Purchase Inquiries
    test_results["get_inquiries"] = test_get_purchase_inquiries()
    
    # Summary
    print("\n" + "="*50)
    print("🎯 TEST RESULTS SUMMARY")
    print("="*50)
    
    passed = sum(test_results.values())
    total = len(test_results)
    
    for test_name, result in test_results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name.replace('_', ' ').title()}: {status}")
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All backend API tests PASSED!")
    else:
        print("⚠️ Some tests FAILED - check individual test outputs above")
    
    return test_results

if __name__ == "__main__":
    results = run_all_tests()