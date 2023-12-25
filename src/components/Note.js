import React, { useState } from 'react';
// import './Notes.css';

const Note = ({ noteData, updateNotePosition }) => {
    const [position, setPosition] = useState({ x: noteData.x, y: noteData.y });
    const [dragging, setDragging] = useState(false);

    const handleMouseDown = (e) => {
        setDragging(true);
        const offsetX = e.clientX - position.x;
        const offsetY = e.clientY - position.y;

        const handleMouseMove = (e) => {
            
            if (dragging) {
                setPosition({
                    x: e.clientX - offsetX,
                    y: e.clientY - offsetY,
                });
            }
        };

        const handleMouseUp = () => {

            setDragging(false);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);

            updateNotePosition(noteData.id, { x: position.x, y: position.y });

        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <div
            id={`note-box-${noteData.id}`}
            className={`note-box ${dragging ? 'dragging' : ''}`}
            style={{
                border: "1px solid black",
                width: "200px",
                height: "200px",
                backgroundColor: "wheat",
                top: `${position.y}px`,
                left: `${position.x}px`,
            }}
            onMouseDown={handleMouseDown}
        >
            {noteData.title}
        </div>
    );
};

export default Note;
