import { sizes, transition, USE_FULL_AREA, FLEX_CENTER_COL, FLEX_CENTER_ROW } from '../../styles/common.js';
import styled from 'styled-components';
/*======================================*/
/*======================================*/
export const Container = styled.div`
    background: ${({ theme }) => theme.color.bg.main_1};
    ${USE_FULL_AREA}
    ${FLEX_CENTER_COL}
`;
/*======================================*/
/*======================================*/
export const FormContainer = styled.div`
    position: relative;

    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;

    width: 400px;
    height: auto;

    overflow: hidden;
    padding: 80px ${sizes.spacing.app};

    background: ${({ theme }) => theme.color.bg.main_2};
    border: ${props => props.borderWidth}px solid ${({ theme }) => theme.color.border.highlight};
    border-radius: 0;
`;
// border: 5px solid ${({ theme }) => theme.color.border.highlight};
/*======================================*/
/*======================================*/
export const Form = styled.form`
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;

    width: 60%;
    padding: 0;
`;
/*======================================*/
/*======================================*/
export const ImageContainer = styled.div`
    position: relative;
    width: 150px;
    height: 150px;
`;
/*======================================*/
/*======================================*/
export const Image = styled.img`
    position: absolute;
    top: 0;
    left: 0;

    pointer-events: none;
    -webkit-user-select: none;
    user-select: none;

    transition: transform linear ${transition.transform};
    transform: translateX(calc(300px * ${props => props.position}));
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
    font-family: 'Astradan', sans-serif;
    text-transform: uppercase;
    font-size: 3rem;
    font-weight: 600;
    margin: 0;
`;
/*======================================*/
/*======================================*/
export const Input = styled.input`
    width: 100%;
    height: 30px;

    padding: 0 ${sizes.spacing.app};
    margin-bottom: 12px;

    box-sizing: border-box;
    outline: none;
    border: none;

    background: ${({ theme }) => theme.color.text.light};
    color: ${({ theme }) => theme.color.text.dark};
`;
/*======================================*/
/*======================================*/
export const RememberContainer = styled.div`
    margin-bottom: 20px;
    ${FLEX_CENTER_ROW}
`;
/*======================================*/
/*======================================*/
export const Label = styled.label`
    padding-left: ${sizes.spacing.app};
`;
/*======================================*/
/*======================================*/
export const Checbox = styled.input``;
/*======================================*/
/*======================================*/
export const Swapper = styled.a`
    ${FLEX_CENTER_COL}
`;
/*======================================*/
/*======================================*/
/*======================================*/
/* FUN */
/*======================================*/
/*======================================*/
/*======================================*/
export const FunContainerLeft= styled.div`
    position: absolute;
    top: ${sizes.spacing.app};
    left: ${sizes.spacing.app};
    opacity: 0.1;
    transition: opacity linear ${transition.fade};

    &:hover {
        opacity: 1;
    }

    ${FLEX_CENTER_COL}
`;
/*======================================*/
/*======================================*/
export const FunContainerRight = styled.div`
    position: absolute;
    top: ${sizes.spacing.app};
    right: ${sizes.spacing.app};
    opacity: 0.1;
    transition: opacity linear ${transition.fade};

    &:hover {
        opacity: 1;
    }

    ${FLEX_CENTER_ROW}
`;
/*======================================*/
/*======================================*/