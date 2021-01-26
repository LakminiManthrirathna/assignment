import React, {useState} from "react";
import { BrowserRouter as Router, Link, Route} from 'react-router-dom';
import axios from 'axios';

const Results = (props) => {
    const [allRepos, setallRepos]= useState([]);
    const [allFollowers, setallFollowers]= useState([]);
    const {users} = props;
   
    const User = ({userid}) => {
        const selectedUser = users.find(u => u.id == userid);
        const selectedUserLogin= selectedUser.login;
        console.log('selectedUserLogin:'+selectedUserLogin);
        const getUserRepos = async (selectedUserLogin) => {
           const response = await axios("https://api.github.com/users/" + selectedUserLogin+"/repos")
           .then((response) => {
                setallRepos(response.data);
           })
           .catch((err) => {
                   console.log(err);
               }
           );
       };

       const getUserFollowers = async (selectedUserLogin) => {
            const response = await axios("https://api.github.com/users/" + selectedUserLogin+"/followers")
            .then((response) => {
                setallFollowers(response.data);
            })
            .catch((err) => {
                    console.log(err);
                }
            );
        };

       getUserRepos(selectedUserLogin);
       getUserFollowers(selectedUserLogin);
       console.log('AllRepos:'+allRepos);
   
      return(
          <div>
           <div>Repositories:</div>
           <ol className="removeBullets">
                {allRepos.map(repo =>
                    <li className="border-1">
                        {repo.name}
                    </li>)}
            </ol>
            <div>followers:</div>
           <ol className="removeBullets">
                {allFollowers.map(f =>
                    <li className="border-1">
                        {f.name}
                    </li>)}
            </ol>
          </div>
      )
    
    };

    return (
        <Router>
            <ol className="mx-auto col-md-6 removeBullets">
                {users.map(user =>
                    <li className="border-1 bg-light mb-4" key={user.id}>
                        <Link to={`/users/${user.id}`}>
                            <div className="w-100 d-flex justify-content-between"><img src={user.avatar_url}
                                                                                       className="col-2 p-3 mr-0"/>
                                <div className="col-10 h5 pl-0 my-auto">{user.login}</div>
                            </div>
                        </Link>
                    </li>)}
            </ol>
            <div className="col-md-6">
                <Route path="/users/:user" component={({match}) => (<User userid={match.params.user}/>)}/>
            </div>
        </Router>);
};

export default Results;
