import pymongo, os

con = pymongo.MongoClient(os.getenv('URL_DATABASE'))

database = con['budget_manager']

column_users = database["user"]