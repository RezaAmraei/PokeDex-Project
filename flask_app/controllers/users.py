from flask import render_template, redirect, session, request, flash, Flask

from flask_app.models.user import User

from flask_app import app
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)

@app.route('/')
def index():
    
    return redirect('/home')

@app.route('/logging/in')
def logging_in():
    
    return render_template('login.html')

@app.route('/login',  methods=["POST"])
def login():
    data = {
        'email': request.form['email']
    }
    user_in_db = User.get_by_email(data)

    if not user_in_db:
        flash("Invalid Email/Password", 'login')
        return redirect('/logging/in')
    
    if not bcrypt.check_password_hash(user_in_db.password, request.form['password']):
        flash("Invalid Email/Password", 'login')
        return redirect('/logging/in')

    session['user_name'] = user_in_db.first_name + ' ' + user_in_db.last_name
    session['user_id'] = user_in_db.id
    print(session['user_id'])
    return redirect('/home')

@app.route('/registering')
def registering():
    
    return render_template('reg.html')

@app.route('/reg', methods=["POST"])
def reg():
    check = {'email' : request.form['email']}
    if not User.validate_user(request.form):
        return redirect('/registering')
    if  User.check_existing_email(check):
        flash('Email already registered', 'email')
        return redirect('/registering')
    pw_hash = bcrypt.generate_password_hash(request.form['password'])
    print(pw_hash)
    data = {
        "first_name" : request.form['first_name'],
        "last_name" : request.form['last_name'],
        "email" : request.form['email'],
        "password" : pw_hash
    }
    user_id = User.save(data)
    session['user_id'] = user_id
    return redirect('/home')

@app.route('/home')
def home():

    # name = session['user_name']
    
    if 'user_id' in session:
        id = True
        print('-----------LOGGED IN---------------')
        
    else:
        id = False
    return render_template('index.html', id = id)
    

@app.route('/logout')
def logout():
    session.pop('user_name', None)
    session.pop('user_id', None)
    return redirect('/')