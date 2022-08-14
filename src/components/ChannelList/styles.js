import styled from 'styled-components';
import { STYLE_LIST_SCROLLBAR } from '../../styles/common.js';
import { APP_SPACING } from '../../styles/constants.js';
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

    ${STYLE_LIST_SCROLLBAR}
`;
/*======================================*/
/*======================================*/
export const Top = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;

    background: ${({ theme }) => theme.color.bg.main_4};
    padding: ${APP_SPACING};
    width: 100%;
`;
/*======================================*/
/*======================================*/
export const Bottom = styled.div`
    background: ${({ theme }) => theme.color.bg.main_2};
    padding: ${APP_SPACING};
    width: 100%;
    height: 100%;
`;
/*======================================*/
/*======================================*/
export const Search = styled.div`
    position: absolute;
    bottom: ${APP_SPACING};
    right: ${APP_SPACING};
`;
/*======================================*/
/*======================================*/
export const SearchButton = styled.button`
    
`;
/*======================================*/
/*======================================*/
