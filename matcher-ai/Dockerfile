FROM python:3.7-stretch

RUN apt-get update && apt-get install -yq build-essential libpq-dev python-dev

WORKDIR /matcher-ai

COPY requirements.txt /matcher-ai

RUN pip install --upgrade pip \
    && pip install -r requirements.txt

COPY . /matcher-ai

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

ENTRYPOINT gunicorn -b 0.0.0.0:8000 'main:app'
