# Aplicativo de Receitas simples com Expo.

## Como rodar o projeto
  - Para rodar esse projeto, clone ele com o comando:
    ```
    git clone https://github.com/HigorJ/RecipeApp-ReactNative.git
    ```

  - No console ou prompt de comando, vá para a pasta do projeto.

  - Instale as dependências com o seguinte comando (Caso já tenha o NPM instalado):
    ```
    npm install
    ```

  - Depois que instalar as dependências, rode: 
    ```
    npm run start
    ```

  - Ao rodar o comando, você verá a seguinte tela abrir no browser:
    ![expo](doc-images/expo.png)

  - Rode no dispositivo que quiser, emulador android, ios etc.

## Tecnologias
  - Expo.
  - SQLite.
  
## Screens
  - Ao iniciar o app e ele carregar, você verá essa tela de menu vazio:]
  &nbsp;
  ![empty-menu](doc-images/empty-menu.png)

  - Se clicar no botão flutuando de "+", ele redirecionará você para a tela de criar uma nova receita:
  &nbsp;
  ![empty-recipe](doc-images/empty-recipe.png)

  - Para adicionar um ingrediente clique no botão "+" na aba de ingredientes. O mesmo ocorre para os passos do modo de preparo e as observações. Ao concluir, a tela ficará assim:
  &nbsp;
  ![recipe](doc-images/recipe.png)

  - Ao salvar a receita, o menu ficará assim:
  &nbsp;
  ![recipe](doc-images/menu.png)

  - E ao clicar em uma receita já criada, redirecionará para essa tela que você poderá usar para atualizar a receita ou para deletar ela:
  &nbsp;
  ![stored-recipe](doc-images/stored-recipe.png)
