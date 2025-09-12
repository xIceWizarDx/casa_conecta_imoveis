import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProcessTransparencySection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const processSteps = [
    {
      step: 1,
      title: "Consulta",
      duration: "30 minutos",
      description: "Entendemos suas necessidades, orçamento e preferências através de conversa detalhada via WhatsApp ou presencial.",
      details: [
        "Análise do perfil familiar e necessidades específicas",
        "Definição de orçamento e condições de pagamento",
        "Mapeamento de bairros e características desejadas",
        "Explicação completa do processo de compra"
      ],
      icon: "MessageCircle",
      deliverables: ["Perfil do cliente", "Orçamento definido", "Cronograma personalizado"]
    },
    {
      step: 2,
      title: "Curadoria",
      duration: "2-3 dias",
      description: "Pré-selecionamos imóveis que se alinham perfeitamente com seu perfil, evitando visitas desnecessárias.",
      details: [
        "Pesquisa no mercado baseada nos critérios definidos",
        "Análise técnica e documental prévia dos imóveis",
        "Verificação de histórico e situação legal",
        "Apresentação de opções pré-qualificadas"
      ],
      icon: "Search",
      deliverables: ["Lista curada de imóveis", "Relatório técnico", "Agendamento de visitas"]
    },
    {
      step: 3,
      title: "Visitas",
      duration: "1-2 semanas",
      description: "Acompanhamos todas as visitas, fornecendo insights sobre o imóvel, bairro e potencial de valorização.",
      details: [
        "Visitas agendadas conforme sua disponibilidade",
        "Análise técnica durante a visita",
        "Informações sobre infraestrutura do bairro",
        "Avaliação de potencial de valorização"
      ],
      icon: "MapPin",
      deliverables: ["Relatório de visitas", "Análise comparativa", "Recomendações técnicas"]
    },
    {
      step: 4,
      title: "Negociação",
      duration: "3-5 dias",
      description: "Negociamos as melhores condições em seu nome, utilizando nossa experiência e conhecimento de mercado.",
      details: [
        "Análise de preço de mercado e estratégia de negociação",
        "Negociação de preço, condições e prazos",
        "Intermediação entre comprador e vendedor",
        "Estruturação da proposta final"
      ],
      icon: "Handshake",
      deliverables: ["Proposta negociada", "Condições definidas", "Contrato preliminar"]
    },
    {
      step: 5,
      title: "Documentação",
      duration: "2-3 semanas",
      description: "Cuidamos de toda documentação necessária, garantindo segurança jurídica completa na transação.",
      details: [
        "Verificação completa da documentação do imóvel",
        "Análise de certidões e regularidade fiscal",
        "Acompanhamento do processo de financiamento",
        "Preparação de contratos e escrituras"
      ],
      icon: "FileText",
      deliverables: ["Documentação completa", "Contratos assinados", "Aprovação financiamento"]
    },
    {
      step: 6,
      title: "Entrega",
      duration: "1 semana",
      description: "Acompanhamos até a entrega das chaves, garantindo que tudo esteja perfeito para sua mudança.",
      details: [
        "Vistoria final do imóvel",
        "Transferência de posse e documentação",
        "Entrega das chaves e códigos de acesso",
        "Suporte pós-venda e orientações"
      ],
      icon: "Key",
      deliverables: ["Chaves do imóvel", "Documentação final", "Suporte pós-venda"]
    }
  ];

  const legalRequirements = [
    {
      category: "Documentação Pessoal",
      items: [
        "RG e CPF atualizados",
        "Comprovante de renda (3 últimos meses)",
        "Comprovante de residência",
        "Certidão de casamento (se aplicável)"
      ]
    },
    {
      category: "Documentação do Imóvel",
      items: [
        "Escritura ou contrato de compra e venda",
        "Certidão de ônus reais",
        "IPTU quitado",
        "Habite-se e aprovação da prefeitura"
      ]
    },
    {
      category: "Financiamento Habitacional",
      items: [
        "Análise de crédito no banco",
        "Avaliação do imóvel",
        "Seguro habitacional",
        "Registro no cartório"
      ]
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Processo Transparente e Seguro
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Conheça cada etapa do nosso processo estruturado, desde a primeira conversa 
            até a entrega das chaves do seu novo lar
          </p>
        </div>

        {/* Process Steps */}
        <div className="mb-16">
          {/* Step Navigation */}
          <div className="flex flex-nowrap overflow-x-auto justify-center gap-2 mb-8">
            {processSteps?.map((step, index) => (
              <button
                key={step?.step}
                onClick={() => setActiveStep(index)}
                className={`flex items-center space-x-2 px-4 py-2 whitespace-nowrap flex-shrink-0 rounded-lg font-medium transition-all duration-200 ${
                  activeStep === index
                    ? 'bg-primary text-white shadow-lg'
                    : ' text-text-secondary hover:bg-primary/10 hover:text-primary'
                }`}
              >
                <span className="text-sm">{step?.step}</span>
                <span className="hidden sm:inline">{step?.title}</span>
              </button>
            ))}
          </div>

          {/* Active Step Content */}
          <div className=" rounded-2xl p-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Step Info */}
              <div className="text-center lg:text-left">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4">
                  <Icon name={processSteps?.[activeStep]?.icon} size={32} color="var(--color-primary)" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">
                  Etapa {processSteps?.[activeStep]?.step}
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {processSteps?.[activeStep]?.title}
                </h3>
                <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                  <Icon name="Clock" size={14} className="mr-1" />
                  {processSteps?.[activeStep]?.duration}
                </div>
                <p className="text-text-secondary">
                  {processSteps?.[activeStep]?.description}
                </p>
              </div>

              {/* Step Details */}
              <div className="lg:col-span-2">
                <h4 className="font-semibold text-text-primary mb-4">O que fazemos nesta etapa:</h4>
                <ul className="space-y-3 mb-6">
                  {processSteps?.[activeStep]?.details?.map((detail, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Icon name="Check" size={16} color="var(--color-primary)" className="flex-shrink-0 mt-1" />
                      <span className="text-text-secondary text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="font-semibold text-text-primary mb-4">Entregáveis:</h4>
                <div className="flex flex-wrap gap-2">
                  {processSteps?.[activeStep]?.deliverables?.map((deliverable, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-white text-text-primary text-sm font-medium rounded-full border border-border"
                    >
                      {deliverable}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Requirements */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-text-primary mb-8 text-center">
            Requisitos Legais no Brasil
          </h3>
          <div className="grid lg:grid-cols-3 gap-6">
            {legalRequirements?.map((category, index) => (
              <div key={index} className=" rounded-xl p-6">
                <h4 className="font-semibold text-text-primary mb-4 flex items-center">
                  <Icon name="FileCheck" size={20} className="mr-2 text-primary" />
                  {category?.category}
                </h4>
                <ul className="space-y-2">
                  {category?.items?.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2">
                      <Icon name="Dot" size={16} color="var(--color-text-secondary)" className="flex-shrink-0 mt-1" />
                      <span className="text-sm text-text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProcessTransparencySection;