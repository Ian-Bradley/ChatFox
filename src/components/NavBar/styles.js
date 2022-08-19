import styled from 'styled-components';
import { sizes, USE_FULL_AREA } from '../../styles/common.js';
/*======================================*/
/*======================================*/
export const Container = styled.div`
    position: relative;
    ${USE_FULL_AREA}
`;
/*======================================*/
/*======================================*/
export const TitleContainer = styled.div`
    position: fixed;
    top: ${sizes.spacing.app};
    left: ${sizes.spacing.app};

    display: flex;
    flex-flow: row nowrap;
    justify-content: center;

    width: 100%;
`;
/*======================================*/
/*======================================*/
export const Title = styled.span`
    font-size: 4rem;
    font-weight: 800;
`;
/*======================================*/
/*======================================*/
export const Nav = styled.nav`
    position: fixed;
    top: ${sizes.spacing.app};
    right: ${sizes.spacing.app};

    padding: 0;
    margin: 0;
`;
/*======================================*/
/*======================================*/
export const Button = styled.button``;
/*======================================*/
/*======================================*/
