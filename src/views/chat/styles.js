import { sizes, USE_FULL_AREA } from 'Styles/common.js';
import styled from 'styled-components';
/*======================================*/
/*======================================*/
export const Body = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    ${USE_FULL_AREA}
`;
/*======================================*/
/*======================================*/
export const Chat = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    ${USE_FULL_AREA}
`;
/*======================================*/
/*======================================*/
export const Sidebar = styled.div`
    width: ${sizes.width.sidebar};
    height: 100%;

    background: ${({ theme }) => theme.bg.main_2};
`;
/*======================================*/
/*======================================*/
