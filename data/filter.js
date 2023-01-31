const fs = require('fs');

 function readfile(path) {
    try {
        return fs.readFileSync(path, 'utf8')
    } catch (err) {
        console.error(err);
    }
    return ''
}

 function readJSON(path) {
    return JSON.parse(readfile(path))
}

let data = readJSON('response.json');
data = data.data

const ret = Object.values(data).map(val => Object.assign({}, {image: val.image,tags: val.tags,name: val.name,title: val.title,blurb: val.blurb,info: val.info}))
fs.writeFileSync('processed.json', JSON.stringify(ret), {encoding: 'utf8'})
