class User {
    constructor(name, last_name) {
        this.name = name
        this.last_name = last_name
        this.books = []
        this.pets = []
    }

    getFullName() {
        return `Nombre completo: ${this.name} ${this.last_name}`
    }

    addPet(new_pet) {
        this.pets.push(new_pet)
    }

    countPets() {
        return this.pets.length
    }

    addBook(book_name, author) {
        this.books.push({
                            name: book_name,
                            author: author
                        })
    }

    getBooksNames() {
        let books_names = ''
        for(const book of this.books){
            if (this.books.indexOf(book) != 0){
                books_names += ', '
            }
            books_names += book.name
        }

        return books_names
    }
}

(function () {
    console.warn('Program Starting')

    const user = new User('Damian', 'Lorenzo')
    console.log(user.getFullName())
    
    user.addPet('Perro')
    user.addPet('Gato')
    console.log(user.countPets())

    user.addBook('Harry Potter y la piedra filosofal', 'J. K. Rowlling')
    user.addBook('Harry Potter y la camara de los secretos', 'J. K. Rowlling')
    console.log(user.getBooksNames())
    
    console.warn('Program finished')
}) ()