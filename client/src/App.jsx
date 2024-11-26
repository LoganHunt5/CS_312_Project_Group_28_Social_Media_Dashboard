import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import MainPage from './MainPage.jsx';

function App() {
    /*
    const [array, setArray] = useState([]);
    const fetchAPI = async () => {
        const response = await axios.get("http://localhost:8080/api");
        setArray(response.data.fruits);
        console.log(response.data.fruits);
    }


    useEffect(() => {
        fetchAPI();
    }, []);
    
                {array.map((fruit, index) => (
                    <div key={index}>
                        <p>{fruit}</p>
                        <br></br>
                    </div>
                ))}
    */
    return (
        <MainPage/>
    );
}

export default App
