# BBQ Catering Website Technical Implementation Plan

## Core Features Implementation

### 1. Menu Management System

#### Menu Items Function
```javascript
// Function to add menu items to the database
export const addMenuItem = async (item) => {
  try {
    // Structure: name, description, category, price, image, etc.
    
    // Sample structure for a protein item
    // {
    //   name: "Smoked Brisket",
    //   description: "Texas-style smoked brisket with our signature rub",
    //   category: "protein",
    //   imageUrl: "/images/menu/brisket.jpg",
    //   pricePerServing: 10.99,
    //   availableForPackages: ["small", "medium", "large"]
    // }
    
    // Implementation will depend on backend choice (Firebase, MongoDB, etc.)
    const result = await db.collection("menuItems").add(item);
    return { success: true, id: result.id };
  } catch (error) {
    console.error("Error adding menu item:", error);
    return { success: false, error };
  }
};
```

#### Package Management Function
```javascript
// Function to create and manage packages
export const createPackage = async (packageData) => {
  try {
    // Structure: name, description, party size, included proteins, sides, price, etc.
    
    // Sample structure
    // {
    //   name: "BBQ Feast",
    //   description: "Perfect for medium gatherings",
    //   partySize: "medium",
    //   basePrice: 399.99,
    //   servingSize: "25-50 people",
    //   includedItems: [
    //     { type: "protein", count: 3 },
    //     { type: "side", count: 4 },
    //     { type: "extra", items: ["rolls", "sauces"] }
    //   ],
    //   customizationOptions: true
    // }
    
    const result = await db.collection("packages").add(packageData);
    return { success: true, id: result.id };
  } catch (error) {
    console.error("Error creating package:", error);
    return { success: false, error };
  }
};
```

#### Sides Management Function
```javascript
// Function to add and manage side dishes
export const addSide = async (sideData) => {
  try {
    // Structure: name, description, half pan price, full pan price, servings, etc.
    
    // Sample structure
    // {
    //   name: "Mac and Cheese",
    //   description: "Creamy three-cheese blend",
    //   imageUrl: "/images/sides/mac-cheese.jpg",
    //   halfPanPrice: 39.99,
    //   fullPanPrice: 69.99,
    //   servesHalfPan: "15-20 people",
    //   servesFullPan: "35-40 people"
    // }
    
    const result = await db.collection("sides").add(sideData);
    return { success: true, id: result.id };
  } catch (error) {
    console.error("Error adding side:", error);
    return { success: false, error };
  }
};
```

### 2. Order Selection Interface

#### Components Structure
- `MenuSelector.js`: Main component to manage selection process
- `PartySizeSelector.js`: Component for selecting party size
- `PackageSelector.js`: Component for package selection based on party size
- `ProteinSelector.js`: Component for selecting proteins within a package
- `SidesSelector.js`: Component for selecting side dishes
- `OrderSummary.js`: Component displaying selected items and calculated cost

#### Selection Flow Logic
```javascript
// Sample React component structure for menu selection
import React, { useState } from 'react';
import PartySizeSelector from './PartySizeSelector';
import PackageSelector from './PackageSelector';
import ProteinSelector from './ProteinSelector';
import SidesSelector from './SidesSelector';
import OrderSummary from './OrderSummary';

const MenuSelector = () => {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    partySize: null,
    package: null,
    proteins: [],
    sides: []
  });
  
  const handlePartySizeSelection = (size) => {
    setSelections({...selections, partySize: size});
    setStep(2);
  };
  
  const handlePackageSelection = (pkg) => {
    setSelections({...selections, package: pkg});
    setStep(3);
  };
  
  const handleProteinSelection = (proteins) => {
    setSelections({...selections, proteins});
    setStep(4);
  };
  
  const handleSidesSelection = (sides) => {
    setSelections({...selections, sides});
    setStep(5);
  };
  
  return (
    <div className="menu-selector">
      {step === 1 && <PartySizeSelector onSelect={handlePartySizeSelection} />}
      {step === 2 && <PackageSelector partySize={selections.partySize} onSelect={handlePackageSelection} />}
      {step === 3 && <ProteinSelector package={selections.package} onSelect={handleProteinSelection} />}
      {step === 4 && <SidesSelector package={selections.package} onSelect={handleSidesSelection} />}
      {step === 5 && <OrderSummary selections={selections} />}
    </div>
  );
};

export default MenuSelector;
```

