/*======================================
    BLOCK: APP GENERAL SIZING
========================================*/

const sizes = {
    spacing: {
        app: '6px',
        lists: '3px',
    },

    width: {
        sidebar: '325px',
    },

    height: {
        nav: '80px',
        chatbar: '60px',
        messages: 'calc(100% - 60px)',
    },
};
export default sizes;

/*======================================
    BLOCK: COMMON STYLES
========================================*/

export const STYLE_LIST_SCROLLBAR = `
    overflow-y: scroll;
    overflow-x: hidden;
    box-sizing: content-box;
    padding-right: 17px;
`;

export const FLEX_CENTER = `
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
`;

export const USE_FULL_AREA = `
    width: 100%;
    height: 100%;
    overflow: hidden;
`;
