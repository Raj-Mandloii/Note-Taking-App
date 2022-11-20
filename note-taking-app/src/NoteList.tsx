import React, { useMemo, useState } from 'react'
import { Form, Stack, Row, Col, Button, Card, Badge } from "react-bootstrap";
import { Link } from 'react-router-dom';
import ReactSelect from "react-select"
import { Note, Tag } from './App';
import styles from "./NoteList.module.css"
type NoteListProp = {
    availableTags: Tag[]
    notes: SimpleNote[]
}

type SimpleNote = {
    tags: Tag[]
    title: string
    id: string
}
export const NoteList = ({ availableTags, notes }: NoteListProp) => {
    const [selectedTag, setSelectedTag] = useState<Tag[]>([]);
    const [title, setTitle] = useState("")

    const filterNotes = useMemo(() => {
        return notes.filter(note => {
            return (title === "" ||
                note.title.toLowerCase().includes(title.toLowerCase())) &&
                (selectedTag.length == 0
                    || selectedTag.every(tag =>
                        note.tags.some(noteTag => noteTag.id === tag.id)))
        })
    }, [title, selectedTag, notes])
    return (
        <>
            <Row className='align-items-center mb-4'>
                <Col>
                    <h1>Notes</h1>
                </Col>
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal">

                        <Link to="/new">
                            <Button variant='primary'>Create</Button>
                        </Link>
                        <Button variant='outline-secondary'>Edit Tags</Button>

                    </Stack>
                </Col>
            </Row>
            <Form>
                <Row className="mb-4">
                    <Col>
                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control value={title}
                                onChange={e => setTitle(e.target.value)}
                                type="text"></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <ReactSelect


                                value={selectedTag.map(tag => {
                                    return {
                                        label: tag.label,
                                        value: tag.id
                                    }
                                })}
                                options={availableTags.map(tag => {
                                    return { label: tag.label, value: tag.id }
                                })}
                                onChange={tags => {
                                    setSelectedTag(tags.map(tag => {
                                        return {
                                            label: tag.label,
                                            id: tag.value
                                        }
                                    }))
                                }}
                                isMulti />

                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Row xs={1} sm={2} lg={3} xl={4} className={"g-3"}>
                {filterNotes.map(note => (
                    <Col key={note.id}>
                        <NoteCard id={note.id}
                            title={note.title}
                            tags={note.tags}

                        />
                    </Col>
                ))}
            </Row>
        </>
    )
}


function NoteCard({ id, title, tags }: SimpleNote) {
    return <Card as={Link} to={`/${id}`}
        className={`h-100 text-reset text-decoration-none ${styles.card}`}>
        <Card.Body>
            <Stack gap={2} className="align-items-center justify-content-center h-100">
                <span className='fs-5'>{title}</span>
                {tags.length > 0 && (
                    <Stack gap={1}
                        direction="horizontal"
                        className='justify-content-center flex-wrap'>
                        {tags.map(tag => (
                            <Badge className='text-truncate' key={tag.id}>
                                {tag.label}
                            </Badge>
                        ))}
                    </Stack>
                )}
            </Stack>
        </Card.Body>
    </Card>
}