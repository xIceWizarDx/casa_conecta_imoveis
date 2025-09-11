import React, { useState } from 'react';
import PropertyFilters from './PropertyFilters';
import FeaturedProperties from './FeaturedProperties';

export default function PropertyExplorer() {
  const [filters, setFilters] = useState({
    neighborhood: '',
    priceRange: '',
    propertyType: ''
  });

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <PropertyFilters onFiltersChange={setFilters} />
        <FeaturedProperties filters={filters} />
      </div>
    </section>
  );
}

