import Roboto100WOFF2 from './roboto/roboto-v30-latin-100.woff2';
import Roboto100WOFF from './roboto/roboto-v30-latin-100.woff';
import Roboto300WOFF2 from './roboto/roboto-v30-latin-300.woff2';
import Roboto300WOFF from './roboto/roboto-v30-latin-300.woff';
import Roboto400WOFF2 from './roboto/roboto-v30-latin-regular.woff2';
import Roboto400WOFF from './roboto/roboto-v30-latin-regular.woff';
import Roboto500WOFF2 from './roboto/roboto-v30-latin-500.woff2';
import Roboto500WOFF from './roboto/roboto-v30-latin-500.woff';
import Roboto700WOFF2 from './roboto/roboto-v30-latin-700.woff2';
import Roboto700WOFF from './roboto/roboto-v30-latin-700.woff';
import Roboto900WOFF2 from './roboto/roboto-v30-latin-900.woff2';
import Roboto900WOFF from './roboto/roboto-v30-latin-900.woff';

import Roboto100ItalicWOFF2 from './roboto/roboto-v30-latin-100italic.woff2';
import Roboto100ItalicWOFF from './roboto/roboto-v30-latin-100italic.woff';
import Roboto300ItalicWOFF2 from './roboto/roboto-v30-latin-300italic.woff2';
import Roboto300ItalicWOFF from './roboto/roboto-v30-latin-300italic.woff';
import Roboto400ItalicWOFF2 from './roboto/roboto-v30-latin-italic.woff2';
import Roboto400ItalicWOFF from './roboto/roboto-v30-latin-italic.woff';
import Roboto500ItalicWOFF2 from './roboto/roboto-v30-latin-500italic.woff2';
import Roboto500ItalicWOFF from './roboto/roboto-v30-latin-500italic.woff';
import Roboto700ItalicWOFF2 from './roboto/roboto-v30-latin-700italic.woff2';
import Roboto700ItalicWOFF from './roboto/roboto-v30-latin-700italic.woff';
import Roboto900ItalicWOFF2 from './roboto/roboto-v30-latin-900italic.woff2';
import Roboto900ItalicWOFF from './roboto/roboto-v30-latin-900italic.woff';

import Ubuntu300WOFF2 from './ubuntu/ubuntu-v20-latin-300.woff2';
import Ubuntu300WOFF from './ubuntu/ubuntu-v20-latin-300.woff';
import Ubuntu400WOFF2 from './ubuntu/ubuntu-v20-latin-regular.woff2';
import Ubuntu400WOFF from './ubuntu/ubuntu-v20-latin-regular.woff';
import Ubuntu500WOFF2 from './ubuntu/ubuntu-v20-latin-500.woff2';
import Ubuntu500WOFF from './ubuntu/ubuntu-v20-latin-500.woff';
import Ubuntu700WOFF2 from './ubuntu/ubuntu-v20-latin-700.woff2';
import Ubuntu700WOFF from './ubuntu/ubuntu-v20-latin-700.woff';

import Ubuntu300ItalicWOFF2 from './ubuntu/ubuntu-v20-latin-300italic.woff2';
import Ubuntu300ItalicWOFF from './ubuntu/ubuntu-v20-latin-300italic.woff';
import Ubuntu400ItalicWOFF2 from './ubuntu/ubuntu-v20-latin-italic.woff2';
import Ubuntu400ItalicWOFF from './ubuntu/ubuntu-v20-latin-italic.woff';
import Ubuntu500ItalicWOFF2 from './ubuntu/ubuntu-v20-latin-500italic.woff2';
import Ubuntu500ItalicWOFF from './ubuntu/ubuntu-v20-latin-500italic.woff';
import Ubuntu700ItalicWOFF2 from './ubuntu/ubuntu-v20-latin-700italic.woff2';
import Ubuntu700ItalicWOFF from './ubuntu/ubuntu-v20-latin-700italic.woff';

import AstradanBlackTTF from './fun/astrblk.woff2';

