/*======================================
    BLOCK: SIZING
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

    border: {
        modal: '15px',
    },
};

/*======================================
    BLOCK: TRANSITIONS
========================================*/

export const transition = {
    fast: '100ms',
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