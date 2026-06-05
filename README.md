# Rom's Pizza – Complete Project Documentation

Welcome to the **Rom's Pizza** website repository! This is a modern, responsive Angular 19 application built using Standalone Components, designed to provide a seamless digital experience for Muradnagar's favorite wood-fired pizza shop.

This document covers everything you need to know about the architecture, tech stack, components, services, styling, testing strategies, and the Git repository details.

---

## 🚀 Tech Stack & Core Technologies

*   **Framework:** Angular 19 (Standalone Components architecture)
*   **Styling:** Vanilla CSS, Bootstrap 5.3 (utility classes, grids, components)
*   **Icons:** Bootstrap Icons (`bootstrap-icons`)
*   **Routing:** Angular Router (lazy-loading for page components)
*   **Testing:** Cypress (End-to-End testing), Jasmine/Karma (Unit testing)
*   **Build Tool:** Angular CLI (`@angular/cli`)

---

## 📁 Project Architecture & Folder Structure

This application completely drops `NgModules` in favor of **Angular Standalone Components**. It is organized into modular feature directories within `src/app`:

### `src/app/pages/`
Contains route-level components. Each component here typically corresponds to a distinct URL in the application.
*   **`home`**: The landing page containing hero sections, featured menus, selling points, stats, and a Google Map integration.
*   **`menu`**: The full product listing. Iterates over menu data, allowing users to add items to their cart.
*   **`about`**: Tells the story of Rom's Pizza, displaying timelines and company values.
*   **`contact`**: Provides store address, contact details, embedded map, and operating hours.
*   **`gallery`**: Features a masonry-style image grid with category filtering and a full-screen image lightbox.
*   **`reviews`**: Displays customer testimonials using dynamic card layouts.
*   **`cart`**: The checkout page summarizing selected items. Validates the cart and passes data to the Order Service.
*   **`order-confirmation`**: The success page displayed after initiating a WhatsApp order.

### `src/app/shared/`
Contains reusable UI building blocks used across multiple pages.
*   **`navbar`**: Responsive top navigation bar with mobile offcanvas support.
*   **`footer`**: Global footer containing quick links and contact info.
*   **`food-card`**: A standardized card component to display pizza and side items consistently.
*   **`hero-banner`**: A dynamic, configurable hero banner used at the top of several pages. Recently updated to ensure perfect full-width layout across all viewports using block display properties.
*   **`review-card`**: A standard component for formatting customer testimonials.
*   **`floating-buttons`**: Fixed action buttons (like a floating WhatsApp icon) ensuring users can always reach out.

### `src/app/services/`
Contains the business logic, state management, and data handling.
*   **`MenuService`**: Provides the hardcoded catalog data and utility functions to fetch items by ID or category.
*   **`CartService`**: Manages the user's shopping cart state using RxJS `BehaviorSubject`.
*   **`OrderService`**: Responsible for generating unique Order IDs and formatting the WhatsApp checkout message.
*   **`ReviewService`**: Provides mock customer review data.
*   **`SeoService`**: Dynamically injects Meta tags (titles, descriptions, OpenGraph) into the `<head>` based on the active Angular route to ensure strong SEO performance.

---

## 🎨 Design System & Styling (`styles.css`)

Instead of relying heavily on massive CSS frameworks, the app utilizes global CSS custom properties (variables) combined with Bootstrap for layout.

### Color Palette (Tokens)
*   `--primary`: `#C62828` (Vibrant Pizza Red)
*   `--primary-dark`: `#B71C1C`
*   `--secondary`: `#F9A825` (Cheese Gold/Yellow)
*   `--bg-cream`: `#FFFDF8` (Soft off-white background)

---

## 🛒 Order Flow & WhatsApp Integration

Because the application operates without a backend database, it utilizes a frictionless WhatsApp-based checkout flow:
1.  **Selection**: The user browses the menu and clicks "Add to Cart". The `CartService` stores this in memory.
2.  **Review**: The user navigates to the Cart to review quantities and total pricing.
3.  **Checkout**: The user clicks "Proceed to Order".
4.  **Submission**: The app redirects to the WhatsApp API (`wa.me/`), opening the user's WhatsApp app with a pre-filled message sent directly to Rom's Pizza.

---

## 🧪 Testing Strategies

The project features a **100% End-to-End coverage** for all main application pages to ensure functionality and UI integrity.

### E2E Testing (Cypress)
The `cypress/e2e/` folder contains comprehensive End-to-End integration tests:
*   **`home.cy.ts`**: Verifies that the Hero section, titles, and branding text load correctly.
*   **`menu.cy.ts`**: Validates that menu items appear and that clicking "Add to Cart" triggers the sticky cart bar.
*   **`checkout.cy.ts`**: Simulates an entire user journey: browsing the menu, adding an item, filling out the customer form, and verifying the total order calculation and the WhatsApp button.
*   **`gallery.cy.ts`**: Ensures the gallery component, category filters, and images display properly.
*   **`reviews.cy.ts`**: Validates that customer review cards are rendering effectively.
*   **`contact.cy.ts`**: Checks that location details, contact cards, and forms exist.
*   **`about.cy.ts`**: Validates the rendering of the About page content.

*To run tests headlessly:* `npx cypress run`

---

## 📦 Git Repository Details

The project is securely version-controlled using Git. 
*   **Branch:** `main`
*   **Remote URL:** [https://github.com/Pankaj122002/Roms-s-Pizza-Restaurant.git](https://github.com/Pankaj122002/Roms-s-Pizza-Restaurant.git)

To clone the repository locally, run:
```bash
git clone https://github.com/Pankaj122002/Roms-s-Pizza-Restaurant.git
```

---

## ⚙️ Setup & Development

### Prerequisites
*   Node.js (v18+)
*   Angular CLI (v19+)

### Installation
1. Clone the repository and navigate into the directory:
   ```bash
   git clone https://github.com/Pankaj122002/Roms-s-Pizza-Restaurant.git
   cd Roms-s-Pizza-Restaurant
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local dev server:
   ```bash
   npm run start
   ```
   Navigate to `http://localhost:4200/` to view the app.

### Building for Production
Run `npm run build` or `ng build`. The output artifacts will be placed in the `dist/roms-pizza/` directory.

---
*Built with passion for Rom's Pizza!*
