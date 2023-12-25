import { useEffect, useState } from "react";
import utils from "../utils";
import Note from "./Note";
import './Notes.css';

const Notes = () => {

    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState({ id: "", title: "", x: Math.random() * 500, y: Math.random() * 500 });
    const [isLoading, setisLoading] = useState(true);
    const [saving, setSaving] = useState(false);


    useEffect(() => {
        const getNotesFromServer = async () => {
            let resp = await utils.getNotes();
            setNotes(resp.data);
            console.log(resp.data);
            setisLoading(false)
        }

        getNotesFromServer();
    }, [])

    const handleAddNote = () => {
        let randomid = Math.random().toString(36).substr(2, 16);
        let randomX = Math.floor(Math.random() * 500);
        let randomY = Math.floor(Math.random() * 500);
        setNotes([...notes, { ...note, id: randomid, x: randomX, y: randomY }]);

    }

    const handleSaveNote = async () => {
        setSaving(true);
        await utils.saveNotes(notes);
        setSaving(false);
    }


    const updateNotePosition = (noteId, newPosition) => {
        console.log(`Updating position for note ${noteId} to (${newPosition.x}, ${newPosition.y})`);
        const updatedNotes = notes.map((note) =>
            note.id === noteId ? { ...note, x: newPosition.x, y: newPosition.y } : note
        );
        setNotes(updatedNotes);
    };


    return (
        <div id="notes-page">
            <div id="note-control">
                <input id="note-input" name="note" placeholder="enter title note" onChange={e => setNote({ ...note, title: e.target.value })} />
                <button id="add-note" onClick={handleAddNote}>Add</button>
                <button id="save-note" onClick={handleSaveNote}>{saving ? "Save..." : "Save"}</button>
            </div>

            {
                isLoading ? <div id="loading">Loading...</div>
                    :
                    <div id="notes-container">
                        {
                            notes.map(note => {
                                return <Note key={note.id} noteData={note} updateNotePosition={updateNotePosition} />
                            })
                        }
                    </div>
            }
        </div>
    )
}

export default Notes;