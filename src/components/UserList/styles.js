import styled from 'styled-components';
import {
    APP_BG_MAIN_2,
    APP_BG_MAIN_4,
    APP_SPACING,
    USER_TOTAL_FONT_SIZE,
    USER_TOTAL_FONT_WEIGHT,
} from '../styles/constants.js';
/*======================================*/
export const UserListContainer = styled.div`
    position: relative;

    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: flex-start;

    width: 100%;
    height: 100%;
    overflow-y: scroll;
`;
/*======================================*/
export const UserListTop = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;

    background: ${APP_BG_MAIN_4};
    padding: ${APP_SPACING};
    width: 100%;
`;
/*======================================*/
export const UserTotal = styled.span`
    position: absolute;
    top: ${APP_SPACING};
    right: ${APP_SPACING};

    font-size: ${USER_TOTAL_FONT_SIZE};
    font-weight: ${USER_TOTAL_FONT_WEIGHT};
`;
/*======================================*/
export const UserSearchButton = styled.div`
    position: absolute;
    bottom: ${APP_SPACING};
    right: ${APP_SPACING};
`;
/*======================================*/
export const UserListBottom = styled.div`
    background: ${APP_BG_MAIN_2};
    padding: ${APP_SPACING};
    width: 100%;
    height: 100%;
`;
/*======================================*/