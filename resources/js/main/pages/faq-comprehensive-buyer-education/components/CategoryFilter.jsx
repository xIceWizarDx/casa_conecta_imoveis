import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  const categoryIcons = {
    'Todos': 'Grid3X3',
    'Condomínios': 'Home',
    'Regras do Condomínio': 'Shield',
    'Segurança Jurídica': 'FileText',
    'Construção': 'Wrench',
    'Valorização': 'TrendingUp',
    'Consultoria': 'Calendar',
    'Atendimento': 'MessageCircle',
    'Pós-venda': 'CheckCircle',
    'Serviços Casa Conecta': 'Home',
    'Financiamento': 'CreditCard',
    'Processo Legal': 'FileText',
    'Bairros': 'MapPin',
    'Investimento': 'TrendingUp',
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {categories?.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeCategory === category
              ? 'bg-primary text-white shadow-md transform scale-105'
              : 'bg-white text-text-secondary border border-border hover:border-primary hover:text-primary hover:bg-primary/5'
          }`}
        >
          <Icon 
            name={categoryIcons?.[category]} 
            size={16} 
            className={activeCategory === category ? 'text-white' : 'text-current'} 
          />
          <span>{category}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;

