import React, { useState } from 'react'
import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import ReactSelect from "react-select"
import { Tag } from './App';

type NoteListProp = {
    availableTags: Tag[]
}

export const NoteList = ({ availableTags }: NoteListProp) => {
    const [selectedTag, setSelectedTag] = useState<Tag[]>([]);
    const [title,setTitle] = useState("")
    return (
        <>
            <Row>
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
                            onChange={e=>setTitle(e.target.value)}
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
        </>
    )
}
