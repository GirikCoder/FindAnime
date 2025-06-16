from flask import Flask, render_template, request
import pandas as pd

app = Flask(__name__)

@app.route('/')
def home():
    # Static list of top anime of the week (can be dynamic later)
    top_anime = [
        {"name": "Demon Slayer", "genre": "Action", "score": 8.7},
        {"name": "Jujutsu Kaisen", "genre": "Supernatural", "score": 8.5},
        {"name": "Attack on Titan", "genre": "Action, Drama", "score": 9.0}
    ]
    return render_template("index.html", top_anime=top_anime)

@app.route('/search')
def search():
    return render_template("search.html")

@app.route('/results', methods=['POST'])
def results():
    user_input = request.form.get("description", "").lower()
    # In Phase 2: Use this to filter dataset and show recommendations
    return render_template("results.html", user_input=user_input, results=[])

if __name__ == '__main__':
    app.run(debug=True)
