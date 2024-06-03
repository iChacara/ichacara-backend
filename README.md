## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ docker compose up -d
```

#### Now you are ready to go

## Util commands

```bash
# Acessar container docker da api
$ docker exec -it api sh
```

```bash
# Fazer alterações no prisma
$ npx prisma db push
```

```bash
# Instalar cli da aws local para usar com localstack
$ pip3 install awscli-local --break-system-packages
```

```bash
# Criar bucket que será usado para subir os arquivos estáticos
$ awslocal s3 mb s3://ichacara
```

```bash
# Configurar awslocal com os dados da aws
$ aws configure --profile localstack
# Preencha as informações solicitadas:
# AWS Access Key ID: S3RVER
# AWS Secret Access Key: S3RVER
# Default region name: us-east-1
# Default output format: json
```

## Technologies
Nest.js, Prisma, Typescript

## Frontend repository
[ichacara-frontend](https://github.com/iChacara/ichacara-backend)
