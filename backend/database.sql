CREATE DATABASE IF NOT EXISTS tourist_db;
USE tourist_db;

CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('admin', 'user') DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS Places (
    place_id INT AUTO_INCREMENT PRIMARY KEY,
    place_name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    category VARCHAR(100),
    rating FLOAT,
    price DECIMAL(10,2),
    description TEXT,
    emoji VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS Hotels (
    hotel_id INT AUTO_INCREMENT PRIMARY KEY,
    hotel_name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    price DECIMAL(10,2),
    rating FLOAT,
    amenities JSON
);

CREATE TABLE IF NOT EXISTS Transport (
    transport_id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(100),
    source VARCHAR(255),
    destination VARCHAR(255),
    departure_time VARCHAR(100),
    fare DECIMAL(10,2),
    seats INT
);

CREATE TABLE IF NOT EXISTS Food (
    food_id INT AUTO_INCREMENT PRIMARY KEY,
    food_name VARCHAR(255) NOT NULL,
    restaurant VARCHAR(255),
    category VARCHAR(100),
    price DECIMAL(10,2)
);

CREATE TABLE IF NOT EXISTS Bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    item_type ENUM('hotel', 'transport', 'food', 'place'),
    item_id INT,
    booking_date DATE,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    
    -- Hotel booking extra details
    hotel_name VARCHAR(255),
    hotel_image TEXT,
    price DECIMAL(10,2),
    check_in DATE,
    check_out DATE,
    guests INT,
    place_name VARCHAR(255),
    
    -- Food order extra details
    quantity INT,
    total_price DECIMAL(10,2),
    food_image TEXT,
    restaurant VARCHAR(255),
    
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Add search_history table
CREATE TABLE IF NOT EXISTS search_history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  query VARCHAR(255) NOT NULL,
  results_count INT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Add destinations table
CREATE TABLE IF NOT EXISTS destinations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  place_id VARCHAR(255) UNIQUE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  address TEXT,
  city VARCHAR(100),
  rating DECIMAL(3,1),
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  best_season VARCHAR(100),
  estimated_duration VARCHAR(50),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Add favorites table
CREATE TABLE IF NOT EXISTS user_favorites (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  destination_id INT NOT NULL,
  added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (destination_id) REFERENCES destinations(id)
);
