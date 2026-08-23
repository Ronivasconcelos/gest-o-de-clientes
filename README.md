# Gestão de Clientes — GitHub Pages

Sistema estático de gestão de clientes feito com HTML, CSS e JavaScript puro. Não precisa de PHP, MySQL, Node ou servidor.

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todos os arquivos desta pasta mantendo a estrutura:
   - `index.html`
   - `assets/css/style.css`
   - `assets/js/app.js`
3. No GitHub, abra **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/ (root)`.
6. Salve e aguarde o endereço do GitHub Pages aparecer.

## Recursos

- Cadastro, edição e exclusão de clientes.
- Busca por nome, e-mail, CPF e empresa.
- Filtros por pago/pendente.
- Índice alfabético.
- Histórico de pagamentos.
- Fotos armazenadas localmente no navegador.
- Persistência com `localStorage`.
- Layout responsivo para computador e celular.
- Impressão do cadastro selecionado.
- Botão **Backup PDF** com relatório completo de clientes, status e valores; ao clicar, o navegador abre a visualização de impressão para salvar como PDF.
- Backup JSON pelo atalho `Ctrl + Shift + B`.
- Restauração dos dados de exemplo pelo atalho `Ctrl + Shift + R`.

## Observação importante

Este projeto é **local**: cada navegador/dispositivo possui seus próprios dados. GitHub Pages não fornece banco de dados nem sincronização entre usuários. Para login, multiusuário, banco de dados, API ou acesso compartilhado, será necessário um backend ou serviço externo.
