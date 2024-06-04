
const users = [
    {id:1 , name : 'anisul'},
    {id:2 , name : 'maliha'},
    {id:3, name: 'Farha'},

] ; 


const getUsers = (req,res)=>{
    res.status(200).send({
        message: 'User were returned sucessfully' ,
        users:users ,
    });

};

module.exports = {getUsers}