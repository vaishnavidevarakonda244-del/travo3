CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS packages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    category TEXT NOT NULL,
    price TEXT NOT NULL,
    rating REAL NOT NULL,
    image TEXT NOT NULL,
    special TEXT
);

CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    package_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    travel_date TEXT NOT NULL,
    travelers INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'confirmed',
    FOREIGN KEY (package_id) REFERENCES packages(id)
);
