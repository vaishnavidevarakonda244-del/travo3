from database.init_db import get_connection


class Booking:
    @staticmethod
    def all():
        with get_connection() as connection:
            rows = connection.execute("""
                SELECT bookings.*, destinations.name AS package_name
                FROM bookings
                JOIN destinations ON destinations.id = bookings.package_id
                WHERE bookings.status = 'confirmed'
                ORDER BY bookings.id DESC
            """).fetchall()
            return [dict(row) for row in rows]

    @staticmethod
    def create(data):
        with get_connection() as connection:
            cursor = connection.execute("""
                INSERT INTO bookings (package_id, name, email, travel_date, travelers)
                VALUES (?, ?, ?, ?, ?)
            """, (
                data['packageId'], data['name'], data['email'],
                data['date'], int(data['travelers']),
            ))
            return cursor.lastrowid

    @staticmethod
    def cancel(booking_id):
        with get_connection() as connection:
            cursor = connection.execute(
                "UPDATE bookings SET status = 'cancelled' WHERE id = ?",
                (booking_id,),
            )
            return cursor.rowcount > 0
