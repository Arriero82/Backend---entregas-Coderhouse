const { log } = require('console');
const {promises:fs} = require('fs');

class Contenedor{
    constructor(path, title, price, thumbnail){
        this.path = path;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
    
    async save(obj){
        let objs = await this.getAll();
        if(objs.length !== 0){
            let data = [...objs, {...obj, id: objs[objs.length-1].id + 1} ]
            await fs.writeFile(this.path, JSON.stringify(data))
            return console.log(`ID assigned:  ${data[data.length-1].id}`);
        }else{
            let data = [{...obj, id: 1}]
            await fs.writeFile(this.path, JSON.stringify(data))
            return console.log(`ID assigned:  ${data[data.length-1].id}`);
        }
    }

    async getById(id){
        let objs = await this.getAll();
        let obj = objs.filter(obj => obj.id == id);
        if(obj.length==0){
            return `No se puede obtener el dato con el id: ${id}`;
        }
        return obj;
    }

    async getAll(){
        try {       
            const objs = await fs.readFile(this.path)
            return JSON.parse(objs)
        } catch (error) {
            return []
        }
    }

    async edit(obj){
        let objs = await this.getAll();
        let index = objs.findIndex(o => o.id == obj.id);
        objs[index] = obj;
        try {
            await fs.writeFile(this.path, JSON.stringify(objs, null, 2));
        } catch (error) {
            
        }
    }

    async deleteById(id){
        let objs = await this.getAll();
        let obj = objs.filter(o => o.id != id);        
        try {
            await fs.writeFile(this.path, JSON.stringify(obj, null, 2));
        } catch (error) {
            return `No se puede borrar ese registro`
        }
    }

    async deleteAll(){
        try {
            await fs.writeFile(this.ruta, JSON.stringify([]),null,2);
        } catch (error) {
            return `No se pudieron guardar los datos`
        }
    }

}

//let productos = new Contenedor('./productos.txt');
productos.save({title: 'Corolla', price: 50000, thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_708035-MLA50207047549_062022-O.webp'});
//productos.save({title: 'Corolla Cross', price: 70000, thumbnail: 'https://http2.mlstatic.com/D_NQ_NP_957568-MLA50275538933_062022-O.webp'});


/* productos.getAll()
.then((data) => console.log(data))
.catch((error) => console.log(error)) */

/* productos.getById(3)
.then((data) => console.log(data))
.catch((error) => console.log(error)) */

/* productos.deleteById(3)
.then((data) => console.log(data))
.catch((error) => console.log(error)) */


/* productos.edit({
    "id": 1,
    "title": "Nissan Crosses",
    "price": 70000,
    "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_957568-MLA50275538933_062022-O.webp"
})
.then((data) => console.log(data))
.catch((error) => console.log(error)) */