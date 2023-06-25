# GameCenter

Projeto desenvolvido no desafio para vaga de estágio da App Masters

#

## Preview

<img src="https://i.imgur.com/Oxd93r0.png" />
<img src="https://i.imgur.com/IbNgxvR.png" />
<img src="https://i.imgur.com/0jZXPZw.png" />
<img src="https://i.imgur.com/cOzkxQ4.png" />

#

## Tecnologias

- Vite
- React
- TypeScript
- Styled-Components
- React-hook-form
- Zod
- Axios

#

## Requisitos Funcionais

- [ x ] O projeto deve ser feito usando React ou Next.JS

- [ x ] Obter a lista de jogos em `/data`

- [ x ] Apresentar um loader enquanto os dados são obtidos

- [ x ] Apresentar os jogos em três colunas (no computador)

- [ x ] Em cada card apresentar o título e imagem pelo ao menos

- [ x ] Lidar com a responsividade, para que fique bem apresentado no computador, tablets ou celular

- [ x ] Quando a API retornar o `status code` 500, 502, 503, 504, 507, 508 ou 509 apresentar ao usuário `O servidor fahou em responder, tente recarregar a página`

- [ x ] Caso a API retorne outros erros, apresentar `O servidor não conseguirá responder por agora, tente voltar novamente mais tarde`

- [ x ] Ao realizar uma chamada, não esperar mais que 5 segundos pelo retorno. Se os dados demorarem mais de 5 segundos para retornar apresentar `O servidor demorou para responder, tente mais tarde`

- [ x ] Sempre que apresentar uma mensagem para o usuário, ou tiver os dados em mãos para apresentar, ocultar o loader

- [ x ] Incluir um campo de busca, que permite localizar jogos pelo título, com busca case insensitive

- [ x ] Uma vez que tenha os dados em mãos, veja quais `genre` foram retornados e permita ao usuário selecionar um deles, e então filtre para exibir apenas jogos do gênero selecionado

#

## Instalação

### Clone o projeto

```cmd
git clone https://github.com/joao-pedro-moreno/GameCenter.git
cd GameCenter
```

### Instale as dependências

```cmd
npm install
```

### Rodando o projeto

```cmd
npm run dev
```

O projeto irá estar disponível para acesso no browser no endereço <http://localhost:3001>

#

## Licença

Este projeto está licenciado sob a licença MIT.

#

Projeto desenvolvido por <a href="https://github.com/joao-pedro-moreno">João Pedro Moreno</a>
