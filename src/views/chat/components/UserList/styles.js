import styled from 'styled-components';
import { sizes, USE_FULL_AREA, LIST_SCROLLBAR } from 'Styles/common.js';
/*======================================*/
/*======================================*/
export const Container = styled.div`
    position: relative;

    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: flex-start;

    ${USE_FULL_AREA}
    ${LIST_SCROLLBAR}
`;
/*======================================*/
/*======================================*/
export const Top = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;

    background: ${({ theme }) => theme.color.bg.main_4};
    padding: ${sizes.spacing.app};
    width: 100%;
`;
/*======================================*/
/*======================================*/
export const Total = styled.span`
    position: absolute;
    top: ${sizes.spacing.app};
    right: ${sizes.spacing.app};

    font-family: 'Roboto', sans-serif;
    font-size: 0.7rem;
    font-weight: 400;
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
export const SearchButton = styled.div``;
/*======================================*/
/*======================================*/
export const Bottom = styled.div`
    background: ${({ theme }) => theme.color.bg.main_2};
    padding: ${sizes.spacing.app};
    width: 100%;
    height: 100%;
`;
/*======================================*/
/*======================================*/
