import { sizes, USE_FULL_AREA, FLEX_CENTER_COL } from 'Styles/common.js';
import styled from 'styled-components';
/*======================================*/
/*======================================*/
export const Container = styled.div`
    ${USE_FULL_AREA}
    ${FLEX_CENTER_COL}
`;
/*======================================*/
/*======================================*/
export const ErrorContainer = styled.div`
    position: relative;

    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;

    width: ${window.innerWidth < 400 ? window.innerWidth : '400px'};
    height: auto;
    overflow: hidden;

    padding: 80px ${sizes.spacing.app};

    background: ${({ theme }) => theme.color.bg.main_2};
    border-radius: 0;
`;
/*======================================*/
/*======================================*/
export const Logo = styled.img`
    width: 80px;
    height: 80px;
    pointer-events: none;
    -webkit-user-select: none;
    user-select: none;
`;
/*======================================*/
/*======================================*/
export const Error = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;

    width: 60%;
    padding: 0;
`;
/*======================================*/
/*======================================*/
export const ErrorText = styled.span`
    margin: -10px 0px 20px 0;
`;
/*======================================*/
/*======================================*/
