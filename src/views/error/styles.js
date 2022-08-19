import styled from 'styled-components';
import { sizes, USE_FULL_AREA, FLEX_CENTER_COL, FLEX_CENTER_ROW } from '../../styles/common.js';
/*======================================*/
/*======================================*/
export const Container = styled.div`
    ${USE_FULL_AREA}
    ${FLEX_CENTER_COL}
`;
/*======================================*/
/*======================================*/
export const ErrorContainer = styled.div`
    width: 20%;
    height: 20%;

    background: ${({ theme }) => theme.color.bg.main_2};
`;
/*======================================*/
/*======================================*/
export const ImageContainer = styled.div`
    width: 100%;
`;
/*======================================*/
/*======================================*/
export const Image = styled.img`
    width: 150px;
    height: 150px;
`;
/*======================================*/
/*======================================*/
export const TitleContainer = styled.div`
    width: 100%;
    height: auto;

    padding: ${sizes.spacing.app};
    margin-bottom: 15px;

    ${FLEX_CENTER_ROW}
`;
/*======================================*/
/*======================================*/
export const Title = styled.h1`
    font-size: 3rem;
    font-weight: 600;
    margin: 0;
`;
/*======================================*/
/*======================================*/
export const Button = styled.button`
    width: 100%;
    height: 30px;

    outline: none;
    border: none;

    background: ${({ theme }) => theme.color.text.link};
    color: ${({ theme }) => theme.color.text.black};

    & a {
        color: ${({ theme }) => theme.color.text.black};
    }
`;
/*======================================*/
/*======================================*/
