import styled from 'styled-components';
const Button = styled.button`
    font-size: 1.1rem;

    outline: none;
    border: none;

    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;

    color: ${({ theme }) => theme.color.button.text};
    background: ${({ theme }) => theme.color.button.bg};

    &:hover {
        background: ${({ theme }) => theme.color.button.bg_hover};
    }

`;
export default Button;
// ${props => props.primary ? "white" : "palevioletred"};
