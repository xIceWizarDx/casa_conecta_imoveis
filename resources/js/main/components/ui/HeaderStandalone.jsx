import HeaderBase from './HeaderBase';
import { usePage } from '@inertiajs/react';

const AnchorLinkAdapter = ({ href, onClick, children, ...rest }) => (
    <a
        href={href}
        onClick={(event) => {
            onClick?.(event);
        }}
        {...rest}
    >
        {children}
    </a>
);

export default function HeaderStandalone() {
    const page = usePage();
    const auth = page?.props?.auth;
    const isLogged = !!auth?.user;
    const urlFromPage = typeof page?.url === 'string' ? page.url : null;
    const currentPath = urlFromPage?.split('?')[0] || (typeof window !== 'undefined' ? window.location.pathname : '/');

    return (
        <HeaderBase
            LinkComponent={AnchorLinkAdapter}
            isActivePath={(path) => currentPath === path}
            isLogged={isLogged}
            authUser={auth?.user}
        />
    );
}
