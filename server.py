from flask import Flask, jsonify, request, abort, session, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from flask_bcrypt import Bcrypt
from flask_session import Session
from uuid import uuid4



app = Flask(__name__)
bcrypt = Bcrypt(app)



app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = r'sqlite:///db.sqlite'
db = SQLAlchemy(app)

app.config['SESSION_PERMANENT'] = False
app.secret_key = 'YourSecretKey@123'
app.config['SESSION_TYPE'] = 'filesystem'


app.config["SESSION_COOKIE_SAMESITE"] = "None"
Session(app)

CORS(app, supports_credentials=True)



# base de dados dos produtos, fuck it
products = [
    {'id':1, 'name':'Iphone 15', 'price':14000},
]





@app.route('/@me', methods=['GET'])
def me():

    id = session.get('user_id')

    user = User.query.filter_by(id=id).first() 
    
    if not user:
        return jsonify({
            'error':True,
            'message':'Wh'
        })

    return jsonify({
       'id':user.id,
       'email':user.email
    })








# LOGIN
@app.route('/register', methods=['POST'])
def register():
    email = request.json['email']
    password = request.json['password']


    user = User.query.filter_by(email=email).first() is not None

    if user:
        abort(409)

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password = hashed_password)
   
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        'id': new_user.id,
        'email':new_user.email
    })



@app.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']

    user = User.query.filter_by(email=email).first()

    if bcrypt.check_password_hash(user.password, password):

        session['user_id'] = user.id


        return jsonify({
            'id': user.id,
            'email':user.email
        })





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





class User(db.Model):
    __tablename__ =' users'
    id = db.Column(db.String(32), primary_key=True, unique=True, default=uuid4().hex)
    email = db.Column(db.String(64),  unique=True)
    password = db.Column(db.Text, nullable=True)





if __name__ == "__main__":
    app.run("0.0.0.0", port=5001, debug=True)