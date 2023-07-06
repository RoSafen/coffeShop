# IMPORTAR HERRAMIENTAS
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_marshmallow import Marshmallow

#CREAR LA APP
app = Flask(__name__)

#USAR CORS PARA DAR ACCESO A LAS RUTAS(ENDPOINT) DESDE FRONTEND
CORS(app)

#CONFIGURACION A LA BASE DE DATOS DESDE app
#(SE LE INFORMA A LA APP DONDE UBICAR LA BASE DE DATOS)
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root@localhost/proyecto'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

#COMUNICAR LA APP CON SQLALCHEMY
db = SQLAlchemy(app)

#PERMITIR LA TRANSFORMACION DE DATOS
ma = Marshmallow(app)

#ESTRUCTURA DE LA TABLA TARJETA A PARTIR DE LA CLASE
class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    valor = db.Column(db.Integer)
    nombre_receptor = db.Column(db.String(50))
    nombre_emisor = db.Column(db.String(50))
    mail = db.Column(db.String(50))
    mensaje = db.Column(db.String(200))
    

    def __init__(self, valor, nombre_receptor,nombre_emisor, mail, mensaje):
        self.valor = valor
        self.nombre_receptor = nombre_receptor
        self.nombre_emisor = nombre_emisor
        self.mail = mail
        self.mensaje = mensaje

#CODIGO PARA CREAR LAS TABLAS DEFINIDAS EN LAS CLASES
with app.app_context():
    db.create_all()

#crear una clase ProductoSchema, DONDE SE DEFINEN LOS CAMPOS DE LA TABLA
class CardSchema(ma.Schema):
    class Meta:
        fields=('id', 'valor', 'nombre_receptor', 'nombre_emisor', 'mail', 'mensaje')

#DIFERENCIAR CUANDO SE TRANSFORME UN DATO O UNA LISTA DE DATOS
card_schema = CardSchema()
cards_schema = CardSchema(many=True)


@app.route("/admin", methods=['GET'])
def get_cards():
                    #select * from card
    all_cards = Card.query.all()
    #RETORNA UN LISTADO DE OBJETOS

    return cards_schema.jsonify(all_cards)


@app.route("/admin", methods=['POST'])
def create_card():
    valor = request.json['valor']
    nombre_receptor =request.json['nombre_receptor']
    nombre_emisor =request.json['nombre_emisor']
    mail = request.json['mail']
    mensaje = request.json['mensaje']

    new_card = Card(valor, nombre_receptor, nombre_emisor, mail, mensaje)
    db.session.add(new_card)
    db.session.commit()

    return card_schema.jsonify(new_card)


@app.route("/admin/<id>", methods=['GET'])
def get_card(id):
    card = Card.query.get(id)

    return card_schema.jsonify(card)


@app.route("/admin/<id>", methods=['DELETE'])
def delete_card(id):
    card = Card.query.get(id)

    db.session.delete(card)
    db.session.commit()

    return card_schema.jsonify(card)

    
@app.route("/admin/<id>", methods=['PUT'])
def update_card(id):
    card = Card.query.get(id)

    valor = request.json['valor']
    nombre_receptor =request.json['nombre_receptor']
    nombre_emisor =request.json['nombre_emisor']
    mail = request.json['mail']
    mensaje = request.json['mensaje']

    card.valor = valor
    card.nombre_receptor = nombre_receptor
    card.nombre_emisor = nombre_emisor
    card.mail = mail
    card.mensaje = mensaje

    db.session.commit()

    return card_schema.jsonify(card)

#BLOQUE PRINCIPAL
if __name__ == '__main__':
    app.run(debug=True)