from flask import Blueprint, jsonify, request

from models.booking import Booking


bookings_blueprint = Blueprint("bookings", __name__)


@bookings_blueprint.get("/bookings")
def bookings():
    return jsonify(Booking.all())


@bookings_blueprint.post("/bookings")
def create():
    data = request.get_json(silent=True) or {}
    required = ('packageId', 'name', 'email', 'date', 'travelers')
    if not all(data.get(field) not in (None, '') for field in required):
        return jsonify({"error": "All booking fields are required"}), 400
    booking_id = Booking.create(data)
    return jsonify({"id": booking_id, "status": "confirmed"}), 201


@bookings_blueprint.delete("/bookings/<int:booking_id>")
def cancel(booking_id):
    if not Booking.cancel(booking_id):
        return jsonify({"error": "Booking not found"}), 404
    return jsonify({"status": "cancelled"})
