import { Course } from '../types';

export const coursesData: Course[] = [
  {
    id: 'servicos-administrativos',
    name: 'Aprendizagem Profissional de Qualificação em Serviços Administrativos',
    code: '1.1.2.216',
    cbo: '4110-10 Assistente Administrativo',
    axis: 'Gestão e Negócios',
    segment: 'Gestão',
    workloadTheoretical: 400,
    workloadPractical: 600,
    workloadTotal: 1000,
    description: 'Prepara adolescentes e jovens para desempenhar atividades relacionadas à ocupação de Assistente Administrativo, promovendo competências de gestão, apoio administrativo e rotinas de escritório conforme o Modelo Pedagógico Senac e BNCC.',
    ucs: [
      {
        id: 'uc1-admin',
        name: 'UC1: Desenvolvimento Socioemocional',
        workload: 60,
        indicators: [
          'Expressa-se de forma oral e corporal de acordo com o contexto, a intencionalidade e o público.',
          'Trabalha em equipe, considerando os objetivos em comum, o perfil do grupo e as responsabilidades dos envolvidos.',
          'Propõe soluções inovadoras, de acordo com o desafio e o contexto profissional.',
          'Questiona e argumenta considerando as evidências e o contexto das situações.',
          'Utiliza recursos, produtos e serviços com base nos princípios da sustentabilidade.',
          'Atua no ambiente de trabalho considerando os princípios éticos e a diversidade.'
        ],
        knowledges: [
          'Comunicação: elementos, barreiras ou ruídos, técnicas de expressão oral e corporal, uso do tom de voz e expressão facial, escuta ativa.',
          'Colaboração: modelo 3C (comunicação, cooperação, coordenação), trabalho coletivo vs colaborativo, negociação de conflitos, empatia.',
          'Criatividade: etapas da resolução criativa (imersão, análise, ideação), brainstorming, mapa mental, atitude empreendedora.',
          'Pensamento Crítico: resolução de problemas, causa e consequência, consistência argumentativa, fake news e verificação de dados.',
          'Atitude Sustentável: dimensões da sustentabilidade, consumo consciente, ética corporativa, cidadania digital e conduta ética.'
        ],
        skills: [
          'Comunicar-se em público de maneira assertiva.',
          'Identificar aspectos orais e não verbais expressos pelo interlocutor.',
          'Identificar os aspectos do próprio trabalho que interferem na equipe.',
          'Negociar em situações de conflitos no ambiente de trabalho.',
          'Pesquisar dados e informações.',
          'Analisar problemas sob diferentes perspectivas.'
        ],
        attitudes: [
          'Flexibilidade no uso da linguagem.',
          'Proatividade no desenvolvimento do trabalho em equipe.',
          'Postura investigativa.',
          'Empatia no trato com as pessoas.',
          'Zelo pela ética, pela probidade e pela integridade.'
        ]
      },
      {
        id: 'uc2-admin',
        name: 'UC2: Bem-estar Pessoal e Social dos Jovens',
        workload: 20,
        indicators: [
          'Adota atitudes que promovem sua saúde, conforme seu contexto de vida.'
        ],
        knowledges: [
          'Autoconhecimento: reconhecimento das características pessoais, suas influências nas ações futuras.',
          'Foco, determinação e automotivação: conceito e aplicabilidade.',
          'Saúde mental: conceito de saúde mental, sinais de sofrimento psíquico, prevenção e apoio social.',
          'Estatuto da Criança e do Adolescente (ECA): aspectos da proteção integral.'
        ],
        skills: [
          'Avaliar a própria conduta em diferentes contextos.',
          'Pesquisar dados e informações sobre saúde e qualidade de vida.',
          'Identificar sinais de sofrimento psíquico.'
        ],
        attitudes: [
          'Respeito nas relações interpessoais e diversidade humana.',
          'Atitude propositiva nos aspectos inerentes à saúde.',
          'Zelo pelo autocuidado.'
        ]
      },
      {
        id: 'uc3-admin',
        name: 'UC3: Recursos Tecnológicos no Contexto Social e do Trabalho',
        workload: 24,
        indicators: [
          'Utiliza recursos tecnológicos de acordo com as necessidades sociais e do trabalho.'
        ],
        knowledges: [
          'Sistema operacional: área de trabalho, barra de tarefas, arquivos, pastas, atalhos de teclado.',
          'Internet: navegadores, pesquisa avançada, segurança, armazenamento em nuvem, LGPD e comportamento virtual.',
          'E-mail: criação, formatação, assinatura, gerenciamento de contatos, filtros e sincronização com agenda.',
          'Aplicativos de escritório: editores de texto, planilhas eletrônicas e slides de apresentação.'
        ],
        skills: [
          'Pesquisar e organizar dados, documentos e informações.',
          'Gerenciar tempo e atividades de trabalho utilizando ferramentas digitais.',
          'Comunicar-se de maneira assertiva pelas plataformas digitais.'
        ],
        attitudes: [
          'Responsabilidade no conteúdo de comunicação.',
          'Iniciativa na proposição de soluções tecnológicas.',
          'Colaboração no desenvolvimento do trabalho em equipe.'
        ]
      },
      {
        id: 'uc7-admin',
        name: 'UC7: Organizar e Executar Atividades de Apoio aos Processos da Organização',
        workload: 84,
        indicators: [
          'Recebe e dá encaminhamento às solicitações recebidas dos diversos setores da organização, observando sua estrutura e processos.',
          'Atende clientes internos e externos colaborando para o fluxo, sigilo e correção das informações.',
          'Organiza e providencia recursos para o funcionamento administrativo, conforme demandas e processos institucionais.'
        ],
        knowledges: [
          'Evolução histórica da Administração: científica, clássica, humanista, neoclássica e modelo japonês.',
          'Cultura organizacional: conceitos e elementos.',
          'Funções da administração: planejamento, organização, direção e controle.',
          'Estrutura organizacional: organogramas, níveis e áreas funcionais.',
          'Funções organizacionais: gestão de pessoas, logística, finanças, marketing, vendas e jurídico.',
          'Atendimento ao cliente: técnicas de abordagem, resolução de conflitos, relacionamento interpessoal e negociação.'
        ],
        skills: [
          'Organizar o ambiente de trabalho.',
          'Comunicar-se com clareza e assertividade oralmente e por escrito.',
          'Gerenciar tempo e atividades de trabalho administrativo.',
          'Resolver conflitos inerentes ao processo de trabalho de recepção e apoio.'
        ],
        attitudes: [
          'Apresentação pessoal e postura profissional adequadas.',
          'Colaboração com colegas e equipes de trabalho.',
          'Responsabilidade no cumprimento de prazos estabelecidos.',
          'Utilização consciente de recursos e insumos.'
        ]
      },
      {
        id: 'uc8-admin',
        name: 'UC8: Elaborar, Organizar e Controlar Documentos da Organização',
        workload: 60,
        indicators: [
          'Elabora e atualiza documentos administrativos e comerciais operando recursos de TIC, conforme normas e procedimentos.',
          'Organiza documentos físicos e digitais de acordo com as técnicas de arquivamento e protocolo, mantendo integridade e sigilo.',
          'Controla o fluxo de documentos físicos e digitais, com eficiência, de acordo com as técnicas de arquivamento.'
        ],
        knowledges: [
          'Técnicas de redação empresarial e oficial: coesão, coerência, pronomes de tratamento, regras gramaticais.',
          'Modelos de documentos: ata, carta, circular, memorando, e-mail, ofício, relatório, contrato, edital.',
          'Métodos e técnicas de arquivo e protocolo: classificação, recebimento, distribuição, tramitação e temporalidade.'
        ],
        skills: [
          'Ler e interpretar textos corporativos e legais.',
          'Operar editores de texto e planilhas para criação de formulários e relatórios.',
          'Manter a organização de arquivos garantindo a integridade dos dados.'
        ],
        attitudes: [
          'Zelo na apresentação pessoal e rigor nos prazos.',
          'Proatividade na movimentação de documentos e sigilo no tratamento de informações.'
        ]
      },
      {
        id: 'uc10-admin',
        name: 'UC10: Compras e Estoque',
        workload: 32,
        indicators: [
          'Compra e recebe produtos e mercadorias, conforme requisitos e solicitações recebidas e legislação aplicável.'
        ],
        knowledges: [
          'Planejamento de compras: previsão de demanda, cotação, etapas de compra e modalidades de compras.',
          'Recebimento e conferência de mercadorias: processos, notas fiscais, romaneios.',
          'Gestão de estoque: classificação, custos, sistema Just in Time, níveis de estoque (mínimo, máximo, médio) e curva ABC.'
        ],
        skills: [
          'Organizar fluxos de compras e inventário.',
          'Utilizar planilhas eletrônicas para controle quantitativo de estoque.',
          'Analisar propostas e cotações de fornecedores.'
        ],
        attitudes: [
          'Sigilo no tratamento de dados comerciais.',
          'Comprometimento com os acordos estabelecidos com fornecedores.'
        ]
      },
      {
        id: 'uc11-admin',
        name: 'UC11: Administração de Contas a Pagar, Contas a Receber e Tesouraria',
        workload: 28,
        indicators: [
          'Seleciona estratégias de controle das contas a pagar e a receber, conforme ciclo operacional e operação comercial.'
        ],
        knowledges: [
          'Procedimentos de contas a pagar: fluxo de pagamentos, boletos, conciliação bancária.',
          'Procedimentos de contas a receber: fluxo de recebimentos, controle de inadimplência e cobrança.',
          'Processos de tesouraria: conciliação de caixa e bancos, fluxo de caixa, ponto de equilíbrio, capital de giro.'
        ],
        skills: [
          "Organizar documentos de contas a pagar e receber.",
          "Calcular juros simples e compostos.",
          "Acompanhar a carteira de recebíveis e inadimplentes."
        ],
        attitudes: [
          'Responsabilidade e comprometimento com acordos e prazos.',
          'Sigilo absoluto no tratamento de dados financeiros.'
        ],
        product: 'Estudo com definição de estratégias de controle de contas a pagar e receber da operação mercantil.'
      }
    ]
  },
  {
    id: 'servicos-supermercados',
    name: 'Aprendizagem Profissional de Qualificação em Serviços de Supermercados',
    code: '2.1.1.56',
    cbo: '5211-25 Repositor de Mercadorias',
    axis: 'Gestão e Negócios',
    segment: 'Comércio',
    workloadTheoretical: 400,
    workloadPractical: 600,
    workloadTotal: 1000,
    description: 'Capacita jovens no abastecimento, precificação, controle de perdas e atendimento qualificado a clientes no setor supermercadista, abordando aspectos logísticos e comerciais de varejo alimentar.',
    ucs: [
      {
        id: 'uc7-super',
        name: 'UC7: Orientar Clientes em Relação às Mercadorias, Produtos e Serviços',
        workload: 48,
        indicators: [
          'Presta informações sobre mercadorias, produtos e serviços no ponto de venda, auxiliando o cliente na decisão de compra.',
          'Conduz os clientes ao Serviço de Atendimento ao Cliente (SAC) ou setor responsável para resolução de demandas complexas.'
        ],
        knowledges: [
          'Atendimento qualificado: comunicação assertiva, escuta ativa, cortesia e empatia.',
          'Comportamento do consumidor no varejo supermercadista.',
          'Direitos básicos do consumidor (CDC - Código de Defesa do Consumidor).',
          'Postura e etiqueta profissional.'
        ],
        skills: [
          'Comunicar-se de forma clara e cortês com públicos diversos.',
          'Identificar necessidades específicas de atendimento.',
          'Resolver pequenos conflitos e reclamações no ponto de venda.'
        ],
        attitudes: [
          'Zelo no atendimento e cordialidade.',
          'Respeito à diversidade e acessibilidade de clientes.'
        ]
      },
      {
        id: 'uc8-super',
        name: 'UC8: Abastecer o Ponto de Venda com Mercadorias e Produtos',
        workload: 96,
        indicators: [
          'Controla a necessidade de abastecimento e reposição das prateleiras e gôndolas do ponto de venda.',
          'Requisita e retira mercadorias do estoque de forma organizada.',
          'Etiqueta e precifica produtos observando as normas de exposição e código de defesa do consumidor.',
          'Organiza o local e expõe mercadorias seguindo o layout e as estratégias de marketing/merchandising da empresa.',
          'Auxilia no controle de perdas, quebras, validade (método PVPS) e integridade das embalagens.'
        ],
        knowledges: [
          'Organização e abastecimento de PDV: técnicas de gôndola, planograma, reposição, layout.',
          'Conservação e manipulação de alimentos: boas práticas de higiene (ANVISA, NRs).',
          'Controle de validade: PVPS (Primeiro que Vence, Primeiro que Sai).',
          'Prevenção de perdas e quebras: conceitos, identificação de riscos, inventário rotativo.'
        ],
        skills: [
          'Organizar o local de reposição de mercadorias mantendo a limpeza.',
          'Operar equipamentos de etiquetagem e leitura de código de barras.',
          'Verificar as condições de consumo de produtos perecíveis.'
        ],
        attitudes: [
          'Zelo pela qualidade, higiene e segurança dos produtos.',
          'Proatividade na reposição e cuidado com a conservação.'
        ]
      },
      {
        id: 'uc10-super',
        name: 'UC10: A Arte de se Comunicar e de Vender Mais',
        workload: 30,
        indicators: [
          'Seleciona e utiliza técnicas de comunicação e expressão corporal no atendimento conforme o perfil do cliente, estabelecendo relações éticas.'
        ],
        knowledges: [
          'Tipos de comunicação: verbal, escrita, visual, corporal e gestual.',
          'Postura e oratória básica aplicadas às vendas de varejo.',
          'Etapas e técnicas de vendas: abordagem, sondagem, fechamento.',
          'Técnicas de Rapport (empatia rápida e sintonia) com o cliente.'
        ],
        skills: [
          'Argumentar de forma persuasiva sem ser inconveniente.',
          'Identificar sinais de compra e objeções de clientes.',
          'Utilizar linguagem corporal adequada para transmitir segurança.'
        ],
        attitudes: [
          'Empatia, escuta ativa e dedicação ao cliente.',
          'Zelo pela imagem profissional e imagem institucional da empresa.'
        ],
        product: 'Storytelling em comunicação para vendas.'
      },
      {
        id: 'uc11-super',
        name: 'UC11: Logística nas Operações de Varejo',
        workload: 15,
        indicators: [
          'Identifica estratégias operacionais para o processo logístico em empresas varejistas, conforme as demandas de mercado.'
        ],
        knowledges: [
          'Cadeia de suprimentos (Supply Chain Management) simplificada.',
          'Rastreamento e movimentação física de cargas.',
          'Logística reversa e trocas no varejo alimentar.',
          'Sistemas e softwares de gerenciamento de inventário.'
        ],
        skills: [
          'Operar dados básicos de planilhas de controle de entrega.',
          'Analisar fluxogramas de movimentação de produtos entre estoque e PDV.'
        ],
        attitudes: [
          'Comprometimento com a precisão dos registros.',
          'Responsabilidade com a otimização de tempo e recursos.'
        ],
        product: 'Plano operacional de logística de um comércio varejista.'
      }
    ]
  },
  {
    id: 'servicos-vendas',
    name: 'Aprendizagem Profissional de Qualificação em Serviços de Vendas',
    code: '2.1.1.53',
    cbo: '5211-10 Vendedor',
    axis: 'Gestão e Negócios',
    segment: 'Comércio',
    workloadTheoretical: 400,
    workloadPractical: 600,
    workloadTotal: 1000,
    description: 'Desenvolve no estudante competências avançadas de vendas físicas e digitais, negociação estratégica, inteligência emocional corporativa, pós-venda, fidelização de clientes e design thinking aplicado a transações comerciais.',
    ucs: [
      {
        id: 'uc7-vendas',
        name: 'UC7: Organizar Ações e Planos de Venda',
        workload: 48,
        indicators: [
          'Pesquisa o mercado conforme o público-alvo e a estratégia comercial da empresa.',
          'Identifica as necessidades dos clientes integrando-as com as estratégias de marketing.',
          'Realiza levantamento e análise de informações técnicas sobre produtos e serviços.',
          'Seleciona os recursos necessários às ações de vendas de acordo com o planejado.'
        ],
        knowledges: [
          'Estrutura de mercado e público-alvo: segmentação, roteiro de vendas.',
          'Pesquisa de mercado: ferramentas de coleta de dados, questionários, gráficos.',
          'Funil de Vendas: prospecção, qualificação, abordagem, proposta, negociação e fechamento.',
          'Merchandising e atmosfera de compras no ponto de venda.'
        ],
        skills: [
          'Elaborar roteiros de prospecção e funil de vendas.',
          'Operar softwares de planilhas e editores para compilação de pesquisas de mercado.',
          'Organizar cronogramas e metas de vendas.'
        ],
        attitudes: [
          'Postura investigativa e atenção a tendências mercadológicas.',
          'Sigilo no tratamento de dados de mercado e concorrentes.'
        ]
      },
      {
        id: 'uc8-vendas',
        name: 'UC8: Realizar a Venda',
        workload: 60,
        indicators: [
          'Recepciona o cliente utilizando linguagem verbal e não verbal adequadas ao seu perfil.',
          'Apresenta e divulga produtos e serviços utilizando técnicas de merchandising e comunicação.',
          'Realiza o acompanhamento da intenção de compra, orientando na escolha da melhor solução.',
          'Utiliza técnicas de vendas e fechamento de acordos respeitando as determinações da empresa.'
        ],
        knowledges: [
          'Técnicas de atendimento e recepção: abordagem, argumentação de vendas.',
          'Comunicação interpessoal nas transações comerciais.',
          'Tipos de fechamento de venda e técnicas de contorno de objeções.',
          'Matemática comercial básica: regra de três, cálculo de descontos, parcelamento, juros simples/compostos.'
        ],
        skills: [
          'Sondar necessidades por meio de perguntas abertas.',
          'Mediar conflitos e hesitações no momento da decisão de compra.',
          'Efetuar cálculos comerciais com rapidez e precisão.'
        ],
        attitudes: [
          'Respeito à diversidade de clientes e empatia no atendimento.',
          'Zelo na apresentação e postura profissional ética.'
        ]
      },
      {
        id: 'uc9-vendas',
        name: 'UC9: Realizar Ações de Pós-Venda',
        workload: 36,
        indicators: [
          'Realiza o atendimento pós-venda coletando sugestões, reclamações e encaminhando trocas/devoluções.',
          'Promove ações de fidelização de clientes de acordo com pesquisas de satisfação e perfis de consumo.',
          'Participa da realização de inventários físicos separando mercadorias e produtos.'
        ],
        knowledges: [
          'Pós-venda: conceitos, canais de relacionamento, SAC.',
          'Fidelização: programas de pontuação, cashback, marketing de relacionamento.',
          'Código de Defesa do Consumidor (CDC) aplicado a trocas, devoluções e garantias.',
          'Sistemas de CRM (Customer Relationship Management) para registro de histórico.'
        ],
        skills: [
          'Tratar reclamações com inteligência emocional e resolução de problemas.',
          'Aplicar pesquisas de satisfação e tabular dados de feedback de pós-venda.',
          'Negociar trocas e devoluções em conformidade com as políticas da empresa e o CDC.'
        ],
        attitudes: [
          'Empatia, paciência e assertividade diante de clientes insatisfeitos.',
          'Zelo pela reputação da marca e compromisso com o cliente.'
        ]
      },
      {
        id: 'uc11-vendas',
        name: 'UC11: Inteligência Emocional e Vendas',
        workload: 15,
        indicators: [
          'Utiliza técnicas de controle emocional durante o atendimento, estabelecendo relações empáticas com o cliente.'
        ],
        knowledges: [
          'Inteligência emocional: conceito, autoconsciência, autorregulação, motivação, empatia e habilidades sociais.',
          'Emoções no processo de vendas: como lidar com a rejeição, ansiedade de metas e pressão por resultados.',
          'Técnicas de controle emocional em situações de estresse com o cliente.'
        ],
        skills: [
          'Demonstrar autocontrole sob pressão de metas ou clientes hostis.',
          'Desenvolver empatia ativa identificando o estado emocional do cliente.'
        ],
        attitudes: [
          'Resiliência, inteligência social e equilíbrio emocional no ambiente corporativo.'
        ],
        product: 'Plano de desenvolvimento pessoal com foco em inteligência emocional aplicada a vendas.'
      },
      {
        id: 'uc14-vendas',
        name: 'UC14: Design Thinking Aplicado a Vendas',
        workload: 15,
        indicators: [
          'Adota a metodologia design thinking para mapeamento, ideação e solução de problemas de vendas, de acordo com o público-alvo.'
        ],
        knowledges: [
          'Design Thinking de serviços: conceito, fases (imersão, análise, ideação, prototipação, teste).',
          'Mapeamento da jornada do cliente (Customer Journey Map).',
          'Definição de Personas e Mapa de Empatia para inovação de canais.'
        ],
        skills: [
          'Mapear a jornada de compra identificando pontos de atrito.',
          'Facilitar sessões criativas de ideação para melhorias de atendimento.',
          'Prototipar fluxos de serviços digitais ou físicos de vendas.'
        ],
        attitudes: [
          'Atitude propositiva de experimentação, tolerância ao erro e colaboração criativa.'
        ],
        product: 'Plano de ação para o processo de vendas por meio do Design Thinking.'
      }
    ]
  }
];
