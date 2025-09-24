import React from 'react';

type Props = { children: React.ReactNode };
type State = { error: Error | null };

export default class DevErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // Useful in console while debugging
    // eslint-disable-next-line no-console
    console.error('Painel error boundary:', error, info);
  }

  render(): React.ReactNode {
    if (this.state.error) {
      return (
        <div style={{ padding: 16 }}>
          <h2 style={{ fontWeight: 600 }}>Falha ao renderizar a página</h2>
          <p style={{ color: '#ef4444' }}>{this.state.error.message}</p>
          <p style={{ fontSize: 12, color: '#64748b' }}>
            Verifique o console do navegador para detalhes e rastreio.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

