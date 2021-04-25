import {useContext, useState} from 'react'
import MainContext from "../MainContext";

function NoteBox() {
    const {boxPosition, setMode, notes, setNotes,setBoxVisible} = useContext(MainContext)
    const types = [
        {
            name: 'comment',
            color: 'red',
            text: "Yorum"
        },
        {
            name: "private-comment",
            color: "#999",
            text: "Gizli Yorum"
        },{
            name:"note",
            color: "orange",
            text: "Note"

        }
    ]
    const [color, setColor] = useState(types[0].color)
    const [note, setNote] = useState('')

    const changeColor = (e) => {
        setColor(e.target.value)
    }
    const addNote = () =>{
        const currentNote ={
            note,
            number: notes.length +1,
            color,
            position:{
                x:boxPosition.x,
                y:boxPosition.y
            }
        }
        setNotes([...notes,currentNote])
        setBoxVisible(false)
    }

    return (
        <div className="note-box" onMouseEnter={()=>setMode(false)} onMouseLeave={()=>setMode(true)} style={{ '--color': color, position: 'absolute', top:boxPosition.y, left:boxPosition.x}}>
            <span className="note-box-number"> {notes.length +1 }</span>
            <select onChange={changeColor}>
                {types.map(type => (
                    <option value={type.color}>{type.text}</option>
                ))}
            </select>
            <textarea onChange={(e)=>setNote(e.target.value)} cols="30" rows="5"></textarea>
            <button onClick={addNote} disabled={!note}>Ekle</button>
        </div>
    );
}

export default NoteBox;