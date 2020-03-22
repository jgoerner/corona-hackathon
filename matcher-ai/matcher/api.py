from flask import Blueprint, make_response, jsonify, request
from .utils import filter_and_score_jobs

api = Blueprint("matcher-api", __name__)


@api.route("/special-demand", methods=["GET"])
def special_demand():
    """
    Special demand request with zip code

    :return: List[str] with skills
    """
    zip_code = request.args.get(key="zip_code", default="")
    # TODO: get skills required in zip code area
    results = jsonify([])
    return make_response(results), 200


@api.route("/recommendations", methods=["GET"])
def recommendations():
    """
    Get prioritized job list for employee

    :return: List[{job_id, score, explanation}] with recommendations
    """
    employee_id = request.args.get(key="employee_id", default="")
    results = filter_and_score_jobs(employee_id)
    return make_response(results), 200
