import styled from 'styled-components';
import sizes, { STYLE_LIST_SCROLLBAR } from '../../styles/common.js';
/*======================================*/
/*======================================*/
export const Container = styled.div`
    display: flex;
    flex-flow: column-reverse nowrap;
    align-items: flex-start;
    justify-content: initial;

    width: 100%;
    height: ${sizes.height.messages};

    ${STYLE_LIST_SCROLLBAR}
`;
/*======================================*/
/*======================================*/
