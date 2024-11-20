from flask import Flask, jsonify
from flask_cors import CORS
from data import districts

app = Flask(__name__)
CORS(app)

@app.route('/district/all', methods=['GET'])
def get_all():
    return jsonify(list(districts.values()))
@app.route('/district/<district_name>', methods=['GET'])
def get_district(district_name):
    normalized_name = district_name.lower().replace(" ", "")
    district_info = districts.get(normalized_name)
    if district_info:
        return jsonify(district_info), 200
    else:
        return jsonify({"error": "District not found"}), 404

if __name__ == "__main__":
    app.run()