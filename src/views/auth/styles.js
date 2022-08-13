import styled from 'styled-components';
import { FULL_SIZE, FLEX_CENTER, STYLE_LIST_SCROLLBAR } from '../../styles/common.js';
import {
    APP_SPACING,
    AUTH_FORM_WIDTH,
    AUTH_FORM_SPACING,
    AUTH_FORM_BORDER,
    AUTH_FORM_BORDER_RADIUS,
    AUTH_TITLE_FONT_SIZE,
    AUTH_TITLE_FONT_WEIGHT,
    AUTH_INPUT_BORDER,
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
    width: 150px;
    height: 150px;
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
export const Input = styled.input`
    background: none;
    outline: none;
    border: none;
    border-bottom: ${AUTH_INPUT_BORDER};
`;
/*======================================*/
/*======================================*/
export const Label = styled.label``;
/*======================================*/
/*======================================*/
export const Checbox = styled.input``;
/*======================================*/
/*======================================*/
