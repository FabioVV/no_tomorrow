from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

products = [
    {'id':1, 'name':'Iphone 15', 'price':'14000'},
]

@app.route('/products', methods=['GET'])
def all_products():
    return jsonify(products)


@app.route('/products/new', methods=['POST'])
def create_product():
    data = request.json
    products.append({'id':products[-1]['id']+1, 'name': data.get('name'),'price': data.get('price')})

    return jsonify(products)


@app.route('/products/<int:id>', methods=['DELETE'])
def remove_product(id:int):

    for x in products:
        if x['id'] == id:
            products.remove(x)
    
    return jsonify(products)





if __name__ == "__main__":
    app.run("0.0.0.0", port=5001, debug=True)