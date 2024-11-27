# Shop Yangu

This is a platform for managing e-commerce products, and shops. The app allows administrators to manage products, shops, and view various metrics through an admin panel and dashboard. It also includes features for CRUD operations and real-time updates via an API powered by json-server that runs locally.

## Features

- **Admin Panel:** Allows administrators to manage shops and products, including creating, updating, and deleting entries.
- **Metrics:** Provides insights such as stock levels, top shops, and distribution of product stock.
- **Product Management:** Admins can add new products, update their details, and remove them from the system.
- **Shop Management:** Admins can create new shops, assign products to shops, and remove shops (with restrictions if the shop has active products).
- **Real-Time Updates:** The admin dashboard, shops and products page update in real-time as changes are made.

## Instructions to run the app locally

### Prerequisites

Make sure you have the following tools installed in your machine:

- Nodejs
- npm
- Git

## Installation Steps

1. Clone the repository

```bash
git clone https://github.com/Jacobkyalo/ShopYangu.git
```

2. Change into the project directory

```bash
cd ShopYangu
```

3. Install dependencies

```bash
npm install
```

4. Start the json-server

```bash
npm run json-server
```

5. Start the app development server

```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:3000` to view the app

Json server will run on port 5000, and the app runs on port 3000. Make sure these ports are not in use before running the app.

You can view the shops from json server by navigating to `http://localhost:5000/shops` and products by navigating to `http://localhost:5000/products`.

Alternatively, you can view the live app [here](https://shop-yangu-demo.vercel.app/). Bare in mind that the live app does not have a live json server, so you must run the json-server locally to see real-time updates using the instructions above. Failure to which the app will not display any data.

## Description of the app and its features

The platform is designed to manage products and shops efficiently. As an admin, you can:

- **Manage Products:** Add, edit, and delete products. You can also view product stock levels and categorize products based on their stock status.
- **Manage Shops:** Create, edit and remove shops. Shops can be associated with products. Deleting a shop is restricted if there are products linked to it.
- **View Metrics:** The app provides metrics such as stock levels, the distribution of product stock, and top shops based on stock levels.

## Local links to the app

- **Products:** `http://localhost:3000/products`
- **Shops:** `http://localhost:3000/shops`
- **Metrics:** `http://localhost:3000/metrics`

You can follow these links to navigate to the respective pages after running the app locally.

## Testing the dashboard

After running the app locally, each page contains buttons that can help you navigate to different sections/pages of the app. For example **Add Shop** and **Add Product** buttons on the shops and products pages respectively. You can use these buttons to test the CRUD operations of the app.
