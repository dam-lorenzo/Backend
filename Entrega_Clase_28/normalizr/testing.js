
function createMessage(count) {
    const messages = []
    const authors = {
                        1: {
                            id:         faker.internet.exampleEmail(),
                            name:       faker.name.firstName(),
                            lastName:   faker.name.lastName(),
                            age:        faker.datatype.number({max: 100}),
                            alias:      faker.random.word(),
                            avatar:     faker.image.avatar()
                        },
                        2: {
                            id:         faker.internet.exampleEmail(),
                            name:       faker.name.firstName(),
                            lastName:   faker.name.lastName(),
                            age:        faker.datatype.number({max: 100}),
                            alias:      faker.random.word(),
                            avatar:     faker.image.avatar()
                        }
                    }
    for (let i=0; i<count; i++) {
        let pos
        if ( 1%2 == 0) {
            pos = 2
        }
        else {
            pos = 1
        }
        print(pos)
        const item = {
            id: i,
            author: authors[pos],
            text: faker.lorem.text()
        }
        print(item)
        messages.push(item)
    }
    return messages
}

function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true))
  }


const messages_list = {id: '1', messages: createMessage(10)}

print('=============================================================================')

print(messages_list)

print('=============================================================================')

print(normalize(messages_list, final_model))