import styled from 'styled-components';
/*======================================*/
/*======================================*/
export const Container = styled.div`
    width: 100%;
    height: 60px;

    background: ${({ theme }) => theme.color.bg.main_2};
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
`;
/*======================================*/
/*======================================*/
export const Input = styled.input`
    width: 100%;
    background-color: ${({ theme }) => theme.color.bg.main_2};

    border: 1px solid;
    border-radius: 6px;

    line-height: 1rem;
    padding: 0.2rem 0.6rem;
`;
/*======================================*/
/*======================================*/
