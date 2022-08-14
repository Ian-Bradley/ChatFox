import styled from 'styled-components';
import { FULL_SIZE, STYLE_LIST_SCROLLBAR } from '../../styles/common.js';
import {
    APP_SPACING,
    USER_TOTAL_FONT_SIZE,
    USER_TOTAL_FONT_WEIGHT,
} from '../../styles/constants.js';
/*======================================*/
/*======================================*/
export const Container = styled.div`
    position: relative;

    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: flex-start;

    ${FULL_SIZE}
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
export const Total = styled.span`
    position: absolute;
    top: ${APP_SPACING};
    right: ${APP_SPACING};

    font-family: ${({ theme }) => theme.font.subtitle};
    font-size: ${USER_TOTAL_FONT_SIZE};
    font-weight: ${USER_TOTAL_FONT_WEIGHT};
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
export const SearchButton = styled.div``;
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
