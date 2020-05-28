const fs = require('fs')
const chalk = require('chalk')

const addNotes = (title, body) => {
    const notes = loadNotes()
    // duplicateNotes contiendra toutes les note qui respecte la condition
    const duplicateNotes = notes.filter((note) => note.title === title )
    // recherche dans tous les éléments et retourne true si la condition est vérifié et false sinon
    const duplicateNote = note.find((note) => note.title === title)
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}

const readNotes = (title) => {
    const notes = loadNotes()
    // recherche dans tous les éléments et retourne true si la condition est vérifié et false sinon
    const duplicateNote = notes.find((note) => {
        if(note.title === title){
            console.log(note.body)
            return true
        }
    })
    if(!duplicateNote){
        console.log(chalk.red.bold('Note not found'))
    }
}

const removeNotes = (title) => {
    const notes = loadNotes()
    resultnotes = []
    // notes.filter pour parcourir les notes une par une
    const notesToKeep = notes.filter((note) => 
        note.title !== title
    )

    if(notesToKeep.length < notes.length){
        console.log(chalk.green.inverse('Note found'));
        saveNotes(notesToKeep)
    }else{
        console.log(chalk.red.inverse('No note found'));

    }
}

const listNotes = () => {
    console.log(chalk.green.inverse('Your Notes'))
    notes = loadNotes()
    notes.forEach((note) => {
        console.log(chalk.red.inverse(note.title))
    })
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}