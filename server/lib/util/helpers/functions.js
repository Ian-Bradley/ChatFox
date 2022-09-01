const functions = {
    /*================================================*/
    /*================================================*/
    // FUNCTION: => shuffleArray
    // shuffleArray: function (arr) {
    //     let tmp,
    //         current,
    //         top = arr.length;
    //     if (top)
    //         while (--top) {
    //             current = Math.floor(Math.random() * (top + 1));
    //             tmp = arr[current];
    //             arr[current] = arr[top];
    //             arr[top] = tmp;
    //         }
    //     return arr;
    // },
    /*================================================*/
    /*================================================*/
    // FUNCTION: => parseCookies
    parseCookies: function (cookiesUnparsed) {
        let cookiesParsed = {};
        cookiesUnparsed.split(';').forEach(function (cookie) {
            let parts = cookie.match(/(.*?)=(.*)$/);
            let name = parts[1].trim();
            let value = (parts[2] || '').trim();
            cookiesParsed[name] = value;
        });
        return cookiesParsed;
    },
    /*================================================*/
    /*================================================*/
};
module.exports = functions;
