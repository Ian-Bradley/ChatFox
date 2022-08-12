import styled from 'styled-components';
import { FLEX_CENTER, STYLE_LIST_SCROLLBAR } from '../../styles/commons.js';
import {
    APP_SPACING,
    APP_BG_MAIN_1,
    AUTH_FORM_WIDTH,
    AUTH_FORM_HEIGHT,
    AUTH_FORM_BORDER,
    AUTH_FORM_BORDER_RADIUS,
    AUTH_TITLE_FONT_SIZE,
    AUTH_TITLE_FONT_WEIGHT,
} from '../../styles/constants.js';
/*======================================*/
/*======================================*/
export const AuthContainer = styled.div`
    width: 100%;
    height: 100%;
    background: ${APP_BG_MAIN_1};

    ${FLEX_CENTER}
`;
/*======================================*/
/*======================================*/
export const AuthFormContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;

    width: ${AUTH_FORM_WIDTH};
    height: ${AUTH_FORM_HEIGHT};

    border: ${AUTH_FORM_BORDER};
    border-radius: ${AUTH_FORM_BORDER_RADIUS};

    ${STYLE_LIST_SCROLLBAR}
`;
/*======================================*/
/*======================================*/
export const AuthForm = styled.form`
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;

    width: 100%;
    height: 100%

    padding: ${APP_SPACING};
`;
/*======================================*/
/*======================================*/
export const AuthImage = styled.img`

`;
/*======================================*/
/*======================================*/
export const AuthTitleContainer = styled.div`
    width: 100%;
    height: auto;
    padding: calc(2 * ${APP_SPACING});

    ${FLEX_CENTER}
`;
/*======================================*/
/*======================================*/
export const AuthTitle = styled.span`
    font-size: ${AUTH_TITLE_FONT_SIZE};
    font-weight: ${AUTH_TITLE_FONT_WEIGHT};
`;
/*======================================*/
/*======================================*/
export const AuthInput = styled.input`
`;
/*======================================*/
/*======================================*/
export const AuthLabel = styled.label`
`;
/*======================================*/
/*======================================*/
export const AuthChecbox = styled.input`
`;
/*======================================*/
/*======================================*/
