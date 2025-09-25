import { ImgHTMLAttributes } from 'react';

// Renders the project logo image instead of the old inline SVG
export default function AppLogoIcon({ className = '', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
    return <img src="/logo.png" alt="Casa Conecta" className={className} {...props} />;
}
