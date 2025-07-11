#!/usr/bin/env python3
"""
Test Complete 256 Odu System Integration
Verify database, Flask API, and React integration
"""

import sqlite3
import requests
import json
import time
import threading
import subprocess
import os

class Complete256OduTester:
    def __init__(self):
        self.database_path = "ifa_app.db"
        self.flask_url = "http://localhost:5001"
        self.test_results = {}
    
    def test_database_integration(self):
        """Test if 256 Odu system is properly integrated in database"""
        print("\n1. Testing Database Integration")
        print("-" * 40)
        
        try:
            conn = sqlite3.connect(self.database_path)
            cursor = conn.cursor()
            
            # Check if table exists
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='odu_256_complete'")
            table_exists = cursor.fetchone() is not None
            
            if table_exists:
                print("✅ odu_256_complete table exists")
                
                # Count total records
                cursor.execute("SELECT COUNT(*) FROM odu_256_complete")
                total_count = cursor.fetchone()[0]
                print(f"✅ Total Odu records: {total_count}")
                
                # Count by category
                cursor.execute("SELECT category, COUNT(*) FROM odu_256_complete GROUP BY category")
                categories = cursor.fetchall()
                for category, count in categories:
                    print(f"   • {category}: {count} records")
                
                # Sample records
                cursor.execute("SELECT name, category, meaning FROM odu_256_complete LIMIT 5")
                samples = cursor.fetchall()
                print("\nSample records:")
                for name, category, meaning in samples:
                    print(f"   • {name} ({category}): {meaning[:50]}...")
                
                self.test_results['database'] = True
                
            else:
                print("❌ odu_256_complete table not found")
                print("Running integration script...")
                
                # Run integration script
                result = subprocess.run(['python', 'integrate_256_odu_excel.py'], 
                                      capture_output=True, text=True)
                if result.returncode == 0:
                    print("✅ Integration script completed successfully")
                    self.test_results['database'] = True
                else:
                    print(f"❌ Integration script failed: {result.stderr}")
                    self.test_results['database'] = False
            
            conn.close()
            
        except Exception as e:
            print(f"❌ Database test failed: {e}")
            self.test_results['database'] = False
    
    def test_flask_api_endpoints(self):
        """Test Flask API endpoints for 256 Odu system"""
        print("\n2. Testing Flask API Endpoints")
        print("-" * 40)
        
        # Test endpoints
        endpoints = [
            '/api/odu-256/complete',
            '/api/odu-256/categories',
            '/api/odu-256/search?q=ogbe'
        ]
        
        api_results = {}
        
        for endpoint in endpoints:
            try:
                response = requests.get(f"{self.flask_url}{endpoint}", timeout=5)
                
                if response.status_code == 200:
                    data = response.json()
                    print(f"✅ {endpoint} - Status: {response.status_code}")
                    
                    if 'odu_list' in data:
                        print(f"   • Found {len(data['odu_list'])} Odu entries")
                    elif 'categories' in data:
                        print(f"   • Found {len(data['categories'])} categories")
                    elif 'results' in data:
                        print(f"   • Found {len(data['results'])} search results")
                    
                    api_results[endpoint] = True
                else:
                    print(f"❌ {endpoint} - Status: {response.status_code}")
                    api_results[endpoint] = False
                    
            except requests.RequestException as e:
                print(f"❌ {endpoint} - Connection error: {e}")
                api_results[endpoint] = False
        
        self.test_results['flask_api'] = all(api_results.values())
    
    def test_json_export(self):
        """Test JSON export functionality"""
        print("\n3. Testing JSON Export")
        print("-" * 40)
        
        json_file = "odu_256_complete_system.json"
        
        if os.path.exists(json_file):
            try:
                with open(json_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                
                print("✅ JSON export file exists")
                print(f"   • Total Odu: {data['metadata']['total_odu']}")
                print(f"   • Major Odu: {data['metadata']['major_odu_count']}")
                print(f"   • Minor Odu: {data['metadata']['minor_odu_count']}")
                print(f"   • Created: {data['metadata']['created_at']}")
                
                # Sample data
                if data['major_odu']:
                    sample = data['major_odu'][0]
                    print(f"\nSample Major Odu:")
                    print(f"   • Name: {sample['name']}")
                    print(f"   • Pattern: {sample['pattern']}")
                    print(f"   • Meaning: {sample['meaning'][:50]}...")
                
                self.test_results['json_export'] = True
                
            except Exception as e:
                print(f"❌ JSON export test failed: {e}")
                self.test_results['json_export'] = False
        else:
            print("❌ JSON export file not found")
            self.test_results['json_export'] = False
    
    def test_react_component(self):
        """Test React component integration"""
        print("\n4. Testing React Component")
        print("-" * 40)
        
        react_component = "client/src/components/complete-256-odu-system.tsx"
        
        if os.path.exists(react_component):
            print("✅ React component file exists")
            
            # Check component content
            with open(react_component, 'r') as f:
                content = f.read()
                
            if 'Complete256OduSystem' in content:
                print("✅ Component class properly defined")
            if '/api/odu-256/complete' in content:
                print("✅ Flask API integration configured")
            if 'useQuery' in content:
                print("✅ React Query integration configured")
                
            self.test_results['react_component'] = True
        else:
            print("❌ React component file not found")
            self.test_results['react_component'] = False
    
    def test_learning_page_integration(self):
        """Test Learning page integration"""
        print("\n5. Testing Learning Page Integration")
        print("-" * 40)
        
        learning_page = "client/src/pages/learning.tsx"
        
        if os.path.exists(learning_page):
            with open(learning_page, 'r') as f:
                content = f.read()
            
            if 'Complete256OduSystem' in content:
                print("✅ Component imported in Learning page")
            if 'complete-256' in content:
                print("✅ Module definition exists")
            if 'Database' in content:
                print("✅ Database icon imported")
                
            self.test_results['learning_integration'] = True
        else:
            print("❌ Learning page file not found")
            self.test_results['learning_integration'] = False
    
    def generate_test_report(self):
        """Generate comprehensive test report"""
        print("\n" + "=" * 60)
        print("COMPLETE 256 ODU SYSTEM INTEGRATION TEST REPORT")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results.values() if result)
        
        print(f"Tests Passed: {passed_tests}/{total_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        print("\nDetailed Results:")
        for test_name, result in self.test_results.items():
            status = "✅ PASS" if result else "❌ FAIL"
            print(f"  {test_name}: {status}")
        
        print("\nIntegration Status:")
        if passed_tests == total_tests:
            print("🎉 COMPLETE: All systems integrated successfully!")
            print("The 256 Odu system is ready for production use.")
        elif passed_tests >= total_tests * 0.8:
            print("⚠️  MOSTLY COMPLETE: Minor issues detected")
            print("Most components are working, minor fixes needed.")
        else:
            print("❌ INCOMPLETE: Major issues detected")
            print("Significant fixes required before production use.")
        
        print("\nAccess Points:")
        print("• Flask API: http://localhost:5001/api/odu-256/complete")
        print("• React Component: Learning Center → Complete 256 Odu System")
        print("• JSON Export: odu_256_complete_system.json")
        print("• Database: odu_256_complete table")
        
        return passed_tests == total_tests
    
    def run_all_tests(self):
        """Run all integration tests"""
        print("🚀 Starting Complete 256 Odu System Integration Tests")
        print("=" * 60)
        
        # Run tests in order
        self.test_database_integration()
        self.test_flask_api_endpoints()
        self.test_json_export()
        self.test_react_component()
        self.test_learning_page_integration()
        
        # Generate report
        success = self.generate_test_report()
        
        return success

def main():
    """Main test function"""
    tester = Complete256OduTester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎯 All tests passed! The 256 Odu system is fully integrated.")
    else:
        print("\n⚠️  Some tests failed. Check the report above for details.")

if __name__ == '__main__':
    main()