import styled from 'styled-components';
import { sizes, LIST_SCROLLBAR } from 'Styles/common.js';
/*======================================*/
/*======================================*/
export const Container = styled.div`
    display: flex;
    flex-flow: column-reverse nowrap;
    align-items: flex-start;
    justify-content: initial;

    width: 100%;
    height: ${sizes.height.messages};

    ${LIST_SCROLLBAR}
`;
/*======================================*/
/*======================================*/
