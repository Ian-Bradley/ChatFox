import styled from 'styled-components';
import {
    APP_BG_MAIN_2,
    CHATBAR_WIDTH,
    CHATBAR_COLOR,
    CHATBAR_COLOR_BG,
    CHATBAR_BORDER,
    CHATBAR_BORDER_RADIUS,
    CHATBAR_FONT_SIZE,
    CHATBAR_FONT_WEIGHT,
    CHATBAR_LINE_HEIGHT,
    CHATBAR_PADDING,
} from '../../styles/constants.js';
/*======================================*/
export const ChatBarContainer = styled.div`
    width: 100%;
    height: ${APP_HEIGHT_CHATBAR};

    background: ${APP_BG_MAIN_2};
`;
/*======================================*/
export const ChatBarInputContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;

    width: ${CHATBAR_WIDTH};
    height: 100%;
`;
/*======================================*/
export const ChatBarInput = styled.input`
    width: 100%;

    color: ${CHATBAR_COLOR};
    background-color: ${CHATBAR_COLOR_BG};

    border: ${CHATBAR_BORDER};
    border-radius: ${CHATBAR_BORDER_RADIUS};

    font-size: ${CHATBAR_FONT_SIZE};
    font-weight: ${CHATBAR_FONT_WEIGHT};

    line-height: ${CHATBAR_LINE_HEIGHT};
    padding: ${CHATBAR_PADDING};
`;
/*======================================*/
