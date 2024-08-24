# Comandos utilizados
Criar controller
`nest g co controllers/lessee --no-spec --flat`

Criar service
`nest g s services/lessee --no-spec --flat`

Criar migration
`npx prisma migrate dev --name init`

---
# Acessos
## Postman
email: maria-fernanda-dalla@tuamaeaquelaursa.com
email: maria-fernanda-dalla@tuamaeaquelaursa.com

---
# Configuração de ambiente
## Localstack (AWS)
*Rodar ambiente local AWS*

`docker run --rm -it -p 4566:4566 -p 4510-4559:4510-4559 localstack/localstack`

*Criar o bucket AWS para armazenamento de arquivos estáticos*

`awslocal s3api create-bucket --bucket sample-bucket`

## Aplicação
*Instalar dependências*

`npm i`

*Executar o projeto*

`npm run start:dev`