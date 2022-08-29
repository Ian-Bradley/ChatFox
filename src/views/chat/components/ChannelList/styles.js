import styled from 'styled-components';
import { sizes } from 'Styles/common.js';
/*======================================*/
/*======================================*/
export const Container = styled.div`
    position: relative;

    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: flex-start;

    width: 100%;
    height: 100%;
`;
/*======================================*/
/*======================================*/
export const Top = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;

    background: ${({ theme }) => theme.bg.main_4};
    padding: ${sizes.spacing.app};
    width: 100%;
`;
/*======================================*/
/*======================================*/
export const Search = styled.span`
    position: absolute;
    left: ${sizes.spacing.app};
    width: 15px;
`;
/*======================================*/
/*======================================*/
export const AddChannel = styled.span`
    position: absolute;
    right: ${sizes.spacing.app};

    font-family: 'Roboto', sans-serif;
    font-size: 0.7rem;
    font-weight: 400;
`;
/*======================================*/
/*======================================*/
