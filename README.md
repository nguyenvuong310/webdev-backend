python3 -m venv src/database/seeds/.venv
source src/database/seeds/.venv/bin/activate
pip3 install psycopg2-binary pandas sqlalchemy python-dotenv
python3 src/database/seeds/seed.py
