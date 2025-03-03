FROM python:3.11

WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir -r /app/MedEase-ML/requirements.txt

RUN apt-get update && apt-get install -y \
    nodejs \
    npm

RUN npm install -g npm@7

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]