from flask import Blueprint, jsonify, request

from models.destination import Destination


destinations_blueprint = Blueprint("destinations", __name__)


@destinations_blueprint.get("/destinations")
def destinations():
    category = request.args.get("category")
    if category:
        category = category.strip().title()
        if category not in {"Beach", "Culture", "Adventure"}:
            return jsonify({"error": "Invalid category"}), 400
    return jsonify(Destination.all(category))


@destinations_blueprint.get("/destinations/<int:destination_id>")
def destination_detail(destination_id):
    destination = Destination.get(destination_id)
    if not destination:
        return jsonify({"error": "Destination not found"}), 404
    return jsonify(destination)
