from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

products = [
    {'id':1, 'name':'Iphone 15', 'price':14000},
]

@app.route('/products', methods=['GET'])
def all_products():
    return jsonify(products), 200


@app.route('/products/new', methods=['POST'])
def create_product():
    data = request.json

    if data.get('name').strip() == '':
        return jsonify({'error':"Product can't have an empty name!"}), 400


    try:

        for x in products:
            if data.get('name') == x['name']:
                return jsonify({'error':'Product already exists!'}), 400

        products.append({'id':products[-1]['id']+1, 'name': data.get('name'),'price': float(data.get('price'))})
    
    except ValueError:
        return jsonify({'error':'Price must be a number!'}), 400
    except IndexError:
        products.append({'id':1, 'name': data.get('name'),'price': float(data.get('price'))})


    return jsonify(products), 201


@app.route('/products/<int:id>', methods=['DELETE', 'GET', 'PATCH'])
def remove_product(id:int):

    if request.method == 'DELETE':

        for x in products:
            if x['id'] == id:
                products.remove(x)
                break
        
        return jsonify(products), 204
    
    elif request.method == 'GET':
        for x in products:
            if x['id'] == id:
                return jsonify(x), 200

    elif request.method == 'PATCH':
        data = request.json

        for x in products:
            if x['id'] == id:
                try:
                    if data.get('name') == x['name'] and int(x['id']) != id:
                        return jsonify({'error':'Product already exists!'}), 400
                    
                    x['name'] = str(data.get('name'))
                    x['price'] = float(data.get('price'))
                    break
                
                except ValueError:
                    return jsonify({'error':'Price must be a number!'}), 400
        
        return jsonify(products), 204


if __name__ == "__main__":
    app.run("0.0.0.0", port=5001, debug=True)