# Rom's Pizza – Complete Project Documentation

Welcome to the **Rom's Pizza** website repository! This is a modern, responsive Angular 19 application built using Standalone Components, designed to provide a seamless digital experience for Muradnagar's favorite wood-fired pizza shop.

This document covers everything you need to know about the architecture, tech stack, components, services, styling, and testing strategies used in this project.

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
*   **`hero-banner`**: A dynamic, configurable hero banner used at the top of several pages.
*   **`review-card`**: A standard component for formatting customer testimonials.
*   **`floating-buttons`**: Fixed action buttons (like a floating WhatsApp icon) ensuring users can always reach out.

### `src/app/services/`
Contains the business logic, state management, and data handling.
*   **`MenuService`**: Provides the hardcoded catalog data (e.g., Margherita, Pepperoni, Garlic Bread) and utility functions to fetch items by ID or category.
*   **`CartService`**: Manages the user's shopping cart state using RxJS `BehaviorSubject`. It handles adding/removing items, updating quantities, and calculating total prices reactively.
*   **`OrderService`**: Responsible for generating unique Order IDs (e.g., `ROM-YYYYMMDD-HHmmss`) and formatting the WhatsApp checkout message string containing the order details.
*   **`ReviewService`**: Provides mock customer review data.
*   **`SeoService`**: Dynamically injects Meta tags (titles, descriptions, OpenGraph) into the `<head>` based on the active Angular route to ensure strong SEO performance.

### `src/app/models/`
TypeScript interfaces defining the shape of data models to enforce strong typing.
*   `MenuItem`, `CartItem`, `Order`, `Review`

---

## 🎨 Design System & Styling (`styles.css`)

Instead of relying heavily on massive CSS frameworks, the app utilizes global CSS custom properties (variables) combined with Bootstrap for layout.

### Color Palette (Tokens)
*   `--primary`: `#C62828` (Vibrant Pizza Red)
*   `--primary-dark`: `#B71C1C`
*   `--secondary`: `#F9A825` (Cheese Gold/Yellow)
*   `--secondary-custom`: `#e0e0e0` (Light Gray for contrast)
*   `--bg-cream`: `#FFFDF8` (Soft off-white background)
*   `--text-dark`: `#212121`

### Typography & Utilities
*   **Headings**: The `.fw-heading` class enforces a premium font style (typically a serif or stylized sans-serif depending on browser fallbacks) for titles.
*   **Animations**: Custom CSS animations like `.animate-fadeInUp` provide a smooth, premium feel as users scroll down pages.
*   **Shadows & Radii**: Elements use soft drop shadows and rounded corners to look modern and appetizing.

---

## 🛒 Order Flow & WhatsApp Integration

Because the application operates without a backend database, it utilizes a frictionless WhatsApp-based checkout flow:
1.  **Selection**: The user browses the `MenuComponent` and clicks "Add to Cart". The `CartService` stores this in memory.
2.  **Review**: The user navigates to the `CartComponent` to review quantities and total pricing.
3.  **Checkout**: The user clicks "Proceed to Order".
4.  **Generation**: The `OrderService` generates a formatted string detailing the order ID, selected items, total price, and customer details.
5.  **Submission**: The user is redirected to the WhatsApp API (`wa.me/`), opening their WhatsApp app with the pre-filled message sent directly to Rom's Pizza. The Angular app redirects to the Order Confirmation page.

---

## 🧪 Testing Strategies

### E2E Testing (Cypress)
The `cypress/e2e/` folder contains End-to-End integration tests:
*   **`home.cy.ts`**: Verifies that the Hero section, titles, and branding text load correctly.
*   **`menu.cy.ts`**: Validates that pizzas (e.g., Margherita, Pepperoni) appear, and clicking "Add to Cart" triggers the sticky cart bar.
*   **`checkout.cy.ts`**: Simulates an entire user journey: browsing the menu, adding an item (Farmhouse Veggie Pizza), navigating to the cart, checking the price calculation (`₹249`), and ensuring the checkout button functions.

### Unit Testing (Jasmine)
Standard Angular `.spec.ts` files exist alongside components to test individual instantiation and local DOM logic (e.g., checking if `app.component.ts` successfully mounts the "Rom's Pizza" title).

---

## ⚙️ Getting Started

### Prerequisites
*   Node.js (v18+)
*   Angular CLI (v19+)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd "Roms Pizza Website"
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

### Running Tests
*   **Cypress (E2E)**: `npx cypress open` to launch the interactive test runner.
*   **Jasmine (Unit)**: `ng test`

---
*Built with passion for Rom's Pizza!*
