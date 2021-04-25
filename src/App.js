import {useRef,useState,useEffect} from "react";
import './App.css'
import MainContext from "./MainContext";
import LeaveCommentText from "./component/LeaveCommentText";
import Note from "./component/Note";
import NoteBox from "./component/NoteBox";

function App() {
    const screen = useRef(null);
    const [mode, setMode] = useState(false);
    const [notes, setNotes] = useState([
        {
            note:"bu bir test notu",
            number:1,
            color:'purple',
            position:{
                x:350,
                y:250
            }
        }
    ])

    const [position, setPosition] = useState({
        x:0,
        y:0
    })
    const [boxPosition, setBoxPosition] = useState({
        x:0,
        y:0
    })
    const [boxVisible, setBoxVisible] = useState(false)


    useEffect(()=>{
        screen.current.focus()
    },[])
    const handleKeyUp = (e) => {
        if(e.key === 'c'){
            setMode(!mode)
            setBoxVisible(false)
        }
    }
    const handleMouseMove = (e) => {
       if(mode){
           setPosition({
               x: e.pageX,
               y: e.pageY,
           })
       }
    }
    const handleClick = (e) => {
       if(mode){
           setBoxPosition({
               x: position.x,
               y: position.y
           })
           setBoxVisible(true)
       }
    }

    const data = {
        position,
        boxPosition,
        setMode,
        notes,
        setNotes,
        setBoxVisible
    }

    return (
        <MainContext.Provider value={data}>
            <div ref={screen} tabIndex={0} onClick={handleClick} onKeyUp={handleKeyUp} onMouseMove={handleMouseMove} className={`screen${mode && ' editable'}`}>
                <img src="https://webso.cool/images/radyosfer.jpg" />
                {mode &&  <LeaveCommentText/>}

                {notes && notes.map(note => <Note {...note} />)}

                {boxVisible && <NoteBox/>}


            </div>
        </MainContext.Provider>
    );
}
export default App;