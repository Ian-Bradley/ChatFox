import styled from 'styled-components';
import sizes, { USE_FULL_AREA, FLEX_CENTER } from '../../styles/common.js';
/*======================================*/
/*======================================*/
export const Container = styled.div`
    background: ${({ theme }) => theme.color.bg.main_1};
    ${USE_FULL_AREA}
    ${FLEX_CENTER}
`;
/*======================================*/
/*======================================*/
export const FormContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;

    width: 400px;
    height: auto;
    padding: 80px ${sizes.spacing.app};

    background: ${({ theme }) => theme.color.bg.main_2};
    border: 5px solid ${({ theme }) => theme.color.border.highlight};
    border-radius: 0rem;
`;
/*======================================*/
/*======================================*/
export const Form = styled.form`
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    padding: ${sizes.spacing.app};
    ${USE_FULL_AREA}
`;
/*======================================*/
/*======================================*/
export const ImageContainer = styled.div`
    width: 100%;
    ${FLEX_CENTER}
`;
/*======================================*/
/*======================================*/
export const Image = styled.img`
    width: 150px;
    height: 150px;
`;
/*======================================*/
/*======================================*/
export const TitleContainer = styled.div`
    width: 100%;
    height: auto;
    padding: ${sizes.spacing.app};
    ${FLEX_CENTER}
`;
/*======================================*/
/*======================================*/
export const Title = styled.h1`
    font-size: 3rem;
    font-weight: 600;
    margin: 0;
`;
/*======================================*/
/*======================================*/
export const InputContainer = styled.label`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justifty-content: center;
    margin-bottom: 1rem;
`;
/*======================================*/
/*======================================*/
export const Input = styled.input`
    background: none;
    outline: none;
    border: none;
    border-bottom: 2px solid ${({ theme }) => theme.color.text.light};
    margin-bottom: 8px;
`;
/*======================================*/
/*======================================*/
export const RememberContainer = styled.label`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justifty-content: center;
`;
/*======================================*/
/*======================================*/
export const Label = styled.label`
    padding-left: ${sizes.spacing.app};
`;
/*======================================*/
/*======================================*/
export const Checbox = styled.input``;
/*======================================*/
/*======================================*/
