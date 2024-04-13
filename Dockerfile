FROM node

# Instalar TypeScript
RUN npm install -g typescript

WORKDIR /myapp
COPY package.json .
RUN npm install
COPY . .

# Compilar TypeScript
RUN npm run build

EXPOSE 3000

CMD npm start