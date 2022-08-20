import styled from 'styled-components';
import { sizes, USE_FULL_AREA, FLEX_CENTER_ROW } from '../../../../styles/common.js';
/*======================================*/
/*======================================*/
export const Container = styled.div`
    position: relative;
    box-sizing: border-box;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;

    padding: 0 1rem;

    ${USE_FULL_AREA}
`;
/*======================================*/
/*======================================*/
export const TitleContainer = styled.div`
    /* width: 100%; */
`;
/*======================================*/
/*======================================*/
export const Title = styled.h1`
    font-size: 3rem;
    font-weight: 800;
    margin: 0 0 7px 0;
`;
/*======================================*/
/*======================================*/
export const Nav = styled.nav`
    padding: 0;
    margin: 0;
`;
/*======================================*/
/*======================================*/
export const Button = styled.button``;
/*======================================*/
/*======================================*/
