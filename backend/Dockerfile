FROM python:3.10-bullseye

WORKDIR /app
RUN pip install --upgrade pip
COPY . /app

RUN pip install -r requirements.txt
EXPOSE 8000
CMD python manage.py runserver 0.0.0.0:8000
