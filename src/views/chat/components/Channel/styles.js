import styled from 'styled-components';
import { sizes } from 'Styles/common.js';
/*======================================*/
/*======================================*/
export const Container = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;

    width: 100%;
    padding: ${sizes.spacing.app};
    margin-bottom: ${sizes.spacing.lists};

    cursor: pointer;

    border-radius: ${sizes.spacing.app};
    &:hover {
        background: ${({ theme }) => theme.bg.main_5};
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