### 3. Consultation Form & Submission

#### Form Data Structure
```javascript
// Sample consultation form data structure
const consultationData = {
  // Personal information
  name: "John Doe",
  email: "john@example.com",
  phone: "202-555-1234",
  
  // Event details
  eventDate: "2023-06-15",
  eventTime: "18:00",
  partySize: "medium", // small, medium, large, custom
  expectedGuests: 35,
  
  // Budget and service options
  budget: "1000-2000", // budget range
  serviceType: "onsite", // delivery or onsite
  
  // Order selections (from menu selection process)
  selections: {
    package: "pkg123",
    customizations: {
      proteins: ["brisket", "ribs", "chicken"],
      sides: [
        { id: "side123", size: "full" },
        { id: "side456", size: "half" }
      ]
    }
  },
  
  // Additional information
  specialRequests: "We have 3 guests with gluten allergies.",
  
  // Status tracking
  status: "pending", // pending, confirmed, completed, cancelled
  createdAt: timestamp,
  updatedAt: timestamp
};
```

#### Submission Function
```javascript
// Function to submit consultation request
export const submitConsultationRequest = async (formData) => {
  try {
    // Create customer record if new
    let customerId;
    const existingCustomer = await db.collection("customers")
      .where("email", "==", formData.email)
      .limit(1)
      .get();
      
    if (existingCustomer.empty) {
      // Create new customer
      const customerData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        createdAt: timestamp
      };
      
      const newCustomer = await db.collection("customers").add(customerData);
      customerId = newCustomer.id;
    } else {
      customerId = existingCustomer.docs[0].id;
    }
    
    // Calculate estimated cost (to be implemented)
    const estimatedCost = await calculateOrderCost(formData.selections);
    
    // Create consultation record
    const consultationData = {
      customerId,
      ...formData,
      estimatedCost,
      status: "pending",
      createdAt: timestamp
    };
    
    const result = await db.collection("consultations").add(consultationData);
    
    // Send notification emails
    await sendNotificationEmails(formData, result.id);
    
    return { success: true, consultationId: result.id };
  } catch (error) {
    console.error("Error submitting consultation:", error);
    return { success: false, error };
  }
};
```

### 4. CRM for Customer Management

#### Customer Database Structure
```javascript
// Customer collection schema
const customerSchema = {
  id: "cust123",
  name: "John Doe",
  email: "john@example.com",
  phone: "202-555-1234",
  address: {
    street: "123 Main St",
    city: "Washington",
    state: "DC",
    zipCode: "20001"
  },
  consultations: ["cons123", "cons456"], // References to consultation documents
  orderHistory: ["ord789"], // References to order documents
  preferences: {
    favoriteProteins: ["brisket", "ribs"],
    dietaryRestrictions: ["gluten-free"],
    communicationPreference: "email"
  },
  notes: "Prefers spicy BBQ sauce on the side.",
  createdAt: timestamp,
  updatedAt: timestamp
};
```

