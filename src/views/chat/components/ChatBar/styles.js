import { sizes } from 'Styles/common.js';
import styled from 'styled-components';
/*======================================*/
/*======================================*/
export const Container = styled.div`
    width: 100%;
    height: 60px;

    padding: ${sizes.spacing.app};

    background: ${({ theme }) => theme.bg.main_2};
`;
/*======================================*/
/*======================================*/
export const InputContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    padding: ${sizes.spacing.app};
`;
/*======================================*/
/*======================================*/
export const Input = styled.input`
    width: 100%;

    color: ${({ theme }) => theme.input.text};
    background: ${({ theme }) => theme.input.bg};

    outline: none;
    border: 1px solid rgba(0,0,0,0);
    border-radius: 4px;

    line-height: 1rem;
    padding: 0.2rem 0.6rem;
    margin: 0;

    &:focus {
        border: 1px solid ${({ theme }) => theme.input.outline};
    }
`;
/*======================================*/
/*======================================*/
