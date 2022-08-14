import { createGlobalStyle } from 'styled-components';

import OpenSansItalicWoff from './opensans/OpenSans-Italic-VariableFont_wdth,wght.woff';
import OpenSansItalicWoff2 from './opensans/OpenSans-Italic-VariableFont_wdth,wght.woff2';
import OpenSansWoff from './opensans/OpenSans-VariableFont_wdth,wght.woff';
import OpenSansWoff2 from './opensans/OpenSans-VariableFont_wdth,wght.woff2';

export const FontProvider = createGlobalStyle`
    @font-face {
        font-family: 'OpenSans';
        src: local('OpenSansWoff2'), local('OpenSansWoff'),
        url(${OpenSansWoff2}) format('woff2'),
        url(${OpenSansWoff}) format('woff');
        font-style: normal;
    }
    @font-face {
        font-family: 'OpenSansItalic';
        src: local('OpenSansItalicWoff2'), local('OpenSansItalicWoff'),
        url(${OpenSansItalicWoff2}) format('woff2'),
        url(${OpenSansItalicWoff}) format('woff');
        font-style: normal;
    }
`;
