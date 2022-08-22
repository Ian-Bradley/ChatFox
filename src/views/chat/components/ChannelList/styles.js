import styled from 'styled-components';
import { sizes, LIST_SCROLLBAR } from 'Styles/common.js';
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

    ${LIST_SCROLLBAR}
`;
/*======================================*/
/*======================================*/
export const Top = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;

    background: ${({ theme }) => theme.bg.main_4};
    padding: ${sizes.spacing.app};
    width: 100%;
`;
/*======================================*/
/*======================================*/
export const Bottom = styled.div`
    background: ${({ theme }) => theme.bg.main_2};
    padding: ${sizes.spacing.app};
    width: 100%;
    height: 100%;
`;
/*======================================*/
/*======================================*/
export const Search = styled.div`
    position: absolute;
    bottom: ${sizes.spacing.app};
    right: ${sizes.spacing.app};
`;
/*======================================*/
/*======================================*/
export const SearchButton = styled.button`
    
`;
/*======================================*/
/*======================================*/
