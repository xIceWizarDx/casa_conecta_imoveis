import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Ana Paula e Ricardo Oliveira",
      location: "Setor Bueno",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: `A Casa Conecta transformou nossa experiência de compra de imóvel. O Carlos nos atendeu via WhatsApp desde o primeiro contato e foi extremamente atencioso. Encontramos nossa casa dos sonhos no Setor Bueno em apenas 3 semanas! O processo foi transparente e sem surpresas.`,
      property: "Casa 4 quartos - R$ 1.850.000",
      date: "Dezembro 2024",
      highlight: "Atendimento via WhatsApp excepcional"
    },
    {
      id: 2,
      name: "Marcos e Juliana Santos",
      location: "Jardim Goiás",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: `Depois de meses procurando apartamento, a Marina da Casa Conecta nos apresentou opções perfeitas para nosso perfil. A negociação foi excelente e conseguimos um desconto significativo. Recomendamos para todos os amigos!`,
      property: "Apartamento 3 quartos - R$ 1.200.000",
      date: "Novembro 2024",
      highlight: "Negociação expert que economizou R$ 80.000"
    },
    {
      id: 3,
      name: "Fernanda Costa",
      location: "Alto da Glória",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: `Como investidora, precisava de alguém que entendesse o mercado. O Roberto me ajudou a encontrar uma cobertura com excelente potencial de valorização. O conhecimento dele sobre Goiânia é impressionante. Já comprei mais 2 imóveis com eles!`,
      property: "Cobertura 5 quartos - R$ 2.400.000",
      date: "Outubro 2024",
      highlight: "Expertise em investimentos imobiliários"
    },
    {
      id: 4,
      name: "Pedro e Carla Mendes",
      location: "Setor Marista",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: `Mudamos de São Paulo para Goiânia e não conhecíamos a cidade. A equipe da Casa Conecta nos guiou em tudo: melhores bairros, escolas próximas, comércio. Encontramos nossa casa ideal no Setor Marista. Atendimento humanizado e profissional!`,
      property: "Casa 4 quartos - R$ 1.650.000",
      date: "Setembro 2024",
      highlight: "Suporte completo para mudança de cidade"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Olá! Vi os depoimentos de clientes e gostaria de saber mais sobre os serviços da Casa Conecta.');
    window.open(`https://wa.me/5562999999999?text=${message}`, '_blank');
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Histórias reais de famílias que realizaram o sonho da casa própria com nossa consultoria especializada
          </p>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="relative bg-white rounded-3xl p-8 lg:p-12 shadow-lg mb-12">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Client Photo and Info */}
            <div className="flex-shrink-0 text-center lg:text-left">
              <div className="w-24 h-24 mx-auto lg:mx-0 mb-4 overflow-hidden rounded-2xl">
                <Image
                  src={testimonials?.[currentTestimonial]?.image}
                  alt={testimonials?.[currentTestimonial]?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {testimonials?.[currentTestimonial]?.name}
              </h3>
              <p className="text-primary font-medium mb-2">
                {testimonials?.[currentTestimonial]?.location}
              </p>
              <div className="flex justify-center lg:justify-start mb-2">
                {[...Array(testimonials?.[currentTestimonial]?.rating)]?.map((_, i) => (
                  <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-sm text-gray-500">
                {testimonials?.[currentTestimonial]?.date}
              </p>
            </div>

            {/* Testimonial Content */}
            <div className="flex-1">
              <div className="mb-6">
                <Icon name="Quote" size={32} className="text-primary/20 mb-4" />
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  {testimonials?.[currentTestimonial]?.text}
                </p>
                <div className="bg-primary/10 rounded-lg p-4 mb-4">
                  <p className="text-primary font-semibold text-sm">
                    ✨ {testimonials?.[currentTestimonial]?.highlight}
                  </p>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Icon name="Home" size={16} className="mr-2" />
                  <span>{testimonials?.[currentTestimonial]?.property}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
            aria-label="Previous testimonial"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
            aria-label="Next testimonial"
          >
            <Icon name="ChevronRight" size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-primary' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <p className="text-gray-600">Imóveis Vendidos</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <p className="text-gray-600">Clientes Satisfeitos</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">15+</div>
            <p className="text-gray-600">Anos de Experiência</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24h</div>
            <p className="text-gray-600">Resposta no WhatsApp</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Pronto Para Sua História de Sucesso?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Junte-se a centenas de famílias que já encontraram seu lar ideal com nossa consultoria especializada. 
            Comece sua jornada hoje mesmo!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              size="lg"
              iconName="MessageCircle"
              iconPosition="left"
              onClick={handleWhatsAppClick}
              className="bg-accent hover:bg-accent/90"
            >
              Iniciar Consulta no WhatsApp
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="Phone"
              iconPosition="left"
              onClick={() => window.open('tel:+5562999999999')}
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              Ligar Agora
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;