import styled from 'styled-components';
import { FULL_SIZE, FLEX_CENTER, STYLE_LIST_SCROLLBAR } from '../../styles/common.js';
import {
    APP_SPACING,
    AUTH_FORM_WIDTH,
    AUTH_FORM_SPACING,
    AUTH_FORM_BORDER,
    AUTH_FORM_BORDER_RADIUS,
    AUTH_LOGO_WIDTH,
    AUTH_LOGO_HEIGHT,
    AUTH_TITLE_FONT_SIZE,
    AUTH_TITLE_FONT_WEIGHT,
    AUTH_INPUT_BORDER,
    AUTH_INPUT_SPACING,
} from '../../styles/constants.js';
/*======================================*/
/*======================================*/
export const Container = styled.div`
    background: ${({ theme }) => theme.color.bg.main_1};
    ${FULL_SIZE}
    ${FLEX_CENTER}
`;
/*======================================*/
/*======================================*/
export const FormContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;

    width: ${AUTH_FORM_WIDTH};
    height: auto;
    padding: ${AUTH_FORM_SPACING} ${APP_SPACING};

    background: ${({ theme }) => theme.color.bg.main_2};
    border: ${AUTH_FORM_BORDER} ${({ theme }) => theme.color.border.highlight};
    border-radius: ${AUTH_FORM_BORDER_RADIUS};
`;
// ${STYLE_LIST_SCROLLBAR}
/*======================================*/
/*======================================*/
export const Form = styled.form`
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    padding: ${APP_SPACING};
    ${FULL_SIZE}
`;
/*======================================*/
/*======================================*/
export const ImageContainer = styled.div`
    width: 100%;
    ${FLEX_CENTER}
`;
/*======================================*/
/*======================================*/
export const Image = styled.img`
    width: ${AUTH_LOGO_WIDTH};
    height: ${AUTH_LOGO_HEIGHT};
`;
/*======================================*/
/*======================================*/
export const TitleContainer = styled.div`
    width: 100%;
    height: auto;
    padding: ${APP_SPACING};
    ${FLEX_CENTER}
`;
/*======================================*/
/*======================================*/
export const Title = styled.span`
    font-size: ${AUTH_TITLE_FONT_SIZE};
    font-weight: ${AUTH_TITLE_FONT_WEIGHT};
`;
/*======================================*/
/*======================================*/
export const InputContainer = styled.label`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justifty-content: center;
`;
/*======================================*/
/*======================================*/
export const Input = styled.input`
    background: none;
    outline: none;
    border: none;
    border-bottom: ${AUTH_INPUT_BORDER} ${({ theme }) => theme.color.text.light};
    margin-bottom: ${APP_SPACING};
`;
/*======================================*/
/*======================================*/
export const RememberContainer = styled.label`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justifty-content: center;
`;
/*======================================*/
/*======================================*/
export const Label = styled.label`
    padding-left: ${APP_SPACING};
`;
/*======================================*/
/*======================================*/
export const Checbox = styled.input``;
/*======================================*/
/*======================================*/
