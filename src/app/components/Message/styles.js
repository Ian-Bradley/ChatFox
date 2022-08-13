import styled from 'styled-components';
import {
    MESSAGE_PADDING,
    MESSAGE_FONT_SIZE,
    MESSAGE_FONT_WEIGHT,
    MESSAGE_SPACING,
    MESSAGE_TIME_FONT_SIZE,
    USER_NAME_FONT_WEIGHT,
} from '../../../styles/constants.js';
/*======================================*/
/*======================================*/
export const Container = styled.div`
    padding: ${MESSAGE_PADDING};
    width: 100%;
`;
/*======================================*/
/*======================================*/
export const Div = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;

    white-space: nowrap;
    font-size: ${MESSAGE_FONT_SIZE};
    font-weight: ${MESSAGE_FONT_WEIGHT};

    & span {
        margin-right: ${MESSAGE_SPACING};
    }
`;
/*======================================*/
/*======================================*/
export const Time = styled.span`
    font-size: ${MESSAGE_TIME_FONT_SIZE};
    font-style: normal;
`;
/*======================================*/
/*======================================*/
export const Name = styled.span`
    font-weight: ${USER_NAME_FONT_WEIGHT};
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;
/*======================================*/
/*======================================*/
export const Content = styled.span`
    word-break: break-word;
    white-space: normal;
`;
/*======================================*/
/*======================================*/
