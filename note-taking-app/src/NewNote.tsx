import React from 'react'
import { NoteData, Tag } from './App'
import { NoteForm } from './NoteForm'
type NewNoteProps = {
    onSubmit :(data:NoteData) => void
    onAddTag : (tag:Tag) => void
    availableTag : Tag[]
}
export const NewNote = ({onSubmit,onAddTag,availableTag}:NewNoteProps) => {
  return (
    <>
    <h1>New Note</h1>
    <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTag}/>
    </>
  )
}
