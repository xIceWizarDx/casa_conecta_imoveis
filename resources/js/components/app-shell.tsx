import { type ReactNode } from 'react';

interface AppShellProps {
    children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
    return <div className="flex min-h-screen w-full flex-col">{children}</div>;
}
