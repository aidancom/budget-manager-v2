from flask import Flask, jsonify, request
from flask_cors import CORS

from connection import column_users

app = Flask(__name__)
CORS(app)



if __name__ == "__main__":
  app.run(port=5000, debug=True)
