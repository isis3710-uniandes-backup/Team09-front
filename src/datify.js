function pad2(n) {  // always returns a string
    return (n < 10 ? '0' : '') + n;
}
module.exports={
    getDate: function getDate() {
        d = new Date();
        var yyyy = d.getFullYear().toString();
        var MM = pad2(d.getMonth() + 1);
        var dd = pad2(d.getDate());
        var hh = pad2(d.getHours());
        var mm = pad2(d.getMinutes());
        var ss = pad2(d.getSeconds());
        return `${yyyy}-${MM}-${dd}` + " " + `${hh}:${mm}:${ss}`;
    }
}

