class Usuario {

    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }
    addMascota(a){
        this.mascotas.push(a);
    }
    countMascotas(){
        return this.mascotas.length;
    }
    addBook(a,b){
        this.libros.push({nombre: a, autor: b});
    }
    getBookNames(){

       const nomLib = [];
        for(let libro of this.libros){
            nomLib.push(libro.nombre);
        };
        return nomLib;
    }
}

let usuario1 = new Usuario("Pedro", "Lopez", [{nombre: "El señor de los anillos", autor: "J R R Tolkin"}, {nombre: "Starship Troppers", autor: "Robert R Heinlein"}], ["boa", "canario"]);

console.log(usuario1.getFullName());
usuario1.addMascota("gato");
console.log(usuario1.countMascotas());
usuario1.addBook("1984", "George Orwell");
console.log(usuario1.getBookNames());