import styled from 'styled-components';
/*======================================*/
/*======================================*/
export const Container = styled.div`
    padding: 5px;
    width: 100%;
`;
/*======================================*/
/*======================================*/
export const Div = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;

    white-space: nowrap;
    font-size: 0.9rem;
    font-weight: 400;

    & span {
        margin-right: 4px;
    }
`;
/*======================================*/
/*======================================*/
export const Time = styled.span`
    font-size: 0.7rem;
    font-style: normal;
`;
/*======================================*/
/*======================================*/
export const Name = styled.span`
    font-weight: 500;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;
/*======================================*/
/*======================================*/
export const Content = styled.span`
    word-break: break-word;
    white-space: normal;
`;
/*======================================*/
/*======================================*/
