import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

export interface HeroSlideProps {
  image: string;
  title?: string | null;
  subtitle?: string | null;
  price?: string | null;
  bedrooms?: number | string | null;
  bathrooms?: number | string | null;
  area?: string | null;
  neighborhood?: string | null;
  onWhatsAppClick?: () => void;
  onCallClick?: () => void;
}

const HeroSlide = ({
  image,
  title,
  subtitle,
  price,
  bedrooms,
  bathrooms,
  area,
  neighborhood,
  onWhatsAppClick,
  onCallClick,
}: HeroSlideProps) => {
  return (
    <div className="relative w-full h-full">
      <Image
        src={image}
        alt={title ?? ''}
        className="w-full h-full object-cover object-center"
        loading="lazy"
      />
      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute inset-0 flex items-center">
        <div className="container-responsive">
          <div className="max-w-3xl text-white animate-fade-in-up">
            {neighborhood && (
              <div className="mb-4">
                <span className="inline-flex items-center px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full text-sm font-medium text-primary-foreground">
                  <Icon name="MapPin" size={16} className="mr-2" />
                  {neighborhood}
                </span>
              </div>
            )}

            {title && (
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance text-shadow leading-tight">
                {title}
              </h1>
            )}

            {subtitle && (
              <p className="text-xl sm:text-2xl mb-8 text-gray-100 text-shadow max-w-2xl">{subtitle}</p>
            )}

            {(bedrooms || bathrooms || area) && (
              <div className="flex flex-wrap items-center gap-4 mb-10">
                {bedrooms && (
                  <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                    <Icon name="Bed" size={20} color="white" />
                    <span className="text-sm font-semibold">{bedrooms} quartos</span>
                  </div>
                )}
                {bathrooms && (
                  <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                    <Icon name="Bath" size={20} color="white" />
                    <span className="text-sm font-semibold">{bathrooms} banheiros</span>
                  </div>
                )}
                {area && (
                  <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                    <Icon name="Square" size={20} color="white" />
                    <span className="text-sm font-semibold">{area}</span>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {price && (
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">{price}</div>
              )}
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="default"
                  iconName="MessageCircle"
                  iconPosition="left"
                  onClick={onWhatsAppClick}
                  className="bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-3 text-base shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Detalhes
                </Button>
                <Button
                  variant="outline"
                  iconName="Phone"
                  iconPosition="left"
                  onClick={onCallClick}
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-6 py-3 text-base backdrop-blur-sm transition-all duration-200"
                >
                  Ligar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlide;

