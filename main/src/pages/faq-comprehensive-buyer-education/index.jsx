import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import FAQItem from './components/FAQItem';
import ConsultationSection from './components/ConsultationSection';
import Icon from '../../components/AppIcon';

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');

  const categories = [
    'Todos',
    'Financiamento',
    'Processo Legal',
    'Bairros',
    'Investimento',
    'Serviços Casa Conecta'
  ];

  const faqData = [
    // Financiamento
    {
      id: 1,
      category: 'Financiamento',
      question: 'Quais são as opções de financiamento disponíveis para imóveis premium em Goiânia?',
      answer: `Oferecemos acesso às melhores condições de financiamento do mercado através de parcerias com bancos renomados:

• **Financiamento Habitacional (SFH)**: Para imóveis até R$ 1,5 milhão, com juros a partir de 8,5% ao ano + TR
• **Financiamento Imobiliário (SFI)**: Para imóveis acima de R$ 1,5 milhão, condições especiais negociadas
• **Consórcio Imobiliário**: Alternativa sem juros, com cartas contempladas disponíveis
• **Financiamento Direto com Construtora**: Condições especiais em lançamentos selecionados

Nossa equipe possui relacionamento direto com gerentes especializados em crédito imobiliário, garantindo análise prioritária e melhores condições para nossos clientes.`,
      hasWhatsAppCTA: true,
      hasConsultationCTA: true
    },
    {
      id: 2,
      category: 'Financiamento',
      question: 'Qual valor de entrada é necessário para financiar um imóvel de R$ 800.000?',
      answer: `Para um imóvel de R$ 800.000, as opções de entrada variam conforme o tipo de financiamento:

• **Entrada Mínima**: 20% = R$ 160.000 (financiamento de até 80%)
• **Entrada Recomendada**: 30% = R$ 240.000 (melhores condições de juros)
• **Entrada Ideal**: 40% = R$ 320.000 (juros reduzidos e aprovação facilitada)

**Simulação para renda familiar de R$ 25.000:**
- Financiamento de R$ 640.000 em 300 meses
- Prestação aproximada: R$ 6.200/mês
- Comprometimento de renda: 24,8% (dentro do limite bancário)

Nossos consultores podem simular diferentes cenários e encontrar a melhor estrutura para seu perfil financeiro.`,
      hasWhatsAppCTA: true
    },
    {
      id: 3,
      category: 'Financiamento',
      question: 'Como comprovar renda para financiamento quando tenho renda de R$ 20.000 mensais?',
      answer: `Para comprovar renda de R$ 20.000 mensais, os bancos aceitam diferentes documentações:

**Para CLT:**
• Últimos 3 contracheques
• Declaração de Imposto de Renda (últimos 2 anos)
• Extrato bancário dos últimos 3 meses
• Carteira de trabalho

**Para Empresários/Autônomos:**
• Declaração de Imposto de Renda (últimos 2 anos)
• Pró-labore ou retirada mensal comprovada
• Extratos bancários (últimos 6 meses)
• Balanço patrimonial da empresa
• DAS ou carnê-leão em dia

**Dica Importante:** Renda familiar pode ser somada (cônjuge/companheiro), aumentando o poder de compra e facilitando a aprovação.

Nossa equipe orienta sobre a melhor forma de organizar sua documentação para maximizar suas chances de aprovação.`,
      hasConsultationCTA: true
    },

    // Processo Legal
    {
      id: 4,
      category: 'Processo Legal',
      question: 'Quais documentos são obrigatórios na compra de um imóvel em Goiás?',
      answer: `A documentação completa garante segurança jurídica na sua compra. Documentos essenciais:

**Do Imóvel:**
• Matrícula atualizada do Cartório de Registro de Imóveis
• IPTU dos últimos 5 anos (quitado)
• Certidão negativa de débitos municipais
• Habite-se ou Auto de Conclusão
• Aprovação da Prefeitura de Goiânia
• Memorial descritivo e plantas aprovadas

**Do Vendedor:**
• CPF e RG (ou CNH) atualizados
• Certidão de casamento/união estável (se aplicável)
• Declaração de Imposto de Renda
• Certidões negativas (federal, estadual, municipal)

**Verificações Especiais em Goiás:**
• Consulta ao CAR (Cadastro Ambiental Rural) se aplicável
• Verificação de áreas de preservação
• Consulta ao INCRA para imóveis rurais

Nossa equipe jurídica realiza due diligence completa, garantindo que toda documentação esteja em ordem antes da assinatura.`,
      hasWhatsAppCTA: true
    },
    {
      id: 5,
      category: 'Processo Legal',
      question: 'Como funciona o processo de escrituração e registro em Goiânia?',
      answer: `O processo de escrituração em Goiânia segue etapas específicas que acompanhamos integralmente:

**Etapa 1 - Escritura Pública (Cartório de Notas):**
• Agendamento em cartório de nossa rede credenciada
• Presença de comprador, vendedor e 2 testemunhas
• Pagamento de taxas cartoriais (aproximadamente 0,3% do valor)
• Emissão da escritura pública

**Etapa 2 - Registro (Cartório de Registro de Imóveis):**
• Protocolo da escritura no cartório competente
• Pagamento do ITBI (2% do valor venal em Goiânia)
• Taxa de registro (aproximadamente 0,5% do valor)
• Prazo: 15 a 30 dias úteis

**Etapa 3 - Atualizações:**
• Atualização no CPF da Receita Federal
• Transferência do IPTU na Prefeitura
• Contratação de seguro residencial

**Custo Total Estimado:** 3% a 4% do valor do imóvel
**Prazo Total:** 30 a 45 dias

Acompanhamos todo o processo, garantindo agilidade e segurança jurídica.`,
      hasConsultationCTA: true
    },

    // Bairros
    {
      id: 6,
      category: 'Bairros',
      question: 'Quais são os melhores bairros premium próximos ao Flamboyant Shopping?',
      answer: `Os bairros premium próximos ao Flamboyant oferecem excelente qualidade de vida e valorização:

**Jardim Goiás (1-3km do Flamboyant):**
• Bairro mais valorizado de Goiânia
• Apartamentos: R$ 8.000 a R$ 15.000/m²
• Casas: R$ 1,2 milhão a R$ 4 milhões
• Infraestrutura completa, segurança 24h

**Setor Bueno (2-4km do Flamboyant):**
• Excelente custo-benefício
• Apartamentos: R$ 6.000 a R$ 10.000/m²
• Próximo a hospitais e escolas de qualidade
• Boa oferta de serviços e comércio

**Alto da Glória (3-5km do Flamboyant):**
• Bairro em ascensão, ótimo para investimento
• Apartamentos: R$ 5.500 a R$ 8.500/m²
• Novos empreendimentos de alto padrão
• Fácil acesso ao centro e região sul

**Setor Oeste (4-6km do Flamboyant):**
• Tradicional e consolidado
• Casas amplas com terrenos grandes
• Valores: R$ 800.000 a R$ 2,5 milhões
• Ambiente familiar e tranquilo

Cada bairro tem características únicas. Podemos agendar um tour personalizado para conhecer as opções que mais se adequam ao seu perfil.`,
      hasWhatsAppCTA: true,
      hasConsultationCTA: true
    },
    {
      id: 7,
      category: 'Bairros',
      question: 'Como está o desenvolvimento urbano e infraestrutura dos bairros premium?',
      answer: `O desenvolvimento urbano de Goiânia tem foco especial nos bairros premium, com investimentos significativos:

**Projetos em Andamento (2024-2026):**
• Extensão do BRT até região do Flamboyant
• Novo complexo hospitalar no Jardim Goiás
• Ampliação do Parque Flamboyant
• Ciclovia conectando bairros nobres

**Infraestrutura Consolidada:**
• Internet fibra ótica em 100% dos bairros premium
• Coleta seletiva e limpeza urbana diária
• Iluminação LED em vias principais
• Segurança pública reforçada

**Educação de Qualidade:**
• Colégio Militar próximo ao Setor Bueno
• Universidades particulares renomadas
• Escolas internacionais no Jardim Goiás
• Centros de idiomas especializados

**Saúde e Bem-estar:**
• Hospital Sírio-Libanês (em construção)
• Clínicas especializadas de alto padrão
• Academias e centros esportivos
• Parques e áreas verdes preservadas

**Valorização Projetada:** 8% a 12% ao ano nos próximos 5 anos, baseada nos investimentos em infraestrutura e demanda crescente.`,
      hasConsultationCTA: true
    },

    // Investimento
    {
      id: 8,
      category: 'Investimento',
      question: 'Qual o potencial de valorização dos imóveis premium em Goiânia?',
      answer: `Goiânia apresenta um dos melhores potenciais de valorização imobiliária do Centro-Oeste:

**Histórico de Valorização (2019-2024):**
• Jardim Goiás: +45% no período
• Setor Bueno: +38% no período
• Alto da Glória: +52% no período
• Média geral premium: +42% no período

**Fatores de Valorização:**
• Crescimento populacional de 2,1% ao ano
• PIB municipal crescendo acima da média nacional
• Investimentos em infraestrutura urbana
• Chegada de grandes empresas (agronegócio e tecnologia)
• Proximidade com Brasília (200km)

**Projeção 2024-2029:**
• Valorização esperada: 8% a 12% ao ano
• Bairros com maior potencial: Alto da Glória e Setor Sul
• Segmentos em alta: apartamentos 3-4 quartos, casas em condomínios

**Comparativo Regional:**
• Goiânia: +8% a +12% ao ano (projeção)
• Brasília: +6% a +9% ao ano
• Campo Grande: +5% a +8% ao ano
• Cuiabá: +7% a +10% ao ano

**Dica de Investimento:** Imóveis próximos ao futuro BRT e novos centros comerciais tendem a ter valorização acima da média.`,
      hasWhatsAppCTA: true
    },
    {
      id: 9,
      category: 'Investimento',
      question: 'Vale a pena investir em imóveis para locação em Goiânia?',
      answer: `O mercado de locação premium em Goiânia oferece excelente rentabilidade e baixa vacância:

**Rentabilidade por Bairro:**
• Jardim Goiás: 0,4% a 0,6% ao mês (apartamentos)
• Setor Bueno: 0,5% a 0,7% ao mês (ótimo custo-benefício)
• Alto da Glória: 0,6% a 0,8% ao mês (alta demanda)
• Setor Oeste: 0,4% a 0,6% ao mês (casas familiares)

**Perfil dos Locatários:**
• Executivos de multinacionais
• Médicos e profissionais liberais
• Famílias em transição de compra
• Estudantes de pós-graduação (apartamentos menores)

**Vantagens do Mercado Local:**
• Baixa vacância: menos de 5% nos bairros premium
• Contratos longos: média de 2-3 anos
• Inquilinos com alta renda e estabilidade
• Valorização do imóvel + renda mensal

**Custos Operacionais:**
• Administração predial: R$ 300 a R$ 800/mês
• IPTU: 0,8% a 1,2% do valor venal/ano
• Seguro: 0,1% a 0,2% do valor/ano
• Manutenção: 1% a 2% do valor/ano

**ROI Médio:** 8% a 12% ao ano (aluguel + valorização)

Podemos apresentar imóveis específicos com análise de rentabilidade personalizada para seu perfil de investimento.`,
      hasConsultationCTA: true
    },

    // Serviços Casa Conecta
    {
      id: 10,
      category: 'Serviços Casa Conecta',
      question: 'Como funciona o processo de consultoria personalizada da Casa Conecta?',
      answer: `Nossa consultoria personalizada é um processo estruturado em 5 etapas para garantir que você encontre o imóvel ideal:

**Etapa 1 - Diagnóstico Inicial (30 min):**
• Entrevista sobre necessidades e desejos
• Análise do perfil financeiro
• Definição de critérios de busca
• Apresentação do nosso método exclusivo

**Etapa 2 - Curadoria Personalizada:**
• Seleção de 5-8 imóveis que atendem seus critérios
• Análise de documentação prévia
• Verificação de histórico de valorização
• Relatório detalhado de cada opção

**Etapa 3 - Tours Direcionados:**
• Agendamento coordenado de visitas
• Acompanhamento de consultor especializado
• Análise técnica durante as visitas
• Orientação sobre pontos de atenção

**Etapa 4 - Negociação Estratégica:**
• Análise de mercado para precificação
• Estratégia de negociação personalizada
• Intermediação com proprietários/construtoras
• Garantia das melhores condições

**Etapa 5 - Acompanhamento Completo:**
• Suporte jurídico e documental
• Coordenação do processo de financiamento
• Acompanhamento até a entrega das chaves
• Suporte pós-venda por 12 meses

**Diferenciais Exclusivos:**
• Acesso a imóveis off-market
• Relacionamento direto com construtoras
• Equipe jurídica especializada
• Garantia de satisfação

Todo o processo é conduzido via WhatsApp para máxima agilidade e transparência.`,
      hasWhatsAppCTA: true
    },
    {
      id: 11,
      category: 'Serviços Casa Conecta',
      question: 'Qual é o padrão de atendimento via WhatsApp da Casa Conecta?',
      answer: `Nosso atendimento via WhatsApp segue padrões de excelência para garantir a melhor experiência:

**Tempo de Resposta Garantido:**
• Horário comercial: Resposta em até 15 minutos
• Fora do horário: Resposta em até 2 horas
• Finais de semana: Plantão para urgências
• Feriados: Atendimento reduzido com retorno em 24h

**Estrutura de Atendimento:**
• Consultor dedicado para cada cliente
• Backup de atendimento para ausências
• Supervisão de qualidade em todas as conversas
• Registro completo do histórico de atendimento

**Recursos Disponíveis:**
• Envio de fotos e vídeos em alta qualidade
• Documentos e contratos via WhatsApp
• Agendamento de visitas em tempo real
• Localização e mapas interativos
• Chamadas de voz e vídeo quando necessário

**Horários de Atendimento:**
• Segunda a Sexta: 7h às 19h
• Sábado: 8h às 16h
• Domingo: Plantão para urgências (10h às 14h)
• Feriados: Atendimento reduzido

**Garantias de Qualidade:**
• Todas as conversas são monitoradas
• Pesquisa de satisfação após cada atendimento
• Treinamento contínuo da equipe
• Protocolo de escalação para situações complexas

**Privacidade e Segurança:**
• Conversas criptografadas end-to-end
• Dados protegidos conforme LGPD
• Não compartilhamento de informações pessoais
• Backup seguro de todas as conversas

Nosso objetivo é que você se sinta acompanhado e seguro durante todo o processo de compra do seu imóvel.`,
      hasWhatsAppCTA: true
    },
    {
      id: 12,
      category: 'Serviços Casa Conecta',
      question: 'A Casa Conecta oferece suporte pós-venda? O que inclui?',
      answer: `Sim! Nosso suporte pós-venda é um diferencial que acompanha você por 12 meses após a compra:

**Suporte Imediato (Primeiros 30 dias):**
• Acompanhamento da mudança e adaptação
• Resolução de pendências documentais
• Orientação sobre serviços essenciais (água, luz, internet)
• Suporte para questões de condomínio ou vizinhança
• Indicação de profissionais para pequenos reparos

**Suporte Contínuo (12 meses):**
• Monitoramento de valorização do imóvel
• Alertas sobre oportunidades de melhoria
• Rede de profissionais credenciados (arquitetos, decoradores)
• Suporte para questões legais ou documentais
• Orientação sobre seguros e proteções

**Rede de Parceiros Exclusivos:**
• Arquitetos e designers de interiores
• Empresas de mudança e organização
• Profissionais de manutenção e reformas
• Consultores em segurança residencial
• Especialistas em automação residencial

**Programa de Relacionamento:**
• Newsletter mensal com dicas de valorização
• Convites para eventos exclusivos
• Desconto em serviços da rede de parceiros
• Prioridade em futuras consultorias
• Programa de indicação com benefícios

**Garantias Especiais:**
• Mediação gratuita em questões condominiais
• Suporte jurídico básico por 6 meses
• Reavaliação gratuita do imóvel após 1 ano
• Consultoria gratuita para futuras transações

**Canais de Suporte:**
• WhatsApp dedicado pós-venda
• E-mail com resposta em 24h
• Telefone direto com a equipe
• Portal do cliente online

Nosso compromisso não termina na entrega das chaves. Queremos que você tenha uma experiência completa e duradoura com seu novo lar.`,
      hasConsultationCTA: true
    }
  ];

  const filteredFAQs = useMemo(() => {
    let filtered = faqData;
    
    if (activeCategory !== 'Todos') {
      filtered = filtered?.filter(faq => faq?.category === activeCategory);
    }
    
    if (searchTerm) {
      filtered = filtered?.filter(faq => 
        faq?.question?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        faq?.answer?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        faq?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }
    
    return filtered;
  }, [searchTerm, activeCategory]);

  const handleWhatsAppFloat = () => {
    const message = encodeURIComponent('Olá! Estou navegando no FAQ e gostaria de tirar uma dúvida específica.');
    window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-muted">
      <Helmet>
        <title>FAQ - Dúvidas Frequentes | Casa Conecta Imóveis</title>
        <meta name="description" content="Encontre respostas para suas dúvidas sobre financiamento, documentação, bairros premium e processo de compra de imóveis em Goiânia. Consultoria especializada Casa Conecta." />
        <meta name="keywords" content="FAQ imóveis Goiânia, financiamento imobiliário, documentação imóvel, bairros premium Goiânia, Casa Conecta" />
      </Helmet>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-secondary text-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6">
                <Icon name="HelpCircle" size={40} className="text-white" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Central de Dúvidas
              </h1>
              <p className="text-xl lg:text-2xl opacity-90 mb-8">
                Respostas especializadas para suas dúvidas sobre imóveis premium em Goiânia. 
                Nossa expertise a serviço da sua tranquilidade.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm opacity-80">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} />
                  <span>Atualizado em Janeiro 2025</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-white/50 rounded-full"></div>
                <div className="flex items-center space-x-2">
                  <Icon name="MessageCircle" size={16} />
                  <span>Resposta via WhatsApp em até 2h</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <SearchBar 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
              
              <CategoryFilter 
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>
          </div>
        </section>

        {/* FAQ Results */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredFAQs?.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-text-primary">
                    {searchTerm ? `Resultados para "${searchTerm}"` : 
                     activeCategory === 'Todos' ? 'Todas as Dúvidas' : activeCategory}
                  </h2>
                  <span className="text-text-secondary">
                    {filteredFAQs?.length} {filteredFAQs?.length === 1 ? 'resultado' : 'resultados'}
                  </span>
                </div>
                
                <div className="space-y-4">
                  {filteredFAQs?.map((faq) => (
                    <FAQItem
                      key={faq?.id}
                      question={faq?.question}
                      answer={faq?.answer}
                      category={faq?.category}
                      hasWhatsAppCTA={faq?.hasWhatsAppCTA}
                      hasConsultationCTA={faq?.hasConsultationCTA}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
                  <Icon name="Search" size={32} className="text-text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Nenhum resultado encontrado
                </h3>
                <p className="text-text-secondary mb-6">
                  Não encontramos dúvidas relacionadas à sua busca. Tente outros termos ou entre em contato conosco.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setActiveCategory('Todos');
                    }}
                    className="px-6 py-2 border border-border rounded-lg text-text-secondary hover:border-primary hover:text-primary transition-colors"
                  >
                    Ver Todas as Dúvidas
                  </button>
                  <button
                    onClick={handleWhatsAppFloat}
                    className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Icon name="MessageCircle" size={16} />
                    <span>Falar no WhatsApp</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Consultation Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ConsultationSection />
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Icon name="Shield" size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  CRECI Regularizado
                </h3>
                <p className="text-text-secondary">
                  Corretor registrado no CRECI-GO, garantindo segurança jurídica em todas as transações.
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Icon name="Users" size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  +500 Famílias Atendidas
                </h3>
                <p className="text-text-secondary">
                  Experiência comprovada em consultoria imobiliária premium em Goiânia e região metropolitana.
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Icon name="Clock" size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Resposta Rápida
                </h3>
                <p className="text-text-secondary">
                  Atendimento via WhatsApp com resposta garantida em até 2 horas durante horário comercial.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* WhatsApp Float Button */}
      <button
        onClick={handleWhatsAppFloat}
        className="whatsapp-float fixed bottom-6 right-6 w-14 h-14 bg-accent text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50"
        aria-label="Falar no WhatsApp"
      >
        <Icon name="MessageCircle" size={24} />
      </button>
      {/* Footer */}
      <footer className="bg-text-primary text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Home" size={24} color="white" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Casa Conecta</h3>
                <p className="text-sm opacity-80">Imóveis Premium</p>
              </div>
            </div>
            <p className="text-sm opacity-80 mb-4">
              Especialistas em imóveis premium nos melhores bairros de Goiânia
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm opacity-70">
              <span>CRECI-GO: 123456</span>
              <span className="hidden sm:block">•</span>
              <span>© {new Date()?.getFullYear()} Casa Conecta Imóveis</span>
              <span className="hidden sm:block">•</span>
              <span>Todos os direitos reservados</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FAQPage;