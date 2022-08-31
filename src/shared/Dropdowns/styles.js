import { sizes, transition } from 'Styles/common.js';
import styled from 'styled-components';
/*======================================*/
/*======================================*/
export const Container = styled.div`
    position: relative;
    z-index: 100;

    width: 100%;
    height: 100%;
`;
/*======================================*/
/*======================================*/
export const Menu = styled.div`
    position: absolute;
    right: 0;

    background: ${({ theme }) => theme.menu.bg};

    transition: opacity linear ${transition.fast};

    display: ${(props) => (props.open ?'block' : 'none')};
    opacity: ${(props) => (props.open ? 1 : 0)};
    pointer-events: ${(props) => (props.open ? 'initial' : 'none')};
    -webkit-user-select: ${(props) => (props.open ? 'initial' : 'none')};
    user-select:${(props) => (props.open ? 'initial' : 'none')};
`;
/*======================================*/
/*======================================*/
export const List = styled.ul`
    list-style: none;
    padding: ${sizes.spacing.app};
    margin: 0;
`;
/*======================================*/
/*======================================*/
export const ListItem = styled.li`
    width: 100%;
`;
/*======================================*/
/*======================================*/