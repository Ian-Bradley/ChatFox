import styled from 'styled-components';
import {
    APP_HEIGHT_NAV,
    APP_SPACING,
    TITLE_FONT_SIZE,
    TITLE_FONT_WEIGHT,
} from '../../styles/constants.js';
/*======================================*/
export const NavContainer = styled.div`
    position: relative;
    width: 100%;
    height: ${APP_HEIGHT_NAV};
`;
/*======================================*/
export const NavTitleContainer = styled.div`
    position: fixed;
    top: ${APP_SPACING};
    left: ${APP_SPACING};

    display: flex;
    flex-flow: row nowrap;
    justify-content: center;

    width: 100%;
`;
/*======================================*/
export const NavTitle = styled.span`
    font-size: ${TITLE_FONT_SIZE};
    font-weight: ${TITLE_FONT_WEIGHT};
`;
/*======================================*/
export const Nav = styled.nav`
    position: fixed;
    top: ${APP_SPACING};
    right: ${APP_SPACING};

    padding: 0;
    margin: 0;
`;
/*======================================*/