const fonts = `
    /* astradan-black */
    @font-face {
        font-family: 'Astradan';
        font-style: normal;
        font-weight: 400;
        src: url('${AstradanBlackTTF}') format('woff2');
    }

    /* roboto-100 */
    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 100;
        src: local(''),
            url('${Roboto100WOFF2}') format('woff2'),
            url('${Roboto100WOFF}') format('woff');
    }

    /* roboto-100italic */
    @font-face {
        font-family: 'Roboto';
        font-style: italic;
        font-weight: 100;
        src: local(''),
            url('${Roboto100ItalicWOFF2}') format('woff2'),
            url('${Roboto100ItalicWOFF}') format('woff');
    }

    /* roboto-300 */
    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 300;
        src: local(''),
            url('${Roboto300WOFF2}') format('woff2'),
            url('${Roboto300WOFF}') format('woff');
    }

    /* roboto-300italic */
    @font-face {
        font-family: 'Roboto';
        font-style: italic;
        font-weight: 300;
        src: local(''),
            url('${Roboto300ItalicWOFF2}') format('woff2'),
            url('${Roboto300ItalicWOFF}') format('woff');
    }

    /* roboto-regular */
    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        src: local(''),
            url('${Roboto400WOFF2}') format('woff2'),
            url('${Roboto400WOFF}') format('woff');
    }

    /* roboto-italic */
    @font-face {
        font-family: 'Roboto';
        font-style: italic;
        font-weight: 400;
        src: local(''),
            url('${Roboto400ItalicWOFF2}') format('woff2'),
            url('${Roboto400ItalicWOFF}') format('woff');
    }

    /* roboto-500 */
    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 500;
        src: local(''),
            url('${Roboto500WOFF2}') format('woff2'),
            url('${Roboto500WOFF}') format('woff');
    }

    /* roboto-500italic */
    @font-face {
        font-family: 'Roboto';
        font-style: italic;
        font-weight: 500;
        src: local(''),
            url('${Roboto500ItalicWOFF2}') format('woff2'),
            url('${Roboto500ItalicWOFF}') format('woff');
    }

    /* roboto-700 */
    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        src: local(''),
            url('${Roboto700WOFF2}') format('woff2'),
            url('${Roboto700WOFF}') format('woff');
    }

    /* roboto-700italic */
    @font-face {
        font-family: 'Roboto';
        font-style: italic;
        font-weight: 700;
        src: local(''),
            url('${Roboto700ItalicWOFF2}') format('woff2'),
            url('${Roboto700ItalicWOFF}') format('woff');
    }

    /* roboto-900 */
    @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 900;
        src: local(''),
            url('${Roboto900WOFF2}') format('woff2'),
            url('${Roboto900WOFF}') format('woff');
    }

    /* roboto-900italic */
    @font-face {
        font-family: 'Roboto';
        font-style: italic;
        font-weight: 900;
        src: local(''),
            url('${Roboto900ItalicWOFF2}') format('woff2'),
            url('${Roboto900ItalicWOFF}') format('woff');
    }

    /* ubuntu-300 */
    @font-face {
        font-family: 'Ubuntu';
        font-style: normal;
        font-weight: 300;
        src: local(''),
            url('${Ubuntu300WOFF2}') format('woff2'),
            url('${Ubuntu300WOFF}') format('woff');
    }
    
    /* ubuntu-300italic */
    @font-face {
        font-family: 'Ubuntu';
        font-style: italic;
        font-weight: 300;
        src: local(''),
            url('${Ubuntu300ItalicWOFF2}') format('woff2'),
            url('${Ubuntu300ItalicWOFF}') format('woff');
    }
    
    /* ubuntu-regular */
    @font-face {
        font-family: 'Ubuntu';
        font-style: normal;
        font-weight: 400;
        src: local(''),
            url('${Ubuntu400WOFF2}') format('woff2'),
            url('${Ubuntu400WOFF}') format('woff');
    }
    
    /* ubuntu-italic */
    @font-face {
        font-family: 'Ubuntu';
        font-style: italic;
        font-weight: 400;
        src: local(''),
            url('${Ubuntu400ItalicWOFF2}') format('woff2'),
            url('${Ubuntu400ItalicWOFF}') format('woff');
    }
    
    /* ubuntu-500 */
    @font-face {
        font-family: 'Ubuntu';
        font-style: normal;
        font-weight: 500;
        src: local(''),
            url('${Ubuntu500WOFF2}') format('woff2'),
            url('${Ubuntu500WOFF}') format('woff');
    }
    
    /* ubuntu-500italic */
    @font-face {
        font-family: 'Ubuntu';
        font-style: italic;
        font-weight: 500;
        src: local(''),
            url('${Ubuntu500ItalicWOFF2}') format('woff2'),
            url('${Ubuntu500ItalicWOFF}') format('woff');
    }
    
    /* ubuntu-700 */
    @font-face {
        font-family: 'Ubuntu';
        font-style: normal;
        font-weight: 700;
        src: local(''),
            url('${Ubuntu700WOFF2}') format('woff2'),
            url('${Ubuntu700WOFF}') format('woff');
    }
    
    /* ubuntu-700italic */
    @font-face {
        font-family: 'Ubuntu';
        font-style: italic;
        font-weight: 700;
        src: local(''),
            url('${Ubuntu700ItalicWOFF2}') format('woff2'),
            url('${Ubuntu700ItalicWOFF}') format('woff');
    }
`;
export default fonts;
