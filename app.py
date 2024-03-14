from flask import Flask, jsonify, request
import pyvisa

app = Flask(__name__)
inst = None
rm = pyvisa.ResourceManager()


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
        inst = rm.open_resource(device)
        return jsonify({
            'success': True
        })


if __name__ == '__main__':
    app.run(debug=True)
