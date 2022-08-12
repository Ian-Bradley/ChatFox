import styled from 'styled-components';
import { STYLE_LIST_SCROLLBAR } from '../../styles/commons.js';
import {
    APP_SPACING,
    APP_BG_MAIN_2,
    APP_BG_MAIN_4,
} from '../../styles/constants.js';
/*======================================*/
/*======================================*/
export const ChannelListContainer = styled.div`
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
export const ChannelTop = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;

    background: ${APP_BG_MAIN_4};
    padding: $app-spacing;
    width: 100%;
`;
/*======================================*/
/*======================================*/
export const ChannelBottom = styled.div`
    background: ${APP_BG_MAIN_2};
    padding: ${APP_SPACING};
    width: 100%;
    height: 100%;
`;
/*======================================*/
/*======================================*/
export const ChannelSearch = styled.div`
    position: absolute;
    bottom: ${APP_SPACING};
    right: ${APP_SPACING};
`;
/*======================================*/
/*======================================*/