/**
 * Setting a cookie with expiry time.
 *
 * @param cname
 * @param cvalue
 * @param ext
 */
export const setCookie = (cname, cvalue, ext) => {
    var d = new Date();
    d.setTime(d.getTime() + (ext));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

/**
 * Deleting a cookie by name.
 *
 * @param cname
 */
export const deleteCookie = (cname) => {
    document.cookie = cname + "=" + '';
};

/**
 * Getting a cookie by name.
 * @param cname
 * @returns {string}
 */
export const getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};
