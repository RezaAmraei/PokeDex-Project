from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash, session
class Pokemon:
    def __init__(self, data):
        self.id = data['id']
        self.pokemon_index = data['pokemon_index']
        self.user_id = data['user_id']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    @classmethod
    def get_by_id(cls, data):
        query = "SELECT * FROM fav_poke WHERE user_id = %(id)s;"
        results = connectToMySQL('pokedex').query_db(query, data)
        # pokemons = []

        # for pokemon in results:
        #     pokemons.append ( cls(pokemon))
        # return pokemons
        print(type(results))
        return results

    @classmethod
    def add_fav(cls, data):
        query = "INSERT INTO fav_poke (pokemon_index, user_id, created_at, updated_at) VALUES (%(pokemon_index)s,%(user_id)s, NOW(), NOW());"
        print('======================QUERY RAN===============================')
        return connectToMySQL('pokedex').query_db(query, data)
    
    @classmethod
    def delete(cls, data):
        query = "DELETE FROM fav_poke WHERE id = %(id)s; "
        return connectToMySQL('pokedex').query_db(query, data)

    @classmethod
    def battle(data):
        pass

