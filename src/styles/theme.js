/*======================================
    BLOCK: COLORS
========================================*/
/*
 * The Sweetest Chill
 * #343635 (52,54,53)
 * #605aa0 (96,90,160)
 * #8c80c2 (140,128,194)
 * #c6a9e1 (198,169,225)
 * #e1ebe2 (225,235,226)
 * 
 * #665FD1 strobilaceous-dark-periwinkle
 * #8AB8FE subarachnoid-carolina-blue
 * #FFFF7E fixative-banana
 * 
 * #1B2431 blocky-dark
 * #1E488F ordained-cobalt
 * #016795 inhaling-peacock-blue
 * 
 * #062E03 battailous-very-dark-green 
 * #CB0162 sporocystic-deep-pink 
 * #FFFF14 dodgy-yellow 
 * 
 * #000000 divorced-black || #e1ebe2 (225,235,226)
 * #5684AE abstemious-off-blue
 * #C3FBF4 annihilating-duck-egg-blue
 */

/**
 * NOTE: Colors used in Loader/Spinner are not generated
 *       from these constants, and must be changed manually
 * 
 */

const THEME_MONO_BLACK = '#000000';
const THEME_MONO_DARK = '#343635';
const THEME_MONO_LIGHT = '#e1ebe2';
const THEME_MONO_WHITE = '#FFFFFF';

const THEME_DARK = '#605aa0';
const THEME_MEDIUM = '#8c80c2';
const THEME_LIGHT = '#c6a9e1';

const THEME_ERROR = '#ff3333';

const MODAL_BG = 'rgba(0,0,0, .1)';

const MATERIAL_1 = '#121212';
const MATERIAL_2 = '#1D1D1D';
const MATERIAL_3 = '#212121';
const MATERIAL_4 = '#242424';
const MATERIAL_5 = '#272727';
const MATERIAL_6 = '#2C2C2C';
const MATERIAL_7 = '#2D2D2D';
const MATERIAL_8 = '#323232';
const MATERIAL_9 = '#343434';

// material: 'rgba(255,255,255, .87)',
// material_dark: 'rgba(255,255,255, .60)',
// material_disabled: 'rgba(255,255,255, .38)',

/*======================================
    BLOCK: THEME
========================================*/

const theme = {
    text: {
        black: THEME_MONO_BLACK,
        white: THEME_MONO_WHITE,
        dark: THEME_MONO_DARK,
        light: THEME_MONO_LIGHT,
        link: THEME_DARK,
        link_hover: THEME_MEDIUM,
        error: THEME_ERROR,
    },
    border: {
        black: THEME_MONO_BLACK,
        white: THEME_MONO_WHITE,
        dark: THEME_MONO_DARK,
        light: THEME_MONO_LIGHT,
        highlight: THEME_DARK,
        error: THEME_ERROR,
    },
    bg: {
        error: THEME_ERROR,
        highlight: THEME_DARK,
        modal: MODAL_BG,
        main_1: MATERIAL_1,
        main_2: MATERIAL_2,
        main_3: MATERIAL_3,
        main_4: MATERIAL_4,
        main_5: MATERIAL_5,
        main_6: MATERIAL_6,
        main_7: MATERIAL_7,
        main_8: MATERIAL_8,
        main_9: MATERIAL_9,
    },
    button: {
        text: THEME_MONO_BLACK,
        bg: THEME_DARK,
        bg_hover: THEME_MEDIUM,
    },
    button_icon: {
        text: THEME_MONO_DARK,
        text_hover: THEME_MONO_LIGHT,
        bg: 'none',
        bg_hover: 'none',
    },
    menu: {
        text: THEME_MONO_LIGHT,
        text_hover: THEME_MONO_WHITE,
        bg: MATERIAL_6,
        bg_hover: THEME_MONO_DARK,
    },
    input: {
        text: THEME_MONO_LIGHT,
        outline: THEME_DARK,
        bg: THEME_MONO_DARK,
    },
    // input_checkbox: {

    // },
};
export default theme;
