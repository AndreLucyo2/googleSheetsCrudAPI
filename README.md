# googleSheetsCrudAPI

Estudo da API do Google com foco em google Sheets

-   Acessar o console do google cloud  
    console.cloud.google.com
-   Crie e Selecione o projeto  
    Selecione o projeto e deixe ativo
-   Selecione o gerenciamento de API  
-   Ative os serviços de API no projeto selecionado  
-   Ative a API do google Sheets  
-   Crie o usuário para o serviço credenciais  
-   Obtenha as chaves da API  
    Acesso o painel e selecione a conta de serviço criada para gerar as chaves para o serviço  
    Faça o dowload do .json com os dados de acesso:  
    Exemplo do json gerado:
    ```json
    {
    	"type": "service_account",
    	"project_id": "newcrudgseets",
    	"private_key_id": "",
    	"private_key": "",
    	"client_email": "",
    	"client_id": "",
    	"auth_uri": "https://accounts.google.com/o/oauth2/auth",
    	"token_uri": "https://oauth2.googleapis.com/token",
    	"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    	"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/newcrud%40newcrudgseets.iam.gserviceaccount.com",
    	"universe_domain": "googleapis.com"
    }
    ```
-   Criar uma pasta para o projeto node.  
    Obs. Ter o node instalado
    inicia o node
    ```json
    npm init -y
    ```
-   Instalar o modulo googleapis

    ```json
    npm install --save-dev googleapis
    ```

    -   Instalar o modulo google-auth-library

    ```json
    npm install --save-dev google-auth-library
    ```
