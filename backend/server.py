import uuid, bcrypt

from flask import Flask, jsonify, request
from flask_cors import CORS

from connection import column_users, column_budget, column_categories, column_expenses

app = Flask(__name__)
CORS(app)

def update_budget(data):
  budget = column_budget.find_one({'budget_id': data['budget_id']})

  expense_quantity = int(data['expense_quantity'])
  decrement = min(expense_quantity, budget['available'])

  column_budget.update_one(
      {'budget_id': data['budget_id']},
      {
          '$inc': {
              'spend': int(data['expense_quantity']),
              'available': -decrement
          }
      }
  )
  

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


@app.route('/getBudget', methods=['POST'])
def get_budget():
  data = request.get_json()
  budget_exist = column_budget.find_one({'user_id': data['user_id']}, {'_id': 0})

  if budget_exist:
    return jsonify({'status': 'success', 'code': 401, 'message': 'Presupuesto encontrado', 'response': budget_exist})
  else:
    return jsonify({'status': 'error', 'code': 401, 'message': 'No existe', 'response': None})


@app.route('/sendBudget', methods=['POST'])
def send_budget():
  data = request.get_json()
  budget_exist = column_budget.find_one({'user_id': data['user_id']}, {'_id': 0})

  if budget_exist:
    return jsonify({'status': 'error', 'code': 401, 'message': 'Este usuario ya tiene un presupuesto', 'response': list(budget_exist)})
  else:
    budget = {
      'user_id': data['user_id'],
      'budget_id': str(uuid.uuid4()),
      'budget': data['budget'],
      'available': data['available'],
      'spend': data['spend']
    }
    insert_budget = column_budget.insert_one(budget)

    if insert_budget.inserted_id:
      return jsonify({'status': 'success', 'code': 200, 'message': 'Registro del presupuesto realizado con éxito', 'response': list(budget)})
    else:
      return jsonify({'status': 'error', 'code': 401, 'message': 'Erro al insertar el presupuesto', 'response': {}})


@app.route('/getCategories')
def get_categories():
  categories = list(column_categories.find({}, {'_id': 0}))
  
  if categories:
    return jsonify({'status': 'success', 'code': 200, 'message': 'Categorias', 'response': categories})
  else:
    return jsonify({'status': 'error', 'code': 404, 'message': 'No se ha podido devolver las categorias', 'response': None})


@app.route('/sendExpense', methods=['POST'])
def send_expense():
  data = request.get_json()

  expense = {
    'budget_id': data['budget_id'],
    'expenses': [
      {
        'expense_name': data['expense_name'], 
        'expense_category_id': data['expense_category_id'], 
        'expense_quantity': data['expense_quantity'], 
        'expense_date': data['expense_date']
      }
    ]
  }

  exist_budget_expenses = column_expenses.find_one({"budget_id": data["budget_id"]})

  if not exist_budget_expenses:
    insert_expenses = column_expenses.insert_one(expense)
    if insert_expenses.inserted_id:
      update_budget(data)
      return jsonify({'status': 'success', 'code': 200, 'message': 'Se ha registrado el gasto con éxito', 'response': None})
    else:
      return jsonify({'status': 'error', 'code': 404, 'message': 'No ha registrado el gasto con éxito', 'response': None})
  else:
    update_expenses = column_expenses.update_one(
      {'budget_id': data['budget_id']},
      {'$push': {'expenses': expense['expenses'][0]}}
    )
    if update_expenses:
       update_budget(data)
       return jsonify({'status': 'success', 'code': 200, 'message': 'Se ha registrado el gasto con éxito', 'response': None})
    else:
      return jsonify({'status': 'error', 'code': 404, 'message': 'No ha registrado el gasto con éxito', 'response': None})
    

@app.route('/getUserExpenses', methods=['POST'])
def get_user_expenses():
  data = request.get_json()
  exist_budget_expenses = column_expenses.find_one({"budget_id": data["budget_id"]})

  if exist_budget_expenses:
    return jsonify({'status': 'success', 'code': 200, 'message': 'Listado de gastos', 'response': exist_budget_expenses["expenses"]})
  else:
    return jsonify({'status': 'error', 'code': 404, 'message': 'No hay gastos', 'response': []})


@app.route('/getExpensesByCategory', methods=['POST'])
def get_expenses_by_category():
  data = request.get_json()
  exist_budget_expenses = column_expenses.find_one({"budget_id": data["budget_id"]})
  if exist_budget_expenses:
    expenses = [expense for expense in exist_budget_expenses["expenses"] if expense["expense_category_id"] == str(data["category_id"])]
    return jsonify({'status': 'success', 'code': 404, 'message': 'No hay gastos', 'response': expenses})    
  else:
    return jsonify({'status': 'error', 'code': 404, 'message': 'No hay gastos', 'response': []})

if __name__ == "__main__":
  app.run(port=5000, debug=True)
