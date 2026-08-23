# Gestão de Clientes — Aplicativo para Windows

Esta versão transforma o sistema web em aplicativo desktop usando Electron.

## Recursos

- Executável para Windows (`.exe`)
- Janela própria, sem navegador
- Dados mantidos localmente pelo aplicativo
- Cadastro, edição, exclusão e pesquisa de clientes
- Controle de pagamentos
- Backup em JSON
- Backup em PDF com janela nativa de **Salvar como**
- Impressão do cadastro do cliente

## Gerar o instalador

É necessário ter Node.js instalado.

```bash
npm install
npm run dist
```

O instalador será criado na pasta `dist/` com o nome parecido com:

`Gestao-de-Clientes-Setup-1.0.0.exe`

## Executar sem instalar

```bash
npm install
a npm run start
```

Corrija o comando acima para:

```bash
npm run start
```

## Observação

O aplicativo usa armazenamento local do Electron. Os dados não ficam em um servidor ou no GitHub.
