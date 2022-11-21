import "bootstrap/dist/css/bootstrap.min.css"
import { useMemo } from "react"
import { Container } from "react-bootstrap"
import { Routes, Route, Navigate } from "react-router-dom"
import { NewNote } from "./NewNote"
import useLocalStorage from "./useLocalStorage"
import { v4 as uuidv4 } from 'uuid';
import { NoteList } from "./NoteList"
import { NoteLayout } from "./NoteLayout"
import { Note } from "./Note"
import { EditNote } from "./EditNote"
export type RawNote = {
  id: string

} & RawNoteData
export type RawNoteData = {
  title: string,
  markdown: string,
  tagIds: string[]
}
export type Note = {
  id: string
} & NoteData
export type NoteData = {
  title: string,
  markdown: string,
  tags: Tag[]
}
export type Tag = {
  id: string,
  label: string
}
function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prevNote => {
      return [...prevNote, { ...data, id: uuidv4(), tagIds: tags.map(tag => tag.id) }]
    })
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  function updateTag(id: string, label: string) {
    setTags(prev => {
      return prev.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }
  function deleteTag(id: string) {
    setTags(prev => {
      return prev.filter(tag => tag.id !== id)
    })
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes(prevNote => {
      return prevNote.map(note => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
        } else {
          return note
        }
      })
      // return [...prevNote, { ...data, id: uuidv4(), tagIds: tags.map(tag => tag.id) }]
    })
  }

  function deleteNote(id: string) {
    setNotes(prev => {
      return prev.filter(note => note.id !== id)
    })
  }
  return (
    <Container className="my-4">

      <Routes>

        <Route path="/" element={<NoteList
          onUpdateTag={updateTag} onDeleteTag={deleteTag}

          notes={notesWithTags} availableTags={tags} />} />

        <Route path="/new"
          element={<NewNote onSubmit={onCreateNote}
            onAddTag={addTag} availableTag={tags} />} />

        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>

          <Route index element={<Note onDeleteNote={deleteNote} />} />
          <Route path="edit" element={<EditNote
            onSubmit={onUpdateNote}
            onAddTag={addTag} availableTag={tags}
          />} />

        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App
