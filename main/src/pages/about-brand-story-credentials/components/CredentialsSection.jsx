import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CredentialsSection = () => {
  const certifications = [
    {
      title: "CRECI-GO Ativo",
      number: "Registro 12345",
      description: "Registro ativo no Conselho Regional de Corretores de Imóveis de Goiás",
      icon: "Award",
      verified: true
    },
    {
      title: "Certificação SECOVI",
      number: "Cert. 2024",
      description: "Sindicato das Empresas de Compra, Venda, Locação e Administração de Imóveis",
      icon: "Shield",
      verified: true
    },
    {
      title: "Especialização Financiamento",
      number: "CEF/BB 2023",
      description: "Certificação em financiamento habitacional Caixa Econômica Federal e Banco do Brasil",
      icon: "CreditCard",
      verified: true
    }
  ];

  const associations = [
    {
      name: "ADEMI-GO",
      fullName: "Associação de Dirigentes de Empresas do Mercado Imobiliário de Goiás",
      role: "Membro Ativo",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop"
    },
    {
      name: "SECOVI-GO",
      fullName: "Sindicato das Empresas de Compra, Venda, Locação de Imóveis de Goiás",
      role: "Associado",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop"
    },
    {
      name: "COFECI",
      fullName: "Conselho Federal de Corretores de Imóveis",
      role: "Registrado",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop"
    }
  ];

  const recognitions = [
    {
      year: "2024",
      title: "Top Seller Premium",
      organization: "ADEMI-GO",
      description: "Reconhecimento por excelência em vendas no segmento premium"
    },
    {
      year: "2023",
      title: "Melhor Atendimento ao Cliente",
      organization: "Prêmio Imobiliário GO",
      description: "Premiação baseada em avaliações de clientes atendidos"
    },
    {
      year: "2023",
      title: "Inovação Digital",
      organization: "SECOVI-GO",
      description: "Reconhecimento pela implementação do atendimento WhatsApp 24/7"
    }
  ];

  const continuingEducation = [
    {
      course: "Tendências do Mercado Imobiliário 2024",
      institution: "FGV",
      date: "Janeiro 2024",
      hours: "40h"
    },
    {
      course: "Financiamento Habitacional Avançado",
      institution: "CEF Academy",
      date: "Novembro 2023",
      hours: "32h"
    },
    {
      course: "Negociação e Relacionamento com Clientes",
      institution: "SEBRAE-GO",
      date: "Setembro 2023",
      hours: "24h"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Credenciais e Certificações
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Profissionais devidamente certificados e em constante atualização para 
            oferecer o melhor serviço no mercado imobiliário
          </p>
        </div>

        {/* Main Certifications */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {certifications?.map((cert, index) => (
            <div key={index} className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/20">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={cert?.icon} size={24} color="var(--color-primary)" />
                </div>
                {cert?.verified && (
                  <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    <Icon name="CheckCircle" size={14} />
                    <span className="text-xs font-medium">Verificado</span>
                  </div>
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {cert?.title}
              </h3>
              <div className="text-primary font-medium mb-3">{cert?.number}</div>
              <p className="text-sm text-text-secondary">{cert?.description}</p>
            </div>
          ))}
        </div>

        {/* Professional Associations */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-text-primary mb-8 text-center">
            Associações Profissionais
          </h3>
          <div className="grid lg:grid-cols-3 gap-6">
            {associations?.map((assoc, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={assoc?.logo}
                    alt={`Logo ${assoc?.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-semibold text-text-primary mb-2">{assoc?.name}</h4>
                <p className="text-sm text-text-secondary mb-3">{assoc?.fullName}</p>
                <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {assoc?.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Market Recognition */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-text-primary mb-8 text-center">
            Reconhecimentos do Mercado
          </h3>
          <div className="space-y-6">
            {recognitions?.map((recognition, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Icon name="Trophy" size={24} color="#F59E0B" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-lg font-bold text-primary">{recognition?.year}</span>
                    <div className="h-px bg-border flex-1"></div>
                  </div>
                  <h4 className="text-lg font-semibold text-text-primary mb-1">
                    {recognition?.title}
                  </h4>
                  <p className="text-sm text-primary font-medium mb-2">{recognition?.organization}</p>
                  <p className="text-sm text-text-secondary">{recognition?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continuing Education */}
        <div>
          <h3 className="text-2xl font-bold text-text-primary mb-8 text-center">
            Educação Continuada
          </h3>
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="space-y-4">
              {continuingEducation?.map((course, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary mb-1">{course?.course}</h4>
                    <p className="text-sm text-text-secondary">{course?.institution}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-primary">{course?.date}</div>
                    <div className="text-xs text-text-secondary">{course?.hours}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Verification Notice */}
        <div className="mt-16 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} color="#3B82F6" className="flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Verificação de Credenciais</h4>
              <p className="text-sm text-blue-800 mb-3">
                Todas as nossas certificações podem ser verificadas diretamente nos órgãos competentes. 
                Transparência e confiabilidade são pilares fundamentais do nosso trabalho.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">CRECI-GO: creci-go.gov.br</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">COFECI: cofeci.gov.br</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">SECOVI: secovi-go.com.br</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredentialsSection;