import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Icon 
          name="Search" 
          size={20} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" 
        />
        <Input
          type="search"
          placeholder="Busque por dúvidas sobre financiamento, documentação, bairros..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="pl-12 pr-4 py-4 w-full text-base border-2 border-border focus:border-primary rounded-xl bg-white shadow-sm"
        />
      </div>
    </div>
  );
};

export default SearchBar;