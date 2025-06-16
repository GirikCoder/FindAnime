from flask import Flask, render_template, request
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


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
    description = request.form['description']
    recommendations = get_recommendations(description)

    return render_template('results.html', animes=recommendations.to_dict(orient='records'))
# Load anime data
anime_df = pd.read_csv("anime_data.csv")

# TF-IDF model
# Combine synopsis and genre for better match
anime_df['text'] = anime_df['genre'].fillna('') + " " + anime_df['synopsis'].fillna('')

# TF-IDF on combined text
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(anime_df['text'])


def get_recommendations(user_description):
    user_vec = tfidf.transform([user_description])
    sim_scores = cosine_similarity(user_vec, tfidf_matrix).flatten()

    # Combine with DataFrame and sort
    anime_df['score'] = sim_scores
    top = anime_df.sort_values(by='score', ascending=False).head(5)

# Normalize score only if max is not zero
    if top['score'].max() > 0:
        top['match'] = (top['score'] / top['score'].max()) * 10
    else:
        top['match'] = 0
    return top[['name', 'genre', 'match']]


if __name__ == '__main__':
    app.run(debug=True)
