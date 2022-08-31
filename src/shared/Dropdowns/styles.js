import { sizes } from 'Styles/common.js';
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

    top: 0;
    right: 0;
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

`;
/*======================================*/
/*======================================*/