FROM python:latest as build
WORKDIR /data_engineering

COPY . .
RUN pip3 install --no-cache-dir -r requirements.txt
COPY . .

CMD ["python3", "app.py"]



