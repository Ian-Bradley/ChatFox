import styled from 'styled-components';
import { sizes } from 'Styles/common.js';
/*======================================*/
/*======================================*/
export const Container = styled.div`
    position: relative;

    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: flex-start;

    width: 100%;
    height: 100%;
`;
/*======================================*/
/*======================================*/
export const Top = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;

    background: ${({ theme }) => theme.bg.main_4};
    padding: ${sizes.spacing.app};
    width: 100%;
`;
/*======================================*/
/*======================================*/