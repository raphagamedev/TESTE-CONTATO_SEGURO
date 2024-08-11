##############################################################################################################
+--------------------------------+
|		 CASOS DE TESTE			 |
+--------------------------------+

Cenário 1: Acesso a página principal / Tentativa de cadastro / Cadastro correto

Passos:

O usuário acessa a página de cadástro
O usuário clica no botão "+ Usuário"
É aberta uma nova janela
O usuário preenche os campos obrigatórios (nome, email,telefone, cidade de nascimento, data de nascimento, Emmpresas).
E preencher os campos obrigatórios com as seguintes informações:
      | Nome             | Email               | Telefone       | Data de Nascimento | Cidade    | Empresa       |
      | João da Silva    | joao@example.com    | 11999999999    | 15/05/1985         | São Paulo | Empresa 1   |
O usuário clica no botão "Salvar"
Então o usuário "João da Silva" deve aparecer na lista de usuários


Resultado Esperado:

O sistema valida os campos obrigatórios em branco.
O sistema exibe a mensagem confirmando o cadastro.
O sistema exibe o vvalor cadastrado na lista da pagina mantendo a ordem de cadastro 

Resultado Final: [PASSOU]

###############################################################################################################

Cenário 2: Acesso a página principal / Tentativa de cadastro / Cadastro incorreto [em branco]
 
O usuário acessa a página de cadástro
O usuário clica no botão "+ Usuário"
É aberta uma nova janela
O usuário deixar em branco os campos obrigatórios (nome, email,telefone, cidade de nascimento, data de nascimento, Emmpresas).
E deixar os seguintes campos em branco:
      | Nome | Email | Telefone | Data de Nascimento | Cidade | Empresa |
E eu clicar no botão "Salvar"
Então eu devo ver mensagens de erro indicando que os campos são obrigatórios:
      | Nome             	| "Campo obrigatório" |
      | Email            	| "Campo obrigatório" |
      | Telefone         	| "Campo obrigatório" |
      | Data de Nascimento 	| "Campo obrigatório" |
      | Cidade           	| "Campo obrigatório" |
      | Empresa          	| "Campo obrigatório" |
O usuário clica no botão "Salvar"

Resultado Esperado:

O sistema valida os campos obrigatórios em branco.
O sistema exibe a mensagem de obrigatoriedade dos campos de cadastro.
O sistema nao permitirá o cadastrado. 

Resultado Final: [PASSOU]

###############################################################################################################

Cenário 3: Acesso a página principal / Tentativa de cadastro / Cadastro incorreto [valores errados]
 
O usuário acessa a página de cadástro
O usuário clica no botão "+ Usuário"
É aberta uma nova janela
O usuário preencherá de forma negligente os campos obrigatórios (nome, email,telefone, cidade de nascimento, data de nascimento, Emmpresas).
E preencher os campos com as seguintes informações:
      | Nome          | Email           | Telefone    | Data de Nascimento | Cidade    | Empresa       |
      | Maria Souza   | mariaemail.com  | 11999999999 | aa/aa/aaaaa        | Rio de Janeiro | Empresa ABC |
O usuário clica no botão "Salvar"
Então eu devo ver uma mensagem de erro "Formato de data inválido"
E o usuário não deve ser cadastrado

Resultado Esperado:

O sistema valida os campos obrigatórios.
O sistema exibe a mensagem de Preenchimento Incorreto referente ao campos de cadastro.
O sistema nao permitirá o cadastrado. 

Resultado Final: [FALHOU]

O Sistema não validou os campos obrigatórios permitindo preencher com numeros campos 
que deveriam ser apenas letras e letras onde deveriamm ser numeros, 
o campo mais critico foi no Data de nascimento que ao ser preenchido como aa/aa/aaaaaa causou um conflito e quebrando o sistema.
Onde para sanar foi preciso entrar diretamente no banco e remover o usuário cadastrado de forma indevida:

Segue abaixo a resolução da querry: 

	START TRANSACTION;
	COMMIT
	
	DELETE 
	FROM
		user
	WHERE
		id_user = 35


