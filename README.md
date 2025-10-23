# Banco Web - Testes Automatizados com Cypress

> Repositório de exemplo usado na Mentoria 2.0 para ensinar automação de testes end-to-end com Cypress (JavaScript).

## Objetivo

Este projeto tem como objetivo mostrar aos alunos da Mentoria 2.0 como estruturar e automatizar testes end-to-end com Cypress e JavaScript. Os exemplos incluem login, transferências e validações de mensagens, organizados usando Custom Commands e geração de relatórios com `cypress-mochawesome-reporter`.

## Componentes do projeto

- Cypress (versão definida em `package.json`) para execução dos testes E2E.
- Arquivos de teste em `cypress/e2e/` (`login.cy.js`, `transferencia.cy.js`).
- Fixtures em `cypress/fixtures/` (ex: `credenciais.json`) com dados reutilizáveis.
- Custom Commands em `cypress/support/commands/` para encapsular interações reutilizáveis:
  - `login.js` — comandos de login (credenciais válidas/inválidas).
  - `transferencia.js` — comando para realizar transferência entre contas.
  - `common.js` — comandos auxiliares (seleção em combobox, verificação de toast).
- Configuração em `cypress.config.js` (contém `baseUrl` e o reporter `cypress-mochawesome-reporter`).
- Relatórios HTML/JSON gerados pela integração com `cypress-mochawesome-reporter`.

> Observação: este projeto só executa corretamente se a API backend e a aplicação web estiverem em execução localmente (links de referência abaixo).

## Pré-requisitos

- Node.js (recomendado >= 16)
- npm
- API backend: https://github.com/juliodelimas/banco-apii  (clonar e rodar localmente)
- Aplicação web: https://github.com/juliodelimas/banco-web  (clonar e rodar localmente)

As aplicações acima precisam estar rodando nas portas que o projeto espera (por padrão o `baseUrl` está configurado em `cypress.config.js` como `http://localhost:4000`). Ajuste se necessário.

## Instalação

1. Clone este repositório ou copie os arquivos para sua máquina.
2. No diretório do projeto instale as dependências:

```bash
npm install
```

3. Verifique/ajuste `cypress.config.js` se sua aplicação estiver em outra porta ou host.

## Scripts úteis

Os scripts do `package.json` incluem (exemplo):

- `npm run test` — executa o Cypress em modo headless (usa `cypress run`).
- `npm run cy:headed` — executa o Cypress em modo headed.
- `npm run cy:open` — abre a interface interativa do Cypress (`cypress open`).

Execute com:

```bash
npm run cy:open
```

ou

```bash
npm run test
```

## Executando os testes

1. Certifique-se de que o backend e a aplicação web estão rodando (veja os repositórios indicados).
2. Ajuste a `baseUrl` em `cypress.config.js` se necessário.
3. Rode os testes via interface ou em linha de comando (veja scripts acima).

### Gerar relatórios

O projeto já integra `cypress-mochawesome-reporter`. Ao executar `cypress run` com a configuração atual, os relatórios serão gerados automaticamente na pasta `cypress/reports/` (HTML e assets estão committados no repositório de exemplo).

## Estrutura dos testes

- `cypress/e2e/login.cy.js` — testes de fluxo de autenticação.
- `cypress/e2e/transferencia.cy.js` — testes de transferência entre contas.

Os testes usam fixtures (`cypress/fixtures/credenciais.json`) para separar dados do código e Custom Commands para manter os testes limpos e legíveis.

## Documentação dos Custom Commands

Os comandos customizados ficam em `cypress/support/commands/` e são importados em `cypress/support/commands.js`.

- `fazerLoginComCredenciaisValidas()`
  - Local: `cypress/support/commands/login.js`
  - O que faz: preenche o campo `#username` e `#senha` com as credenciais válidas definidas em `cypress/fixtures/credenciais.json`, e clica no botão `Entrar`.

- `fazerLoginComCredenciaisInvalidas()`
  - Local: `cypress/support/commands/login.js`
  - O que faz: preenche o formulário com credenciais inválidas e tenta logar (usado para validar mensagens de erro).

- `realizarTranferencia(contaOrigem, contaDestino, valor)`
  - Local: `cypress/support/commands/transferencia.js`
  - Parâmetros: `contaOrigem` (string), `contaDestino` (string), `valor` (número ou texto)
  - O que faz: seleciona as contas no combobox, preenche o valor e clica em `Transferir`.

- `selecionarOpcaoCombobox(labeldoCampo, opcao)`
  - Local: `cypress/support/commands/common.js`
  - O que faz: encontra o campo a partir do `label[for=<labeldoCampo>]`, abre o combobox e escolhe a opção desejada.

- `verificarMensagemNoToast(mensagem)`
  - Local: `cypress/support/commands/common.js`
  - O que faz: valida se um elemento `.toast` contém exatamente o texto `mensagem`.

### Boas práticas ao escrever novos comandos

- Coloque comandos reutilizáveis em `cypress/support/commands/` e importe-os em `cypress/support/commands.js`.
- Prefira usar fixtures para dados mutáveis (credenciais, IDs de contas).
- Mantenha os comandos pequenos e com responsabilidade única para facilitar testes e reuso.

## Dicas de solução de problemas

- Erro: `Missing script` — verifique `package.json` e rode `npm run` para listar scripts disponíveis.
- Erro: `ECONNREFUSED` — verifique se a API/backend está em execução e se a porta configurada em `cypress.config.js` corresponde à aplicação.
- Relatórios não aparecem — confirme se `cypress-mochawesome-reporter` está instalado (`npm ls cypress-mochawesome-reporter`) e se o plugin é carregado em `cypress.config.js`.

## Próximos passos e melhorias (sugestões)

- Adicionar um script `start` ou `server-api` para subir a API localmente via npm (se o backend for parte deste repositório).
- Incluir mais testes com dados parametrizados e testes de contrato para a API.
- Integrar CI (GitHub Actions) para rodar os testes e publicar relatórios automaticamente.

## Contato

Se tiver dúvidas ou quiser contribuir, abra uma issue neste repositório.
