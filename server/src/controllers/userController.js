

const getUsers = (req,res)=>{
    res.status(200).send({
        message: 'User were returned sucessfully' ,
     
    });

};

module.exports = {getUsers}