Avaliação Prática - Backend (API)
Conteúdo principal
Condições de conclusão
Sistema de gerenciamento de produtos e controle de estoque
Modalidade: Individual
Tempo disponível: 3 horas e 30 minutos

 
Capacidades avaliadas
C1 - Reconhecer requisitos de qualidade, integridade, usabilidade e segurança da informação.

C5 - Integrar sistemas multiplaformas por meio da linguagem de programação.

C6 - Aplicar linguagem de programação por meio de APIs, bibliotecas e frameworks na construção de rotinas de software.

 
Contextualização
A Organiza Comercial é uma empresa especializada na distribuição de produtos para pequenos estabelecimentos comerciais. Com o crescimento de suas operações, o controle das mercadorias passou a apresentar dificuldades que afetam a organização e a confiabilidade das informações utilizadas pela equipe.

Atualmente, os funcionários registram os produtos e acompanham as quantidades disponíveis por meio de planilhas e anotações separadas. Como consequência, algumas informações ficam desatualizadas, há dificuldades para identificar mercadorias próximas do esgotamento e nem sempre é possível localizar rapidamente todos os produtos pertencentes a determinado grupo.

A empresa também identificou problemas durante as atualizações dos registros, como valores inconsistentes e quantidades incorretas. A ausência de um armazenamento centralizado dificulta a manutenção da integridade das informações e aumenta o risco de falhas nas consultas e operações realizadas pelos funcionários.

Diante dessa situação, a direção decidiu contratar uma equipe de desenvolvimento de software para construir uma solução de backend que centralize os dados dos produtos, permita o gerenciamento das informações e facilite o acompanhamento das condições do estoque.

 
 
Desafio
Você foi contratado(a) pela Organiza Comercial para desenvolver uma API REST para o gerenciamento de produtos e o controle de estoque da empresa.

A solução deverá permitir que os funcionários mantenham os registros dos produtos comercializados, consultem suas informações, realizem alterações e removam registros quando necessário. Também deverá possibilitar a localização de produtos por sua categoria e a identificação daqueles que precisam de atenção em relação à disponibilidade em estoque.

Durante o levantamento das necessidades, a empresa estabeleceu as seguintes regras de negócio:

Cada produto deve possuir uma identificação própria, além de informações que permitam reconhecê-lo, descrevê-lo e determinar seu preço de venda.

Os produtos devem ser organizados de acordo com suas categorias. Cada produto pertence a uma categoria, enquanto uma mesma categoria pode estar associada a diversos produtos.

Para cada produto, deve ser possível acompanhar a quantidade de unidades disponíveis e a quantidade mínima desejada para o estoque.

O preço de venda deve ser maior que zero. As quantidades disponíveis e mínimas devem ser números inteiros não negativos.

O nome do produto e as demais informações obrigatórias devem ser preenchidos corretamente antes da conclusão de um cadastro.

A categoria associada a um produto deve existir no banco de dados.

Na atualização de um produto, deve ser possível modificar todas as suas informações ou somente aquelas que precisarem ser alteradas. Os dados recebidos devem ser validados conforme as regras de negócio.

Um produto inexistente não pode ser tratado como se tivesse sido encontrado, atualizado ou excluído com sucesso.

A situação do estoque deve ser determinada com base na quantidade disponível e na quantidade mínima definida para o produto:

Estoque normal: quantidade disponível superior à quantidade mínima.

Estoque baixo: quantidade disponível maior que zero e menor ou igual à quantidade mínima.

Sem estoque: nenhuma unidade disponível.

A consulta dos produtos deve permitir a aplicação independente de filtros por categoria ou por situação do estoque.

As operações realizadas pela API devem preservar a integridade dos registros e evitar inconsistências entre os dados armazenados.

Além das regras de negócio, a empresa espera que a solução apresente organização adequada do código, comunicação confiável com o banco de dados, proteção das configurações de acesso e tratamento apropriado de erros. As respostas da API devem ser coerentes com os resultados das operações, inclusive quando houver dados inválidos, registros inexistentes ou falhas de comunicação com o banco de dados.

 
 
Requisitos da solução
Requisitos funcionais

A API deverá permitir:

O cadastro de produtos.

A consulta de todos os produtos cadastrados.

A consulta de um produto específico.

A atualização completa ou parcial das informações de um produto.

A exclusão de produtos.

A consulta de produtos pertencentes a uma categoria específica.

A consulta de produtos de acordo com a situação do estoque.

Requisitos técnicos e de qualidade

O projeto deverá:

Ser desenvolvido utilizando Node.js e Express.

Disponibilizar as funcionalidades por meio de uma API REST.

Utilizar a arquitetura MVC para organizar os componentes da aplicação.

Utilizar MySQL para o armazenamento persistente das informações e mysql2 para a comunicação com o banco de dados.

Utilizar dotenv para carregar as configurações necessárias a partir de variáveis de ambiente.

Implementar validações dos dados recebidos conforme as regras de negócio.

Utilizar consultas parametrizadas para reduzir riscos associados à execução de comandos SQL inseguros.

Preservar a integridade dos dados por meio de uma modelagem e de restrições adequadas no banco de dados.

Tratar erros de validação, registros inexistentes e falhas nas operações com o banco de dados, retornando códigos HTTP e mensagens coerentes.

Evitar a exposição de credenciais e detalhes internos da aplicação nas respostas de erro.

Não é necessário desenvolver uma interface gráfica ou um frontend. O escopo da avaliação contempla a modelagem e a implementação do banco de dados e o desenvolvimento da API.

 
 
5. Entregas
1. Diagrama Entidade-Relacionamento (DER)

Diagrama que represente a estrutura de dados necessária para atender ao problema, contemplando as entidades, os atributos, as chaves, os relacionamentos e as cardinalidades correspondentes.

2. Script SQL

Arquivo contendo os comandos necessários para criar o banco de dados e suas tabelas, incluindo as chaves e restrições necessárias para manter a integridade das informações. O script também deverá inserir dados iniciais nas categorias, permitindo a realização de testes na API.

3. Repositório do projeto da API

Repositório contendo o código-fonte da aplicação, organizado conforme a arquitetura MVC e com as funcionalidades solicitadas integradas ao banco de dados MySQL.

O repositório deverá incluir:

Os arquivos necessários para executar a aplicação.

Um arquivo .env.example com os nomes das variáveis necessárias, sem credenciais reais.

Um arquivo README com as instruções para configurar o ambiente, preparar o banco de dados e iniciar a API.

As orientações necessárias para testar as funcionalidades implementadas (README.md).