###############################################################################################################

Cenário 4: Acesso a página principal / Editar de cadastro

Passos:

O usuário acessa a página de cadástro
O usuário clica no botão "Edição"
É aberta uma nova janela
O usuário preenche os campos obrigatórios (nome, email,telefone, cidade de nascimento, data de nascimento, Emmpresas).
O usuário clica no botão "Salvar"

Resultado Esperado:

O sistema valida os campos obrigatórios.
O sistema exibe a mensagem confirmando a edição.
O sistema atualiza a lista exibida a atual informação de cadastro
O sistema exibe o valor editado na lista da pagina mantendo a ordem de cadastro 

Resultado Final: [FALHOU]

O sistema aparentemente esta com o botão de edição sem ação

###############################################################################################################

Cenário 5: Acesso a página principal / Deletar cadastro

Passos:

O usuário acessa a página de cadástro
O usuário clica no botão "Delete"
É aberta uma nova janela com a mensagemm "Sucesso! Usuário deletado com sucesso!"
O usuário clica no botão "OK"

Resultado Esperado:

O sistema valida os campos obrigatórios.
O sistema exibe a mensagem confirmando a exclusão do cadastro.
O sistema atualiza a lista 
O sistema não deve exibir o item deletado
O sistema exibe a atual lista da pagina 

Resultado Final: [FALHOU]

O sistema retorna o aviso de exclusão com sucesso porém ainda mantem o registro 
que devveria ter sido excluido, aparentemente a requisição feita não esta chegando ao banco 
ou não possui permissão para exclusao do usuário, assim não atualizando a lista

######################################################################################################
+--------------------------------+
|		    MELHORIAS     		 |
+--------------------------------+              

Feature: Responsividade da aplicação web

  Como um usuário da aplicação web
  Quero que a aplicação seja responsiva
  Para que eu possa navegar e interagir com a aplicação em diferentes tamanhos de tela e dispositivos

  Cenário 1: Verificar a responsividade em dispositivos móveis
    Dado que eu estou na página inicial da aplicação web
    Quando eu redimensiono a tela para 375x667 (tamanho de um dispositivo móvel)
    Então a página deve ajustar seu layout para se adequar ao tamanho da tela
    E os elementos da página devem ser exibidos corretamente sem sobreposição
    E os botões e campos de entrada devem ser clicáveis e utilizáveis

  Cenário 2: Verificar a responsividade em tablets
    Dado que eu estou na página inicial da aplicação web
    Quando eu redimensiono a tela para 768x1024 (tamanho de um tablet)
    Então a página deve ajustar seu layout para se adequar ao tamanho da tela
    E os elementos da página devem ser exibidos corretamente sem sobreposição
    E os botões e campos de entrada devem ser clicáveis e utilizáveis

  Cenário 3: Verificar a responsividade em desktops
    Dado que eu estou na página inicial da aplicação web
    Quando eu redimensiono a tela para 1440x900 (tamanho de um desktop)
    Então a página deve ajustar seu layout para se adequar ao tamanho da tela
    E os elementos da página devem ser exibidos corretamente sem sobreposição
    E os botões e campos de entrada devem ser clicáveis e utilizáveis

  Cenário 4: Verificar a responsividade ao usar diferentes orientações
    Dado que eu estou na página inicial da aplicação web
    Quando eu rodo o dispositivo na orientação paisagem
    Então a página deve ajustar seu layout para se adequar à nova orientação
    E os elementos da página devem ser exibidos corretamente sem sobreposição
    E os botões e campos de entrada devem ser clicáveis e utilizáveis

  Cenário 5: Verificar a responsividade ao usar diferentes tamanhos de fonte
    Dado que eu estou na página inicial da aplicação web
    Quando eu ajusto o tamanho da fonte para "Grande" nas configurações do navegador
    Então a página deve ajustar seu layout para se adequar ao novo tamanho da fonte
    E os elementos da página devem ser exibidos corretamente sem sobreposição
    E os botões e campos de entrada devem ser clicáveis e utilizáveis
