
from flask import Flask, render_template
import os

app = Flask(__name__)

@app.route("/")
def index():
    image_files = sorted([f for f in os.listdir("static") if f.endswith(".png")],
                         key=lambda x: int(x.split("_")[-1].split(".")[0]))
    return render_template("index.html", images=image_files)

if __name__ == "__main__":
    app.run(debug=True)
