/*======================================
    BLOCK: GENERAL SIZING
========================================*/

export const sizes = {
    spacing: {
        app: '0.4rem',
        lists: '0.2rem',
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

/*======================================
    BLOCK: TRANSITIONS
========================================*/

export const transition = {
    fade: '200ms',
    transform: '200ms',
    hover: '200ms',
};

/*======================================
    BLOCK: COMMON STYLES
========================================*/

export const SIMPLE_BAR_STYLES = {
    padding: sizes.spacing.app,
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
};

export const FLEX_CENTER_COL = `
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
`;

export const FLEX_CENTER_ROW = `
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
`;

export const USE_FULL_AREA = `
    width: 100%;
    height: 100%;
    overflow: hidden;
`;
