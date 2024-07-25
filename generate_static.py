from flask import Flask, render_template
import os

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/skills')
def skills():
    return render_template('skills.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

def generate_static_files():
    with app.test_request_context():
        # Create a folder to store the static files
        if not os.path.exists('static_site'):
            os.makedirs('static_site')

        pages = [
            ('index.html', 'home'),
            ('about.html', 'about'),
            ('projects.html', 'projects'),
            ('skills.html', 'skills'),
            ('contact.html', 'contact'),
        ]

        for filename, route in pages:
            rendered = app.view_functions[route]()
            with open(os.path.join('static_site', filename), 'w') as f:
                f.write(rendered)

if __name__ == '__main__':
    generate_static_files()