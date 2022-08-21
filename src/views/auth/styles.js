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
export const FormContainer = styled.div`
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
    border: ${(props) => props.borderWidth}px solid ${({ theme }) => theme.color.border.highlight};
    border-radius: 0;
`;
/*======================================*/
/*======================================*/
export const Form = styled.form`
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;

    width: 60%;
    padding: 0;
`;
/*======================================*/
/*======================================*/
