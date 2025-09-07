# Desafio Abrigo de Animais - Lara Evellyn

## O Desafio

Você foi contratado para ajudar na organização de um abrigo de animais.  
Sua missão é **encontrar pessoas aptas a adotar os animais**, respeitando algumas regras específicas.

---

## Regras para unir pessoas com animais

1. O animal vai para a pessoa que **mostrar todos os seus brinquedos favoritos na ordem correta**.  
2. Uma pessoa pode intercalar **brinquedos que o animal queira ou não**, desde que a ordem desejada seja respeitada.  
3. **Gatos não compartilham seus brinquedos** com outros animais da mesma pessoa.  
4. Se **ambas as pessoas** atenderem aos critérios de adoção, **nenhuma delas fica com o animal**.  
5. Uma pessoa **não pode levar mais de três animais** para casa.  
6. **Loco (jabuti)** não se importa com a ordem dos seus brinquedos, desde que tenha **outro animal como companhia** e possua todos os brinquedos que gosta.

---

## Entradas e Saídas

### Entradas

O programa recebe **três parâmetros de texto** separados por vírgula:

1. Brinquedos da primeira pessoa (ex: `"RATO,BOLA,LASER"`)  
2. Brinquedos da segunda pessoa (ex: `"NOVELO,BOLA,LASER"`)  
3. Ordem em que os animais devem ser considerados (ex: `"Rex,Fofo,Loco"`)

### Saídas

O programa retorna uma estrutura contendo:

- **Lista em ordem alfabética** dos animais, indicando com quem ficaram ou se voltaram para o abrigo.
- **Formato da saída:**  
  - `"nome do animal - pessoa 1"`  
  - `"nome do animal - pessoa 2"`  
  - `"nome do animal - abrigo"`  
- Caso haja **animal inválido ou duplicado**, retorna `"Animal inválido"`.  
- Caso haja **brinquedo inválido ou duplicado**, retorna `"Brinquedo inválido"`.

---

## Estrutura do Projeto
desafio-laraedias-2025/
│
├─ abrigo-animais.js # Código principal do desafio
├─ abrigo-animais.test.js # Testes automatizados (Jest)
├─ package.json # Dependências do projeto
├─ package-lock.json # Lockfile do npm
├─ .gitignore # Arquivos e pastas ignoradas pelo Git
└─ README.md # Este arquivo
