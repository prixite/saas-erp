# SAAS-ERP

## Technology Stack
  - Python 3.10
  - Node v17.7.0

## Project Setup
  After succesful installtion of required technologies and mentioned versions do following in specified sequence.
  - Create a file named `.env`  Get values from project admin and paste in new file.
  - [Create](https://docs.python.org/3/library/venv.html#creating-virtual-environments) a virtual environment for Python
  - Activate the virtual environment.
  - Run the following commands
    - *Initiate Backend*
      - `pip install -r requirements-dev.txt` to install required packages
      - `./manage.py migrate`  to create tables on DB layer
      - `./manage.py runserver`  to start backend development server.

        This would start the server at [localhost:8000](http://localhost:8000)

    - *Build Frontend*
      - `npm install` to install the required packages
      - `npm run start` to build the bundle


    - *Setup [pre-commit](#pre-commit)*
      - `pre-commit install --hook-type pre-push` to use pre-commit hook with push

## Run tests:
  We write unit-tests to assure correct funcionality. To excute test cases, run `./manage.py test`

## Pre-commit:
  We use pre-commit to ensure code quality and hook these with actions (pre-commit/pre-push). These actions trigger pre-commit to ensure standards before the code is pushed to remote repository.

## Data & database
  We use a [factory-boy](https://factoryboy.readthedocs.io/en/stable/) to populate database with dummy data.
  - Run `./manage.py generate` to add data to the database
  - Use `./manage.py flush` to clear the database
