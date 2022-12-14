import {useState,useEffect} from "react"

function Search() {
    const[users, setUsers] = useState([]) 
    const [name, setName] = useState("")
    const [level, setLevel] = useState(0)
    const [text, setText] = useState('');
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
        window.location.reload(false);

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
    <div className="App">
     <form onSubmit={submitHandle}>
      <p>Please Enter Names: </p>
        <input type="text"  value={name} onChange={(e)=>setName(e.target.value)}/>
        {/* <div><button type="submit">add</button></div> */}
     </form>
     <div>
        <div>
            {users.sort(((a,b)=>b.level - a.level)).map(names=>(
          <div key={names.id}>
              <p>{names.name} {names.level}</p>
          </div>
           
            ))}
        </div>
     </div>
     <div className="App2">
      <h2>Search Name</h2>
        <input className="search_input" type="text"
        onChange={e => onChangeHandler(e.target.value)}
        value={text}/>

        {suggestions && suggestions.sort(((a,b)=>b.level - a.level)).map((suggestion, i) =>
        
          <div className="seggestion" key={i} onClick={() => {
            selectText(suggestion.name);    
              const requestOptions = {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                      level:suggestion.level+1
                  })
      
              }
              fetch(`http://localhost:3001/names/${suggestion._id}`, requestOptions)
                  .then(res => res.json())
                  .then(data=>console.log(data))
                  window.location.reload(false);
          }
            
          }>{suggestion.name} </div>

        )}
        
    </div>
         </div>
  );
}


export default Search;