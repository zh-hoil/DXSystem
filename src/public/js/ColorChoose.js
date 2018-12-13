export const getColor=function(type){
    switch (type) {
        case '应用方案':
            return '#20d7a7';
        case '功能特性':
            return '#29d9ff';
        case '最佳实践':
            return'#ff825a';
        case '竞争分析':
            return '#fa5b5b';
        case '培训课件':
            return '#ae77f3';
        case '移动app':
            return'#fdc42b';
        case '微信应用':
            return '#31d36e';
        default:
            return '#20d7a7';
    }
},