# 🍔 Algo que Pedir – Order Management System

> A multi-client web application for restaurant orders: a React app for customers and a Svelte app for restaurants, both powered by a single Kotlin + Spring Boot REST API.

<p align="center">
  <img src="https://img.shields.io/badge/Kotlin-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white" />
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Svelte-FF3E00?style=for-the-badge&logo=svelte&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
</p>

---

## Academic Purpose

*Practical assignment for Algorithms III*
**Associate Degree in Computer Programming – UNSAM (2nd semester 2025)**

The project brings together concepts such as:

- Layered architecture
- Design patterns
- Unit and integration testing
- Multi-client integration with a centralized backend
- Separation of concerns

---

## Overview

The system has two different user profiles that share the same backend:

| Profile | Technology | Purpose |
|---------|------------|---------|
| **Customer** | React + TypeScript (Vite) | Browse the menu, place orders and follow their status |
| **Restaurant** | Svelte | Manage incoming orders, dishes, ingredients and the venue profile |

Both clients use the same endpoints, but each one offers specific features depending on the user's role.

---

## Demo

The demo follows one complete order from both sides:

1. Log in as a customer and as a restaurant
2. Change the customer's preferences
3. The customer creates an order (React)
4. The restaurant sees the order (Svelte)
5. The restaurant changes the order status
6. The customer sees the update reflected and can leave a rating
7. The restaurant receives a new review

https://github.com/user-attachments/assets/6bb5f0e9-4651-408e-a320-2dfaffbc80aa

---

## Architecture

```
Customer (React)     Restaurant (Svelte)
        ↓                    ↓
              REST API
                 ↓
   Backend (Kotlin + Spring Boot)
```

The backend follows a layered architecture, so each layer has one clear responsibility:

```
Controller → Service → Repository → Model
```

---

## Features

### Customer (React)

- Sign up and log in
- Menu display
- Order creation
- History of placed orders
- Order status tracking
- Ratings for completed orders

### Restaurant (Svelte)

- View incoming orders
- Change the order status (pending → prepared)
- Ingredient management
- Dish editing
- Venue profile management
- View customer reviews

### Backend (Kotlin + Spring Boot)

- **Layered architecture** (Controller → Service → Repository → Model)
- **DTOs** to separate the API contract from the domain model
- **Global exception handling**, so errors are returned in a consistent format
- **Unit and integration tests**
- **In-memory persistence** (no database), which keeps setup simple
- **Design patterns used:** <!-- TODO: list the real ones, e.g. Strategy, Observer, Builder... -->

---

## Running the Project

Each subproject has its own README with prerequisites, installation commands, environment variables and ports:

- [Backend](./backend/README.md) → REST API (Kotlin + Spring Boot)
- [Customer Frontend](./frontend-react+typescript/README.md) → React + TypeScript + Vite
- [Restaurant Frontend](./frontend-svelte/README.md) → Svelte

⚠️ **Start the backend first, and then the frontends.**

---

## Project Structure

```
algo-que-pedir-2025/
│
├── backend/                     → REST API
├── frontend-react+typescript/   → Customer view
└── frontend-svelte/             → Restaurant view
```

---

## Team

- Catalina Correa
- Nicolas Cernadas
- Dana Cossettini Reyes
- Maximiliano Andres Bianchimano
- Fernanda Perez

---

## Contact
 
**Dana Cossettini Reyes** -
📧 dana2004c.r@gmail.com
 
**Institution:** National University of San Martín (UNSAM) · **Year:** 2025
