import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TeamSection = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Carlos Eduardo Silva",
      role: "Diretor Comercial & Fundador",
      creci: "CRECI-GO 12345",
      specialization: "Setor Bueno, Jardim Goiás, Alto da Glória",
      experience: "8 anos",
      approach: "Especialista em imóveis de alto padrão com foco em relacionamento duradouro",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      achievements: ["Top Seller 2023", "500+ Imóveis Vendidos", "Certificação Internacional"]
    },
    {
      id: 2,
      name: "Marina Santos Oliveira",
      role: "Consultora Senior",
      creci: "CRECI-GO 23456",
      specialization: "Setor Oeste, Jardim América, Vila Brasília",
      experience: "6 anos",
      approach: "Consultoria personalizada com foco na experiência completa do cliente",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      achievements: ["Melhor Atendimento 2023", "300+ Famílias Atendidas", "Especialista em Financiamento"]
    },
    {
      id: 3,
      name: "Roberto Mendes Costa",
      role: "Consultor Especialista",
      creci: "CRECI-GO 34567",
      specialization: "Setor Marista, Setor Sul, Centro",
      experience: "5 anos",
      approach: "Expertise em análise de mercado e investimentos imobiliários",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      achievements: ["Analista Certificado", "200+ Análises de Mercado", "Especialista em Investimentos"]
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Nossa Equipe Especializada
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Profissionais certificados e especializados nos melhores bairros de Goiânia, 
            prontos para oferecer consultoria personalizada
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {teamMembers?.map((member) => (
            <div key={member?.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Profile Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={member?.image}
                  alt={`${member?.name} - ${member?.role}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* CRECI Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-xs font-medium text-text-primary">{member?.creci}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-1">
                    {member?.name}
                  </h3>
                  <p className="text-primary font-medium">{member?.role}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Icon name="MapPin" size={16} color="var(--color-text-secondary)" className="mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-text-primary">Especialização</div>
                      <div className="text-sm text-text-secondary">{member?.specialization}</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Icon name="Calendar" size={16} color="var(--color-text-secondary)" className="mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-text-primary">Experiência</div>
                      <div className="text-sm text-text-secondary">{member?.experience}</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Icon name="User" size={16} color="var(--color-text-secondary)" className="mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-text-primary">Abordagem</div>
                      <div className="text-sm text-text-secondary">{member?.approach}</div>
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="pt-4 border-t border-border">
                  <div className="text-sm font-medium text-text-primary mb-2">Conquistas</div>
                  <div className="flex flex-wrap gap-2">
                    {member?.achievements?.map((achievement, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Stats */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">19+</div>
              <div className="text-sm text-text-secondary">Anos de Experiência Combinada</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-text-secondary">Certificados CRECI</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <div className="text-sm text-text-secondary">Bairros Especializados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-text-secondary">Atendimento WhatsApp</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;