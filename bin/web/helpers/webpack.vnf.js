const fs = require('fs');
module.exports = {
    listPage : () => {
        const directoryPage = __dirname + '/../../../pages';
        let data= [];
        let list = fs.readdirSync(directoryPage);
        if(list.length < 1) {
            return data;
        }
        return list;
    },
    listPageNeedBuild : () => {
        const directoryPage = __dirname + '/../../../platforms/web/tmp/pages/';
        let data= {};
        let list = fs.readdirSync(directoryPage);
        if(list.length < 1) {
            return data;
        }
        for(let i=0;i<list.length;i++){
            if(list[i].includes("ts")) {
                let key = list[i].toString().replaceAll('.ts','').replaceAll('-','_');
                data[key] = './platforms/web/tmp/pages/' + list[i];
            }
            if((i+1) === list.length) {
                return data;
            }
        }
    }
}