#### Order Tracking Structure
```javascript
// Order/consultation schema
const orderSchema = {
  id: "ord123",
  customerId: "cust123",
  consultationId: "cons456", // Reference to consultation document
  orderDate: "2023-05-01",
  eventDate: "2023-06-15",
  eventTime: "18:00",
  status: "confirmed", // pending, confirmed, in-progress, completed, cancelled
  package: "pkg789",
  items: {
    proteins: [
      { id: "item123", name: "Brisket", quantity: 5, unit: "pound" },
      { id: "item456", name: "Ribs", quantity: 3, unit: "rack" }
    ],
    sides: [
      { id: "side123", name: "Mac and Cheese", size: "full" },
      { id: "side456", name: "Collard Greens", size: "half" }
    ],
    extras: [
      { id: "extra123", name: "Cornbread", quantity: 2, unit: "dozen" }
    ]
  },
  serviceType: "onsite",
  staffAssigned: ["staff123", "staff456"],
  totalCost: 1249.99,
  deposit: 500.00,
  paymentStatus: "partial", // none, partial, full
  notes: "Customer requested extra sauce on the side.",
  timeline: [
    { status: "created", date: timestamp, note: "Order created from consultation" },
    { status: "confirmed", date: timestamp, note: "Customer confirmed via email" }
  ],
  createdAt: timestamp,
  updatedAt: timestamp
};
```

#### CRM Functions
```javascript
// Get customer by ID
export const getCustomerById = async (customerId) => {
  try {
    const customerDoc = await db.collection("customers").doc(customerId).get();
    
    if (!customerDoc.exists) {
      return { success: false, error: "Customer not found" };
    }
    
    return { success: true, customer: { id: customerDoc.id, ...customerDoc.data() } };
  } catch (error) {
    console.error("Error getting customer:", error);
    return { success: false, error };
  }
};

// Get customer orders
export const getCustomerOrders = async (customerId) => {
  try {
    const ordersSnapshot = await db.collection("orders")
      .where("customerId", "==", customerId)
      .orderBy("createdAt", "desc")
      .get();
      
    const orders = ordersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { success: true, orders };
  } catch (error) {
    console.error("Error getting customer orders:", error);
    return { success: false, error };
  }
};

// Update consultation status
export const updateConsultationStatus = async (consultationId, status, note) => {
  try {
    const timestamp = new Date();
    
    await db.collection("consultations").doc(consultationId).update({
      status,
      "timeline": db.FieldValue.arrayUnion({
        status,
        date: timestamp,
        note: note || `Status updated to ${status}`
      }),
      updatedAt: timestamp
    });
    
    return { success: true };
  } catch (error) {
    console.error("Error updating consultation status:", error);
    return { success: false, error };
  }
};
```

### 5. Cost Calculation System

```javascript
// Calculate order cost based on selections
export const calculateOrderCost = async (selections) => {
  try {
    let totalCost = 0;
    
    // Get package base price
    const packageDoc = await db.collection("packages").doc(selections.package).get();
    const packageData = packageDoc.data();
    totalCost += packageData.basePrice;
    
    // Calculate protein costs
    if (selections.customizations && selections.customizations.proteins) {
      // Logic to calculate protein costs based on selections
      // This may include extra proteins beyond what's included in package
    }
    
    // Calculate sides costs
    if (selections.customizations && selections.customizations.sides) {
      for (const side of selections.customizations.sides) {
        const sideDoc = await db.collection("sides").doc(side.id).get();
        const sideData = sideDoc.data();
        
        // Add cost based on half or full pan
        if (side.size === "half") {
          totalCost += sideData.halfPanPrice;
        } else {
          totalCost += sideData.fullPanPrice;
        }
      }
    }
    
    // Apply any package-specific rules, discounts, etc.
    
    return totalCost;
  } catch (error) {
    console.error("Error calculating cost:", error);
    throw error;
  }
};
```

## Database Schema Overview

### Collections

1. **customers**
   - Customer information
   - Contact details
   - Order history references
   - Preferences

2. **menuItems**
   - Food items (mainly proteins)
   - Pricing information
   - Categories
   - Images
   - Availability

3. **sides**
   - Side dish information
   - Half and full pan pricing
   - Serving sizes
   - Images

4. **packages**
   - Pre-defined catering packages
   - Party size classification
   - Base pricing
   - Included items
   - Customization options

5. **consultations**
   - Consultation requests
   - Customer references
   - Event details
   - Menu selections
   - Status tracking

