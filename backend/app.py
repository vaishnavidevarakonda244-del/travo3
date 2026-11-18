import os

from flask import Flask
from flask_cors import CORS

from database.init_db import init_database
from routes.destinations import destinations_blueprint
from routes.bookings import bookings_blueprint


def create_app():
    app = Flask(__name__)
    CORS(app, origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ])

    init_database()
    app.register_blueprint(destinations_blueprint, url_prefix="/api")
    app.register_blueprint(bookings_blueprint, url_prefix="/api")

    @app.get("/api/health")
    def health():
        return {"status": "ok", "service": "Travo API"}

    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")), debug=True)
