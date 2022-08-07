import * as C from './constants.js';
export const elper = {

    isTooDark: function ( hexStr )
    {
        let c = hexStr.substring(1); // strip #
        let rgb = parseInt(c, 16);   // convert rrggbb to decimal
        let r = (rgb >> 16) & 0xff;  // extract red
        let g = (rgb >>  8) & 0xff;  // extract green
        let b = (rgb >>  0) & 0xff;  // extract blue
        let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
        if(luma < 50)
        {return true;} // is too dark
        else
        {return false;} // is light enough
    },

    generateRandomColor: function ()
    {
        let randomColor = '#';
        let hexCharacters = '0123456789ABCDEF';
        for(let i = 0; i < 6; i++)
        {randomColor += hexCharacters.charAt(Math.floor(Math.random() * hexCharacters.length));}
        if(this.isTooDark(randomColor))
        {return this.generateRandomColor();}
        else
        {return randomColor;}
    },

    generateRandomName: function ( withNumbers )
    {
        let randomName = ''
        let randomNumber = '';
        let numbers = '0123456789';
        if(withNumbers) {
        randomNumber += '-';
        for (let i = 0; i < 7; i++)
        {randomNumber += numbers.charAt(Math.floor(Math.random() * numbers.length));} }
        randomName += C.onst.lotrNames[(Math.floor(Math.random() * C.onst.lotrNames.length))];
        return (randomName + randomNumber);
    },
}