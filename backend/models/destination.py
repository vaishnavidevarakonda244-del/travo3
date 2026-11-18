from database.init_db import get_connection


class Destination:
    @staticmethod
    def all(category=None):
        with get_connection() as connection:
            if category:
                rows = connection.execute(
                    "SELECT * FROM destinations WHERE category = ?",
                    (category,),
                ).fetchall()
            else:
                rows = connection.execute("SELECT * FROM destinations").fetchall()
            return [dict(row) for row in rows]

    @staticmethod
    def get(destination_id):
        with get_connection() as connection:
            row = connection.execute(
                "SELECT * FROM destinations WHERE id = ?",
                (destination_id,),
            ).fetchone()
            return dict(row) if row else None
