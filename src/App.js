import React, {useState} from 'react';
import './App.css';
import {Form, FormButton, FormGroup} from "semantic-ui-react";
import Results from './components/Results'
import loadingImage from './images/preloader.gif'
import axios from 'axios';
import Pagination from './components/Pagination'

function App() {

    const [userInput, setUserInput] = useState([]);
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(3);

    const handleSearch = (e) => {
        setUserInput(e.target.value);
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        const response = await axios("https://api.github.com/search/users?q=" + userInput).catch((err) => {
                setError(err);
                console.log(err);
            }
        );
        if (response) {
          //  console.log('got responce, responce is');
            //console.log(response.data);
            setUsers(response.data.items);
            setLoaded(true);
          //  console.log("loading status" + loaded);
        }
        setIsLoading(false);
    };

    // Get current users
    const indexOfLastPost = currentPage * usersPerPage;
    const indexOfFirstPost = indexOfLastPost - usersPerPage;
    const currentUsers = users.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            <div className="container-fluid w-100">
                <div className="navbar row">
                    <p className="h1 mx-auto"> Git hub user search</p>
                </div>
                <div className="search row">
                    <Form onSubmit={handleSubmit} className="mx-auto my-5">
                        <FormGroup>
                            <Form.Input palacholder='name' name="name" onChange={handleSearch} className="col-8"/>
                            <FormButton content="submit" className="col-4"/>
                        </FormGroup>
                    </Form>
                </div>
                    {isLoading === true ? (<div className="row"> <img src={loadingImage} className="mx-auto"/></div>) : (<div></div>)}
                <div className="row">
                    {loaded === true ? (<Results users={currentUsers}/>) : (<div></div>)}
                </div>
                <div className="row ml-2">
                    <Pagination
                        usersPerPage={usersPerPage}
                        totalUsers={users.length}
                        paginate={paginate}
                    />
                </div>
            </div>
        </>
    );
}

;

export default App;
