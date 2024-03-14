from flask import Flask, jsonify
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient('mongodb://localhost:27017/')
db = client['my_database']
def create_collection():
    latest_collection_number = 0
    for collection_name in db.list_collection_names():
        if collection_name.startswith('collection_'):
            number = int(collection_name.split('_')[1])
            if number > latest_collection_number:
                latest_collection_number = number
    next_collection_number = latest_collection_number + 1
    
    new_collection_name = f'collection_{next_collection_number}'
    collection = db[new_collection_name]


    print(f"Created collection: {new_collection_name}")
@app.route("/")
def hello_world():
    return jsonify({
        'success': True
    })


if __name__ == '__main__':
    app.run(debug=True)
    create_collection()
