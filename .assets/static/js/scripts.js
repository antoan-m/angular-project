window.onscroll = function() {
    if (document.body.scrollTop > 158 || document.documentElement.scrollTop > 158) {
        document.getElementById("header").style.top = "-158px";
        document.getElementById("header-sticky").style.display = "block";
        document.getElementById("header-sticky").style.top = "0px";
        document.getElementById("body").style.margin = "0";
    } else {
        document.getElementById("header").style.top = "0px";
        //document.getElementById("header-sticky").style.display = "none";
        document.getElementById("header-sticky").style.top = "-50px";
        document.getElementById("body").style.margin = "158px 0 0 0";
    }
}


// var prevScrollpos = window.pageYOffset;
// window.onscroll = function() {
//     var currentScrollPos = window.pageYOffset;
//     if (prevScrollpos > currentScrollPos) {
//         document.getElementById("header").style.top = "0px";
//         document.getElementById("header-sticky").style.display = "none";
//     } else {
//         document.getElementById("header").style.top = "-158px";
//         document.getElementById("header-sticky").style.display = "block";
//     }
//     prevScrollpos = currentScrollPos;
// }