6. **orders**
   - Confirmed orders
   - Detailed item selections
   - Pricing
   - Event information
   - Status tracking
   - Payment information

## API Endpoints (Backend)

### Menu Management
- `GET /api/menu/items`: Get all menu items
- `GET /api/menu/items/:id`: Get specific menu item
- `POST /api/menu/items`: Add new menu item (admin)
- `PUT /api/menu/items/:id`: Update menu item (admin)
- `DELETE /api/menu/items/:id`: Delete menu item (admin)

### Package Management
- `GET /api/packages`: Get all packages
- `GET /api/packages/:size`: Get packages by party size
- `GET /api/packages/:id`: Get specific package
- `POST /api/packages`: Create new package (admin)
- `PUT /api/packages/:id`: Update package (admin)
- `DELETE /api/packages/:id`: Delete package (admin)

### Side Dish Management
- `GET /api/sides`: Get all side dishes
- `GET /api/sides/:id`: Get specific side dish
- `POST /api/sides`: Add new side dish (admin)
- `PUT /api/sides/:id`: Update side dish (admin)
- `DELETE /api/sides/:id`: Delete side dish (admin)

### Consultation Management
- `POST /api/consultations`: Submit consultation request
- `GET /api/consultations`: Get all consultations (admin)
- `GET /api/consultations/:id`: Get specific consultation
- `PUT /api/consultations/:id/status`: Update consultation status
- `DELETE /api/consultations/:id`: Cancel consultation

### Customer Management
- `GET /api/customers`: Get all customers (admin)
- `GET /api/customers/:id`: Get specific customer
- `GET /api/customers/:id/consultations`: Get customer consultations
- `GET /api/customers/:id/orders`: Get customer orders
- `POST /api/customers`: Create new customer
- `PUT /api/customers/:id`: Update customer information

### Order Processing
- `POST /api/orders`: Create new order
- `GET /api/orders`: Get all orders (admin)
- `GET /api/orders/:id`: Get specific order
- `PUT /api/orders/:id/status`: Update order status
- `DELETE /api/orders/:id`: Cancel order

## Frontend Components Breakdown

### Admin Interface
- `AdminLayout.js`: Layout for admin pages
- `Dashboard.js`: Admin dashboard with overview
- `MenuManager.js`: Interface for managing menu items
- `PackageManager.js`: Interface for managing packages
- `SideManager.js`: Interface for managing sides
- `ConsultationManager.js`: Interface for managing consultations
- `CustomerManager.js`: Interface for managing customers
- `OrderManager.js`: Interface for managing orders

### Customer Interface
- `MenuSelector.js`: Interface for selecting menu items
- `PartySizeSelector.js`: Interface for selecting party size
- `PackageDisplay.js`: Display available packages
- `ProteinSelector.js`: Interface for selecting proteins
- `SideSelector.js`: Interface for selecting sides
- `OrderSummary.js`: Display order summary and cost
- `ConsultationForm.js`: Form for submitting consultation requests

## Future Enhancements

1. **Online Payment Integration**
   - Accept deposits through website
   - Integrate with payment processors (Stripe, Square)
   - Generate invoices and receipts

2. **Calendar Management**
   - Visual calendar for event scheduling
   - Availability checking
   - Staff assignment

3. **Inventory Management**
   - Track ingredient usage
   - Forecast needs based on upcoming events
   - Purchase order generation

4. **Marketing Integration**
   - Email marketing for past customers
   - Special offers and promotions
   - Seasonal menu updates

5. **Reviews and Testimonials**
   - Automated review collection after events
   - Testimonial display on website
   - Integration with review platforms

## Deployment Strategy

1. **Development Environment**
   - Local development with Next.js
   - Version control with Git/GitHub

2. **Staging Environment**
   - Deployed to Vercel/Netlify staging
   - Connected to test database
   - QA testing

3. **Production Environment**
   - Deployed to Vercel/Netlify production
   - Connected to production database
   - Performance monitoring
   - Regular backups