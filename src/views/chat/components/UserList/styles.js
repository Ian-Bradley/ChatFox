import styled from 'styled-components';
import { sizes, transition } from 'Styles/common.js';
/*======================================*/
/*======================================*/
export const Header = styled.div`
    width: 100%;
    z-index: 20;
    font-family: 'Roboto', sans-serif;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;

    background: ${({ theme }) => theme.bg.main_4};
    padding: ${sizes.spacing.app};
`;
/*======================================*/
/*======================================*/
export const OpenSearch = styled.span`
    position: absolute;
    left: ${sizes.spacing.app};
    width: 15px;
`;
/*======================================*/
/*======================================*/
export const UserTotal = styled.span`
    position: absolute;
    right: ${sizes.spacing.app};

    font-size: 0.7rem;
    font-weight: 400;
`;
/*======================================*/
/*======================================*/
export const SearchBar = styled.div`
    position: relative;
    z-index: 10;

    width: 100%;
    height: 40px;

    padding: ${sizes.spacing.app};
    background: ${({ theme }) => theme.bg.main_4};

    transition: all linear ${transition.transform};
    transform: translateY(${(props) => (props.open ? 0 : '-100%')});
`;
/*======================================*/
/*======================================*/
export const SearchInput = styled.input`
    width: 100%;

    color: ${({ theme }) => theme.input.text};
    background: ${({ theme }) => theme.input.bg};

    outline: none;
    border-radius: 4px;
    border: 1px solid rgba(0,0,0,0);
    &:focus {
        border: 1px solid ${({ theme }) => theme.input.outline};
    }

    line-height: 1rem;
    padding: 0.2rem 0.6rem;
    margin: 0;
`;
/*======================================*/
/*======================================*/
export const List = styled.div`
    width: 100%;
    height: 100%;

    margin-top: ${(props) => (props.open ? '0' : '-40px')};
    transition: margin linear ${transition.transform};
`;
/*======================================*/
/*======================================*/