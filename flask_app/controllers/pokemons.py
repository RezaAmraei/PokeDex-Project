
import re
from flask import render_template, redirect, session, request, flash, Flask, jsonify

from flask_app.models.pokemon import Pokemon

from flask_app import app

@app.route('/favorite')
def favs():
    data = {
        'id': session['user_id']
    }
    favs_of_user = Pokemon.get_by_id(data)
    return render_template('favorite.html', favs_of_user = favs_of_user)

@app.route('/adding/fav', methods=['POST'])
def add_fav():
    data = {
        'pokemon_index': request.form['pokemon_index'],
        'user_id' : session['user_id']
    }
    print('-------------------------It reached This route-----------------------------')
    Pokemon.add_fav(data)
    return redirect('/favorite')

@app.route('/delete/<int:id>')
def delete(id):
    data = {
        'id': id
    }
    Pokemon.delete(data)
    return redirect('/favorite')

@app.route('/api/favs')
def api():
    data = {
    'id': session['user_id']
    }
    favs_of_user = Pokemon.get_by_id(data)
    print('=======================', favs_of_user, '=================')
    # print('=======================', jsonify(favs_of_user), '=================')
    return jsonify(favs_of_user)

@app.route('/storing/pokemon', methods = ["POST"])
def storing():
    session['pokemon'] = request.form['battle_pokemon']

    
    return redirect('/battle')


@app.route('/battle/api')
def battle_api():
    data =[{
        'pokemon_index' : session['pokemon']
    }]
    print('=======================', jsonify(data), '=================')
    return jsonify(data)

@app.route('/battle')
def battle():
    return render_template('battle.html')