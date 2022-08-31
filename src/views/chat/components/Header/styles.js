import { sizes } from 'Styles/common.js';
import styled from 'styled-components';
/*======================================*/
/*======================================*/
export const Container = styled.div`
    width: 100%;
    height: ${sizes.height.nav};

    position: relative;
    box-sizing: border-box;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;

    padding: 0 1rem;
    background: ${({ theme }) => theme.bg.main_3};
`;
/*======================================*/
/*======================================*/
export const Brand = styled.div`
    height: 100%;

    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
`;
/*======================================*/
/*======================================*/
export const Logo = styled.img`
    width: 50px;
    height: 50px;
    pointer-events: none;
    -webkit-user-select: none;
    user-select: none;
`;
/*======================================*/
/*======================================*/
export const Nav = styled.nav`
    padding: 0;
    margin: 0;
`;
/*======================================*/
/*======================================*/
export const Name = styled.nav`
    font-family: 'Roboto', sans-serif;
    font-size: 0.8rem;
    font-weight: 300;
`;
/*======================================*/
/*======================================*/