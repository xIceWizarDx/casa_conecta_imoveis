import { Head } from '@inertiajs/react';
import App from '@/main/App.jsx';
import '../../css/oldsite.css';

export default function Site() {
  return (
    <div className="old-site">
      <Head title="Site" />
      <App />
    </div>
  );
}
