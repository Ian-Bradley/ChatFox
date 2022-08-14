import styled from 'styled-components';
import {
    CHATBAR_HEIGHT,
    CHATBAR_WIDTH,
    CHATBAR_BORDER,
    CHATBAR_BORDER_RADIUS,
    CHATBAR_LINE_HEIGHT,
    CHATBAR_PADDING,
} from '../../styles/constants.js';
/*======================================*/
/*======================================*/
export const Container = styled.div`
    width: 100%;
    height: ${CHATBAR_HEIGHT};

    background: ${({ theme }) => theme.color.bg.main_2};
`;
/*======================================*/
/*======================================*/
export const InputContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;

    width: ${CHATBAR_WIDTH};
    height: 100%;
`;
/*======================================*/
/*======================================*/
export const Input = styled.input`
    width: 100%;
    background-color: ${({ theme }) => theme.color.bg.main_2};

    border: ${CHATBAR_BORDER};
    border-radius: ${CHATBAR_BORDER_RADIUS};

    line-height: ${CHATBAR_LINE_HEIGHT};
    padding: ${CHATBAR_PADDING};
`;
/*======================================*/
/*======================================*/
