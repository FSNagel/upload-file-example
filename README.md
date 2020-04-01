# UploadFileExample
Aplicação exemplo de uploads de arquivos. Front-end em React.js e back-end em Node.js.

<img src="https://github.com/FSNagel/UploadFileExample/blob/master/preview.png?raw=true" />

<h2>Back-end</h2>
Api rest comunicação via Json, banco noSql MongoDB, para salvar as imagens em produção foi usado o cdn da Amazon o s3, em homologação alterando no arquivo .env o STORAGE_TYPE para local as imagens são salvar na pasta "tmp/uploads". 

<h3>Variáveis de Ambiente</h3>

Cria as variáveis de ambiente em produção, para homologação cria um arquivo .env na raiz do backend da aplicação:
- APP_URL= Url da aplicação.
- STORAGE_TYPE= local ou s3
- MONGO_URL= url do banco mongo
- BUCKET_NAME= nome do bucket 
- AWS_ACCESS_KEY_ID= acess key do usuário IAM da AWS
- AWS_SECRET_ACCESS_KEY= acess secret key do usuário IAM da AWS
- AWS_DEFAULT_REGION= região do docker

<h2>Front-end</h2>
Feito com React.js, usando Hooks de useState em quase todos elementos, a excessão é no App, teve um problema em que o estado não era alterado a tempo, então troquei o functional component por class component. Se quiser o arquivo com o functional component está como AppFunction.js está na src, basta remover o outro App, renomeá-lo e ajustar o erro.

<h6>Tutorial Diego Fernando - Rocketseat</h6>

- Vídeo 1 - Back-end - https://www.youtube.com/watch?v=MkkbUfcZUZM
- Vídeo 2 - Front-end - https://www.youtube.com/watch?v=G5UZmvkLWSQ

