# Commodities Dashboard

## Overview

This project is a web-based application designed to display and manage information about various commodities. It provides users with an interactive interface to view commodity details, visualize data through dynamic charts, and manage widgets for selected commodities.

---

## Features

- **Commodity Selection**: A dropdown menu dynamically populated with a list of commodities retrieved from a database.
- **Widget Management**: Users can create and remove widgets for selected commodities, displaying relevant information.
- **Dynamic Graphs**: Interactive line charts generated using Chart.js to visualize commodity data.
- **Data Fetching**: Integration with external APIs to fetch and display commodity-related data.
- **Responsive Design**: The application is designed to work seamlessly across different devices and screen sizes.

---

## Technologies Used

### Frontend:

- HTML5, CSS3, JavaScript
- Chart.js for data visualization

### Backend:

- PHP for server-side logic
- MySQL for database management

### API Integration:

- External API for fetching commodity data

### Other Libraries:

- Chart.js for creating interactive charts

---

## File Structure

- **index.html**: The main HTML file containing the structure of the webpage.
- **style.css**: The CSS file for styling the webpage (not included in the provided files).
- **index.js**: The JavaScript file containing the logic for fetching data, managing widgets, and rendering charts.
- **getCommodities.php**: A PHP script to fetch commodity data from the database and return it as JSON.
- **connectdb.php**: A PHP script for establishing a connection to the database (not included in the provided files).

---

## Key Components

### Commodity Dropdown

- Dynamically populated with data fetched from the database.
- Allows users to select a commodity to view its details.

### Widgets

- Each widget represents a selected commodity.
- Widgets display the commodity's name and provide options to show or hide graphs or remove the widget.

### Graphs

- Line charts display data trends for selected commodities.
- Users can toggle the visibility of graphs for individual commodities.

### API Key Generation

- A utility function to generate API keys for testing purposes.

---

## Prerequisites

- A web server with PHP support (e.g., Apache, Nginx).
- A MySQL database with a `commodities` table containing relevant data.
- Internet access for fetching external API data and loading Chart.js.

---

## Acknowledgments

- **Chart.js**: For providing a powerful and easy-to-use library for data visualization.
- **Alpha Vantage API**: For supplying commodity data used in the application.
