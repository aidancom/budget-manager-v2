import pymongo, os

con = pymongo.MongoClient(os.getenv('URL_DATABASE'))

database = con['budget_manager']

column_users = database["user"]
column_budget = database["budget"]
column_categories = database["categories"]
column_expenses = database["expenses"]