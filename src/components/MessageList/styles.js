import styled from 'styled-components';
import { STYLE_LIST_SCROLLBAR } from '../../styles/common.js';
import { APP_HEIGHT_MESSAGES } from '../../styles/constants.js';
/*======================================*/
/*======================================*/
export const Container = styled.div`
    display: flex;
    flex-flow: column-reverse nowrap;
    align-items: flex-start;
    justify-content: initial;

    width: 100%;
    height: ${APP_HEIGHT_MESSAGES};

    ${STYLE_LIST_SCROLLBAR}
`;
/*======================================*/
/*======================================*/
