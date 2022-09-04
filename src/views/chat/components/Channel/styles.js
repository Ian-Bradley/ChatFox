import styled from 'styled-components';
import { sizes } from 'Styles/common.js';
/*======================================*/
/*======================================*/
export const Container = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;

    position: relative;
    width: 100%;
    padding: calc(${sizes.spacing.app} / 2);
    margin-bottom: ${sizes.spacing.lists};

    cursor: pointer;

    border-radius: ${sizes.spacing.app};
    &:hover {
        background: ${({ theme }) => theme.bg.main_5};
    }
    &:hover * {
        opacity: 1;
    }
`;
/*======================================*/
/*======================================*/
export const Icon = styled.span`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;

    width: 1rem;
    margin-right: 4px;
`;

/*======================================*/
/*======================================*/
export const Name = styled.span`
    font-size: 1rem;
    font-weight: 400;
`;
/*======================================*/
/*======================================*/
export const Lock = styled(Icon)`
    position: absolute;
    right: 0;
    opacity: 0;
`;
/*======================================*/
/*======================================*/
