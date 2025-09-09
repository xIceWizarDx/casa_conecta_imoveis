import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ConsultationHub = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    familySize: '',
    budget: '',
    neighborhoods: [],
    propertyType: '',
    timeline: '',
    financing: '',
    message: ''
  });

  const totalSteps = 4;

  const budgetRanges = [
    { value: '800000-1200000', label: 'R$ 800.000 - R$ 1.200.000' },
    { value: '1200000-1800000', label: 'R$ 1.200.000 - R$ 1.800.000' },
    { value: '1800000-2500000', label: 'R$ 1.800.000 - R$ 2.500.000' },
    { value: '2500000-3000000', label: 'R$ 2.500.000 - R$ 3.000.000' },
    { value: '3000000+', label: 'Acima de R$ 3.000.000' }
  ];

  const neighborhoodOptions = [
    'Setor Bueno', 'Jardim Goiás', 'Alto da Glória', 'Setor Marista', 
    'Setor Oeste', 'Park Lozandes', 'Setor Sul', 'Jardim América'
  ];

  const propertyTypes = [
    { value: 'casa', label: 'Casa' },
    { value: 'apartamento', label: 'Apartamento' },
    { value: 'cobertura', label: 'Cobertura' },
    { value: 'sobrado', label: 'Sobrado' },
    { value: 'terreno', label: 'Terreno' }
  ];

  const timelineOptions = [
    { value: 'urgente', label: 'Até 1 mês (Urgente)' },
    { value: '1-3meses', label: '1 a 3 meses' },
    { value: '3-6meses', label: '3 a 6 meses' },
    { value: '6meses+', label: 'Mais de 6 meses' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNeighborhoodToggle = (neighborhood) => {
    setFormData(prev => ({
      ...prev,
      neighborhoods: prev?.neighborhoods?.includes(neighborhood)
        ? prev?.neighborhoods?.filter(n => n !== neighborhood)
        : [...prev?.neighborhoods, neighborhood]
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const consultationData = {
      ...formData,
      neighborhoods: formData?.neighborhoods?.join(', '),
      submittedAt: new Date()?.toISOString()
    };

    // Create WhatsApp message
    const message = `*Nova Consulta - Casa Conecta*\n\n` +
      `*Nome:* ${formData?.name}\n` +
      `*Email:* ${formData?.email}\n` +
      `*Telefone:* ${formData?.phone}\n` +
      `*Tamanho da Família:* ${formData?.familySize}\n` +
      `*Orçamento:* ${budgetRanges?.find(b => b?.value === formData?.budget)?.label || formData?.budget}\n` +
      `*Bairros de Interesse:* ${formData?.neighborhoods?.join(', ')}\n` +
      `*Tipo de Imóvel:* ${propertyTypes?.find(p => p?.value === formData?.propertyType)?.label || formData?.propertyType}\n` +
      `*Prazo:* ${timelineOptions?.find(t => t?.value === formData?.timeline)?.label || formData?.timeline}\n` +
      `*Financiamento:* ${formData?.financing}\n` +
      `*Mensagem:* ${formData?.message || 'Não informado'}\n\n` +
      `Gostaria de agendar uma consulta personalizada.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5562999999999?text=${encodedMessage}`, '_blank');
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Vamos nos conhecer";
      case 2: return "Conte sobre sua família";
      case 3: return "Suas preferências";
      case 4: return "Finalizando sua consulta";
      default: return "Consulta Personalizada";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return "Precisamos de suas informações básicas para personalizar o atendimento";
      case 2: return "Entender sua família nos ajuda a encontrar o imóvel perfeito";
      case 3: return "Suas preferências nos guiam na seleção dos melhores imóveis";
      case 4: return "Revise suas informações e finalize sua solicitação de consulta";
      default: return "";
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData?.name && formData?.email && formData?.phone;
      case 2:
        return formData?.familySize && formData?.budget;
      case 3:
        return formData?.neighborhoods?.length > 0 && formData?.propertyType && formData?.timeline;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Consulta Personalizada Gratuita
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Responda algumas perguntas e receba uma seleção curada de imóveis que atendem perfeitamente ao seu perfil
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">
                Etapa {currentStep} de {totalSteps}
              </span>
              <span className="text-sm font-medium text-primary">
                {Math.round((currentStep / totalSteps) * 100)}% concluído
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {getStepTitle()}
              </h3>
              <p className="text-gray-600">
                {getStepDescription()}
              </p>
            </div>

            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Nome Completo"
                    type="text"
                    placeholder="Digite seu nome completo"
                    value={formData?.name}
                    onChange={(e) => handleInputChange('name', e?.target?.value)}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData?.email}
                    onChange={(e) => handleInputChange('email', e?.target?.value)}
                    required
                  />
                </div>
                <Input
                  label="Telefone/WhatsApp"
                  type="tel"
                  placeholder="(62) 99999-9999"
                  value={formData?.phone}
                  onChange={(e) => handleInputChange('phone', e?.target?.value)}
                  required
                />
              </div>
            )}

            {/* Step 2: Family and Budget */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Quantas pessoas moram na família?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['1 pessoa', '2 pessoas', '3 pessoas', '4+ pessoas']?.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleInputChange('familySize', size)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                          formData?.familySize === size
                            ? 'border-primary bg-primary text-white' :'border-gray-200 hover:border-primary hover:text-primary'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Qual seu orçamento para o imóvel?
                  </label>
                  <div className="space-y-2">
                    {budgetRanges?.map((range) => (
                      <button
                        key={range?.value}
                        onClick={() => handleInputChange('budget', range?.value)}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
                          formData?.budget === range?.value
                            ? 'border-primary bg-primary/5 text-primary' :'border-gray-200 hover:border-primary/50'
                        }`}
                      >
                        {range?.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Preferences */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Quais bairros te interessam? (Selecione um ou mais)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {neighborhoodOptions?.map((neighborhood) => (
                      <button
                        key={neighborhood}
                        onClick={() => handleNeighborhoodToggle(neighborhood)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                          formData?.neighborhoods?.includes(neighborhood)
                            ? 'border-primary bg-primary text-white' :'border-gray-200 hover:border-primary hover:text-primary'
                        }`}
                      >
                        {neighborhood}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Tipo de imóvel preferido
                    </label>
                    <div className="space-y-2">
                      {propertyTypes?.map((type) => (
                        <button
                          key={type?.value}
                          onClick={() => handleInputChange('propertyType', type?.value)}
                          className={`w-full p-3 rounded-lg border-2 text-left transition-colors ${
                            formData?.propertyType === type?.value
                              ? 'border-primary bg-primary/5 text-primary' :'border-gray-200 hover:border-primary/50'
                          }`}
                        >
                          {type?.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Quando pretende comprar?
                    </label>
                    <div className="space-y-2">
                      {timelineOptions?.map((timeline) => (
                        <button
                          key={timeline?.value}
                          onClick={() => handleInputChange('timeline', timeline?.value)}
                          className={`w-full p-3 rounded-lg border-2 text-left transition-colors ${
                            formData?.timeline === timeline?.value
                              ? 'border-primary bg-primary/5 text-primary' :'border-gray-200 hover:border-primary/50'
                          }`}
                        >
                          {timeline?.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Final Details */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Vai precisar de financiamento?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {['Sim, preciso de ajuda', 'Sim, já tenho aprovação', 'Não, pagamento à vista']?.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleInputChange('financing', option)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                          formData?.financing === option
                            ? 'border-primary bg-primary text-white' :'border-gray-200 hover:border-primary hover:text-primary'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alguma observação especial? (Opcional)
                  </label>
                  <textarea
                    value={formData?.message}
                    onChange={(e) => handleInputChange('message', e?.target?.value)}
                    placeholder="Ex: Preciso de acessibilidade, tenho pets, preferência por andar alto..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>

                {/* Summary */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Resumo da sua consulta:</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Nome:</span> {formData?.name}</p>
                    <p><span className="font-medium">Família:</span> {formData?.familySize}</p>
                    <p><span className="font-medium">Orçamento:</span> {budgetRanges?.find(b => b?.value === formData?.budget)?.label}</p>
                    <p><span className="font-medium">Bairros:</span> {formData?.neighborhoods?.join(', ')}</p>
                    <p><span className="font-medium">Tipo:</span> {propertyTypes?.find(p => p?.value === formData?.propertyType)?.label}</p>
                    <p><span className="font-medium">Prazo:</span> {timelineOptions?.find(t => t?.value === formData?.timeline)?.label}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                iconName="ChevronLeft"
                iconPosition="left"
              >
                Voltar
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  variant="default"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  iconName="ChevronRight"
                  iconPosition="right"
                >
                  Próximo
                </Button>
              ) : (
                <Button
                  variant="default"
                  onClick={handleSubmit}
                  disabled={!isStepValid()}
                  iconName="MessageCircle"
                  iconPosition="left"
                  className="bg-accent hover:bg-accent/90"
                >
                  Enviar via WhatsApp
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationHub;