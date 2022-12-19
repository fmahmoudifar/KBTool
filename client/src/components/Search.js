import {useState,useEffect} from "react"

function Search() {
    const[users, setUsers] = useState([]) 
    const [name, setName] = useState("")
    const [level, setLevel] = useState(0.5)
    const [text, setText] = useState('');
    const [min, setMin] = useState(0.49);
    // const [max, setMax] = useState(0.9);
    const [suggestions, setSuggestions] = useState([]);   
    
    useEffect(() => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch("http://localhost:3001/names", requestOptions)
            .then(res => res.json())
            .then(data => setUsers(data))}, [])

    const submitHandle = (e) => {

        e.preventDefault()
        let newName = { name, level }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(newName)
        }

        fetch("http://localhost:3001/names", requestOptions)
            .then(res => res.json())
            .then(data => console.log("1", data))
            .catch(error => console.log(error.messsage))

        setUsers([...users, newName])
        setName("")
        setLevel("")
        setTimeout(() => {
          
         window.location.reload(false);
        }, 1000);

    }
    const onChangeHandler = (text) => {
        let matches = []
        if (text.length > 0) {
          matches = users.filter(urs => {
            const regex = new RegExp(`${text}`, "gi")
            return urs.name.match(regex)
          })
        }
        console.log(matches);
        setSuggestions(matches)
        setText(text)
      }

      const selectText = (text) => {
        setText(text);
        setSuggestions([])
      }
     
  return (
    <div className="main">

    <div className="right">
     <form onSubmit={submitHandle}>
      <h2>Please Enter Names: </h2>
        <input type="text"  value={name} onChange={(e)=>setName(e.target.value)}/>
        <div>
          <button type="submit">Add</button>
          <button type="reset" onClick={()=>{

for (let i=0; i<users.length; i++){
const requestOptions = {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    level:0.5
  })
  
}
fetch(`http://localhost:3001/names/${users[i]._id}`, requestOptions)
.then(res => res.json())
.then(data=>console.log(data))
// window.location.reload(false);

}
setTimeout(() => {
  window.location.reload(false);

}, 3000);
          }
          
          }>Reset</button>


          </div>
     </form>
     <div>
        <div className="names">
            {users.sort(((a,b)=>b.level - a.level)).map(names=>(
          <ul key={names.id}>
              <li>{names.name} </li>
          </ul>
           
            ))}
        </div>
     </div>
      </div>
     <div className="left">
      <form>

      <h2>Search Name: </h2>
        <input type="text"
        onChange={e => onChangeHandler(e.target.value)}
        value={text}/>

        {suggestions && suggestions.sort(((a,b)=>b.level - a.level)).map((suggestion, i) =>

        
        <div className="seggestion" key={i} onClick={() => {
          selectText(suggestion.name);    
          for (let i=0; i<users.length; i++){
            if(users[i]._id===suggestion._id){          
          const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              level:suggestion.level+(1-suggestion.level)*0.01
            })
            
          }
          fetch(`http://localhost:3001/names/${suggestion._id}`, requestOptions)
          .then(res => res.json())
          .then(data=>console.log(data))
        
        }
        else{
            
            let levelx = users[i].level-(1-users[i].level)*0.01
            if(levelx>=min){
          const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              level: levelx
            })
            
          }
          fetch(`http://localhost:3001/names/${users[i]._id}`, requestOptions)
          .then(res => res.json())
          .then(data=>console.log(data))
          

        }
      else{

          const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
           
            
          }
          fetch(`http://localhost:3001/names/${users[i]._id}`, requestOptions)
          .then(res => res.json())
          .then(data=>console.log(data))



        }
      }
        }
        setTimeout(() => {
          window.location.reload(false);
        
        }, 3000)}
        
      }>{suggestion.name} </div>
      
      )}
      </form>
        
    </div>
    
    </div>
  );
}


export default Search;