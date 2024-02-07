const users = [
    {
      id: 1,
      username: "johndoe",
      password: "password1",
      email: "johndoe@example.com"
    },
    {
      id: 2,
      username: "janedoe",
      password: "password2",
      email: "janedoe@example.com"
    },
    {
      id: 3,
      username: "bobsmith",
      password: "password3",
      email: "bobsmith@example.com"
    }
  ];
  
  // TODO: use userModel (db) instead of mock data
  // TODO: implement route handlers below for users (real data)
  

  const getUsers = (req, res) => {
    res.json(users);
  };
  
  const getUserById = (req, res) => {
    const userFound = users.find(user => user.id === Number(req.params.id));
    if (userFound) {
        res.json(userFound);
    } else {
        res.status(404).json({error: 'not found'});
    }
  };
  
  
  const postUser = (req, res) => {
    console.log('postUser request body', req.body);
    if (!req.body.username || !req.body.password || !req.body.email){
        console.log(req.body.username, req.body.password, req.body.email);
        return res.status(400).json({error: 'information missing'});
    }
    const newUserId = users[users.length-1].id + 1;
    const newUser = {id: newUserId, username: req.body.username, password: req.body.password, email: req.body.email};
    users.push(newUser);
    res.status(201).json(newUser);
  };
  
  const putUser = (req, res) => {
    const userIndex = users.findIndex(user => user.id === Number(req.params.id));
    if (index === -1){
        return res.sendStatus(404);
    }
    if (!req.body.name){
        return res.status(400).json({error: 'username missing'});
    }
    users[user].name = req.body.name;
    res.json({updated_item: items[index]});
  };

  
  // Dummy login, returns user object if username & password match
  const postLogin = (req, res) => {
    const userCreds = req.body;
    if (!userCreds.username || !userCreds.password) {
      return res.sendStatus(400);
    }
    const userFound = users.find(user => user.username == userCreds.username);
    // user not found
    if (!userFound) {
      return res.status(403).json({error: 'username/password invalid'});
    }
    // check if posted password matches to user found password
    if (userFound.password === userCreds.password) {
      res.json({message: 'logged in successfully', user: userFound});
    } else {
      return res.status(403).json({error: 'username/password invalid'});
    }
  };
  
  export {getUsers, getUserById, postUser, putUser, postLogin};





  