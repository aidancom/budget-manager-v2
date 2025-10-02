import uuid, bcrypt

from flask import Flask, jsonify, request
from flask_cors import CORS

from connection import column_users

app = Flask(__name__)
CORS(app)

@app.route('/registerUser', methods=['POST'])
def register_user():
  data = request.get_json()

  exist = column_users.find_one({'user': data['user']})

  if exist:
    return jsonify({'status': 'error', 'code': 404, 'message': 'El usuario ya existe', 'response': {}})
  else:
    hash_password = bcrypt.hashpw(
      data['password'].encode('utf-8'),
      bcrypt.gensalt()
    )
    user = {
      'user_id': str(uuid.uuid4()),
      'name': data['name'],
      'user': data['user'],
      'password': hash_password.decode('utf-8')
    }

    insert_new_user = column_users.insert_one(user)

    if insert_new_user.inserted_id:
      return jsonify({'status': 'success', 'code': 200, 'message': 'Usuario registrado con exito', 'response': {}})
    else:
      return jsonify({'status': 'error', 'code': 404, 'message': 'Error al registrar al usuario, contacte con el adminitrador del sitio', 'response': {}})
    

@app.route('/loginUser', methods=['POST'])
def login_user():
  data = request.get_json()
  user_exist = column_users.find_one({'user': data['user']}, {'_id': 0})

  if user_exist:
    if bcrypt.checkpw(data['password'].encode('utf-8'), user_exist['password'].encode('utf-8')):
      return jsonify({'status': 'success', 'code': 200, 'message': 'Usuario loggeado correctamente', 'response': user_exist})
    else:
      return jsonify({'status': 'error', 'code': 200, 'message': 'Usuario o contraseña incorrectos', 'response': {}})
  else:
    return jsonify({'status': 'error', 'code': 401, 'message': 'Usuario o contraseña incorrectos', 'response': {}})

if __name__ == "__main__":
  app.run(port=5000, debug=True)
