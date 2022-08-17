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

    overflow: hidden;
    padding: 80px ${sizes.spacing.app};

    background: ${({ theme }) => theme.color.bg.main_2};
    border-radius: 0rem;
`;
// border: 5px solid ${({ theme }) => theme.color.border.highlight};
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
    margin-bottom: 15px;

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
export const Input = styled.input`
    width: 100%;
    height: 30px;

    padding: 0 ${sizes.spacing.app};
    margin-bottom: 12px;

    box-sizing: border-box;
    outline: none;
    border: none;

    background: ${({ theme }) => theme.color.text.light};
    color: ${({ theme }) => theme.color.text.dark};
`;
/*======================================*/
/*======================================*/
export const Button = styled.button`
    width: 100%;
    height: 30px;

    outline: none;
    border: none;

    background: ${({ theme }) => theme.color.text.link};
    color: ${({ theme }) => theme.color.text.black};
`;
/*======================================*/
/*======================================*/
export const RememberContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justifty-content: center;

    margin-top: 20px;
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
