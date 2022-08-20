import { createGlobalStyle } from 'styled-components';
import fonts from '../assets/fonts/fonts.js';

const GlobalStyles = createGlobalStyle`
    ${fonts}
    body {
        font-family: 'Ubuntu', sans-serif;
        font-size: 14px;
        font-weight: 400;

        & button {
            font-family: 'Roboto', sans-serif;
        }
    
        & h1, & h2, & h3, & h4, & h5, & h6, & h7 {
            font-family: 'SpaceAge', sans-serif;
        }

        color: ${({ theme }) => theme.color.text.light};
        background: ${({ theme }) => theme.color.bg.main_1};
    
        & a {
            color: ${({ theme }) => theme.color.text.link};

            &:hover {
                color: ${({ theme }) => theme.color.text.link_hover};
            }
        }
    }
`;
export default GlobalStyles;