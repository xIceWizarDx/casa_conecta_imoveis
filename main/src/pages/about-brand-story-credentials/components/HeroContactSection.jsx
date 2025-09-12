import React from 'react';
import HeroSection from './HeroSection';
import ContactSection from './ContactSection';

export default function HeroContactSection() {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
        <HeroSection />
        <div className="space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary">
            Fale com Nossos Especialistas
          </h2>
          <ContactSection />
        </div>
      </div>
    </section>
  );
}
