import HeaderBase from './HeaderBase';
import { Link, useLocation } from 'react-router-dom';
import { usePage } from '@inertiajs/react';

const RouterLinkAdapter = ({ href, children, ...rest }) => (
    <Link to={href} {...rest}>
        {children}
    </Link>
);

const Header = () => {
    const location = useLocation();
    const page = usePage();
    const auth = page?.props?.auth;
    const isLogged = !!auth?.user;

    return (
        <HeaderBase
            LinkComponent={RouterLinkAdapter}
            isActivePath={(path) => location?.pathname === path}
            isLogged={isLogged}
            authUser={auth?.user}
        />
    );
};

export default Header;
