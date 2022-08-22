import { sizes, USE_FULL_AREA } from 'Styles/common.js';
import styled from 'styled-components';
/*======================================*/
/*======================================*/
export const ContainerNav = styled.div`
    width: 100%;
    height: ${sizes.height.nav};

    position: relative;
    box-sizing: border-box;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;

    padding: 0 1rem;
    background: ${({ theme }) => theme.bg.main_3};
`;
/*======================================*/
/*======================================*/
export const ContainerBody = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    ${USE_FULL_AREA}
`;
/*======================================*/
/*======================================*/
export const ContainerChat = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    ${USE_FULL_AREA}
`;
/*======================================*/
/*======================================*/
export const ContainerSidebar = styled.div`
    width: ${sizes.width.sidebar};
    height: 100%;

    background: ${({ theme }) => theme.bg.main_2};
`;
/*======================================*/
/*======================================*/
