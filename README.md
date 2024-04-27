## Alunos:
### Arthur Trevizani Buback
### Maria Luiza Souza Pinheiro
## Disciplina: Programação Avançada para WEB
## Turma: CC5Mb
## Docente: Wagner de Andrade Perin

## Ideia do projeto:
Realizar uma API que simula uma biblioteca, com capacidades de "Retornar", "Adicionar", "Atualizar" e "Deletar" determinadas categorias, estas sendo "Livros" e "Categorias", de maneira que armazene os dados das informações.
Além disso, a API também restringe o usuário caso este não possua permissões necessárias para realizar a tarefa requisitada.

## Etapas:
Primeiramente, após realizar a instalação dos arquivos deste repositório, utilize "**npm install**" para instalar os arquivos faltantes.

Também é necessário criar o arquivo "**.env**" e preencher nele as seguintes informações:
```
STAGE='test'
PORT=3000
HOST='127.0.0.1'
JWT_SECRET='Abcd@12345'
DB_URL='mongodb://localhost:27017/biblioteca'
```

Por fim, utilizamos "**npm run dev**" para inicializarmos o servidor.

Para utilizar vários comandos do servidor, necessitamos do "**x-access-token**", e para adquiri-lo, precisarmos alterar a "**URL**" para "http://127.0.0.1:3000/auth" e o "GET" para "POST"; depois, selecionar "Body" e preencher com
```
{
  "username":"Arthur",
  "password":"Abcd@12345"
}
```
Quando isto for feito, selecionamos "Headers" e preenchemos "header" com "x-access-token" e "value" com o conjunto de letras que adiquirimos.

Agora, podemos realizar alguns comandos que não poderiamos anteriormente.

## Algumas informações extras de como utilizar o Thunder Client:
"http://127.0.0.1:3000/books" para utilizar comandos em "Livros"

"http://127.0.0.1:3000/genres" para utilizar comandos em "Gêneros"

"http://127.0.0.1:3000/register" para fazer o POST "Registro"

Para utilizar o comando "DELETE", precisamos por o id na frente da rota "books".

Para utilizar o comando "POST", devemos modificar o body de acordo com as propriedas que são requisitos de cada rota.

Para utilizar o comando "PUT", devemos modificar o body de acordo com a atualização que deseja fazer.
