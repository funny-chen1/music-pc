import Vue from 'vue'

Vue.filter('add', function(value) {
    return value + 'filter';
})

Vue.filter('formatTime', function(value) {
    let time = new Date(parseInt(value));
    let y = time.getFullYear();
    let m = time.getMonth() + 1;
    if(m < 10) { 
        m = '0' + m
    }
    let d = time.getDate();
    if (d < 10) {
        d = '0' + d;
    }
    return y + "-" + m + "-" + d
})