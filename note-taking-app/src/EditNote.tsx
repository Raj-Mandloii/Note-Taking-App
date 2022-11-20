import React from 'react'

import { NoteData, Tag } from './App'
import { NoteForm } from './NoteForm'
import { useNote } from './NoteLayout'
type EditNoteProps = {
    onSubmit :(id:string,data:NoteData) => void
    onAddTag : (tag:Tag) => void
    availableTag : Tag[]
}
export const EditNote = ({onSubmit,onAddTag,availableTag}:EditNoteProps) => {
    const note = useNote();
  return (
    <>
    <h1>Edit Note</h1>
    <NoteForm 
    title={note.title}
    markdown={note.markdown}
    tags={note.tags}
    onSubmit={data => onSubmit(note.id,data)} 
    onAddTag={onAddTag} availableTags={availableTag}/>
    </>
  )
}