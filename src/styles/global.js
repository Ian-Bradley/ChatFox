import { createGlobalStyle } from 'styled-components';
import fonts from 'Assets/fonts/fonts.js';

const GlobalStyles = createGlobalStyle`
    ${fonts}
    
    * {
        box-sizing: border-box;
    }

    body {
        & h1, & h2, & h3, & h4, & h5, & h6, & h7 {
            font-family: 'SpaceAge', sans-serif;
        }

        & button {
            font-family: 'Roboto', sans-serif;
        }

        font-family: 'Ubuntu', sans-serif;
        font-size: 14px;
        font-weight: 400;

        color: ${({ theme }) => theme.text.light};
        background: ${({ theme }) => theme.bg.main_1};
    
        & a {
            color: ${({ theme }) => theme.text.link};

            &:hover {
                color: ${({ theme }) => theme.text.link_hover};
            }
        }
    }
`;
export default GlobalStyles;
