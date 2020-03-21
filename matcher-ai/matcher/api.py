from flask import Blueprint, make_response, jsonify, request

api = Blueprint("matcherapi", __name__)

@api.route("/", methods=["GET"])
def root():
    query = request.args.get(key="query", default="")
    results = jsonify([1,2,3])
    return make_response(results), 200
