

const signup = async (req,res) =>{
    const {username,email,password,confirmPassword} = req.body;

    if (!username,!email,!password,!confirmPassword){
        return res.status(400).json({mssg:"all fields are needed "})
    }

    if (password!= confirmPassword){
        return res.status(400).json({mssg:"passwords do not match!!"})
    }

    
    

}