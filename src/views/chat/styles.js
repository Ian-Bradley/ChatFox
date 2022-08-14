import styled from 'styled-components';
import { FULL_SIZE } from '../../styles/common.js';
import { APP_WIDTH_SIDEBAR, APP_HEIGHT_NAV } from '../../styles/constants.js';
/*======================================*/
/*======================================*/
export const ContainerNav = styled.div`
    width: 100%;
    height: ${APP_HEIGHT_NAV};
`;
/*======================================*/
/*======================================*/
export const ContainerBody = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    ${FULL_SIZE}
`;
/*======================================*/
/*======================================*/
export const ContainerChat = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    ${FULL_SIZE}
`;
/*======================================*/
/*======================================*/
export const ContainerSidebar = styled.div`
    width: ${APP_WIDTH_SIDEBAR};
    height: 100%;

    background: ${({ theme }) => theme.color.bg.main_2};
`;
/*======================================*/
/*======================================*/
