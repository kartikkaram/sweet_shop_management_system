# 🍬 Sweet Shop Management System

A lightweight and interactive sweet shop management system built using Next.js and Zustand for state management. This app allows you to efficiently manage sweets with features like adding, deleting, purchasing, restocking, and sorting sweets.

## 🔧 System Requirements

### Prerequisites
- **Node.js**: Version 16.x or higher
- **npm**: Version 8.x or higher (comes with Node.js)

### Check Your Versions
```bash
node --version
npm --version
```

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/kartikkaram/sweet_shop_management_system.git
cd sweet_shop_management_system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Application
```bash
npm run dev
```

The app will be available at: **http://localhost:3000**

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Test Coverage Report
```bash
> sweet_shop_management_system@0.1.0 test
> jest

 PASS  tests/sweetStore/addSweet.test.js
 PASS  tests/sweetStore/searchSweets.test.js
 PASS  tests/sweetStore/deleteSweet.test.js
 PASS  tests/sweetStore/purchaseSweet.test.js
 PASS  tests/sweetStore/sortSweets.test.js
 PASS  tests/sweetStore/updateSweet.test.js
 PASS  tests/sweetStore/restockSweet.test.js

Test Suites: 7 passed, 7 total
Tests:       27 passed, 27 total
Snapshots:   0 total
Time:        3.523 s

Ran all test suites.
```


## 📋 Overview

This Sweet Shop Management System is a full-featured inventory management application designed for sweet shop owners and customers. It provides an intuitive interface for managing sweet inventory, processing purchases, and maintaining stock levels with real-time updates.

## 🧱 Tech Stack

- **Framework:** Next.js 14+
- **State Management:** Zustand
- **Testing:** Jest
- **Styling:** CSS Modules / Tailwind CSS
- **Language:** JavaScript

## 🚀 Key Features

- 🧁 **Add New Sweets** - Add sweets with name, category, price, and quantity
- 🗑️ **Delete Sweets** - Remove sweets from inventory
- 🛒 **Purchase System** - Process purchases and automatically update quantities
- 📦 **Restock Management** - Restock sweets when inventory is low
- 🔍 **Search Functionality** - Search sweets by name
- 🔃 **Sort Options** - Sort sweets by name, price, or quantity
- ✅ **Data Validation** - Built-in validations to ensure data consistency
- 🧪 **Comprehensive Testing** - Fully tested using Jest with 27 test cases



## 📸 Screenshots & Features Demo

### Main Dashboard - Customer Section
![Sweet Shop customer section](./screenshots/customer-section.png)
*Main interface showing all sweets with search and sort functionality*

### Shop Owner Management Section
![Shop Owner Section](./screenshots/shop-owner-section.png)
*Administrative panel for inventory management and adding new sweets*

### Add New Sweet Feature
![Add Sweet Form](./screenshots/add-feature.png)
*Form to add new sweets with validation for name, category, price, and quantity*

### Edit Sweet Details
![Edit Sweet Feature](./screenshots/edit-feature.png)
*Edit functionality for modifying sweet details and updating inventory*

### Purchase Processing System
![Purchase Sweet](./screenshots/purchase-feature.png)
*Customer purchase interface with quantity selection and inventory updates*

### Restock Management
![Restock Feature](./screenshots/restock-feature.png)
*Restock functionality for managing inventory levels and low stock alerts*

### Sort & Filter Options
![Sort Feature](./screenshots/sort-feature.png)
*Advanced sorting options by name, price, quantity with filtering capabilities*



## 🙌 Author

Made  by [Kartik Karambelkar](https://github.com/kartikkaram)

