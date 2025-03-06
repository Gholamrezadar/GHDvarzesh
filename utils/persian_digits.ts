function convertToPersianDigits(number: number): string {
    var map =
        [
            "&\#1632;", "&\#1633;", "&\#1634;", "&\#1635;", "&\#1636;",
            "&\#1637;", "&\#1638;", "&\#1639;", "&\#1640;", "&\#1641;"
        ];

    function getArabicNumbers(str) {
        var newStr = "";

        str = String(str);

        for (let i = 0; i < str.length; i++) {
            newStr += map[parseInt(str.charAt(i))];
        }

        return newStr;
    }

    return number.toString();
    return getArabicNumbers(number);
}

export default convertToPersianDigits;