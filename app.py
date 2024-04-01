from flask import Flask, jsonify, request
import pyvisa
from flask import Flask, jsonify
# from pymongo import MongoClient
import serial
import pandas as pd
from experiments.exp1 import exp1

app = Flask(__name__)
inst = None
rm = pyvisa.ResourceManager()

# client = MongoClient('mongodb://localhost:27017/')
# db = client['my_database']

arduino = None


# def create_collection():
#     latest_collection_number = 0
#     for collection_name in db.list_collection_names():
#         if collection_name.startswith('collection_'):
#             number = int(collection_name.split('_')[1])
#             if number > latest_collection_number:
#                 latest_collection_number = number
#     next_collection_number = latest_collection_number + 1

#     new_collection_name = f'collection_{next_collection_number}'
#     collection = db[new_collection_name]


@app.after_request
def set_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "*"
    return response


@app.route("/", methods=['GET', 'POST'])
def hello_world():
    if request.method == 'POST':
        print(request.json['username'])
        return jsonify({
            'success': True
        })


@app.route("/connect_arduino", methods=['GET'])
def connect_arduino():
    try:
        global arduino
        arduino_port = 'COM5'
        arduino = serial.Serial(arduino_port, baudrate=9600, timeout=1)
        return jsonify({
            'success': True
        })
    except Exception as e:
        return jsonify({
            'error': e,
            'success': False
        })


@app.route("/view_devices", methods=['GET'])
def view_devices():
    if request.method == 'GET':
        devices = rm.list_resources()
        return jsonify({
            'devices': devices,
            'success': True
        })


@app.route("/connect_device", methods=['GET', 'POST'])
def connect_device():
    if request.method == 'POST':
        device = request.json['connect']
        print(device)
        global inst
        inst = rm.open_resource(device)
        return jsonify({
            'success': True
        })


@app.route("/experiment1", methods=['POST'])
def perform_exp1():
    if request.method == 'POST' and inst != None:
        data = exp1(inst, arduino, request.json['src_voltage'], request.json['tot_time'],
                    request.json['iter_num'], request.json['readings'])
        data.to_csv('result_exp1.csv')


@app.route("/loginToken",  methods=['GET', 'POST'])
def setup_loginToken():
    if request.method == 'POST':
        file = open('./user_configs/login_token.txt', 'w')
        file.write(request.json['token'])
        file.close()

        return jsonify({
            'message': "Login Token updated"
        })
    elif request.method == 'GET':
        file = open('./user_configs/login_token.txt', 'r')
        token = file.read()
        file.close()

        return jsonify({
            'token': token
        })


if __name__ == '__main__':
    app.run(debug=True)
    # create_collection()
