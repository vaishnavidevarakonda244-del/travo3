import sqlite3
from pathlib import Path

DATABASE_PATH = Path(__file__).resolve().parent.parent / "travo.db"


def get_connection():
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def init_database():
    with get_connection() as connection:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS destinations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                country TEXT NOT NULL,
                category TEXT NOT NULL,
                price TEXT NOT NULL,
                rating REAL NOT NULL,
                image TEXT NOT NULL,
                special TEXT
            )
        """)
        destination_columns = {row[1] for row in connection.execute("PRAGMA table_info(destinations)").fetchall()}
        if "special" not in destination_columns:
            connection.execute("ALTER TABLE destinations ADD COLUMN special TEXT")
        connection.execute("""
            CREATE TABLE IF NOT EXISTS bookings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                package_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                travel_date TEXT NOT NULL,
                travelers INTEGER NOT NULL,
                status TEXT NOT NULL DEFAULT 'confirmed',
                FOREIGN KEY (package_id) REFERENCES destinations(id)
            )
        """)
        from database.seed import seed_destinations
        seed_destinations(connection)
