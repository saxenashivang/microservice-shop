const { UserRepository } = require("../database");
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');
const { APIError, BadRequestError } = require('../utils/app-errors')


// All Business logic will be here
class UserService {

    constructor(){
        this.repository = new UserRepository();
    }

    async SignIn(userInputs){

        const { email, password } = userInputs;
        
        try {
            
            const existingUser = await this.repository.FindUser({ email});

            if(existingUser){
            
                const validPassword = await ValidatePassword(password, existingUser.password, existingUser.salt);
                
                if(validPassword){
                    const token = await GenerateSignature({ email: existingUser.email, _id: existingUser._id});
                    return FormateData({id: existingUser._id, token });
                } 
            }
    
            return FormateData(null);

        } catch (err) {
            throw new APIError('Data Not found', err)
        }

       
    }

    async SignUp(userInputs){
        
        const { email, password, phone } = userInputs;
        
        try{
            // create salt
            let salt = await GenerateSalt();
            
            let userPassword = await GeneratePassword(password, salt);
            
            const existingUser = await this.repository.CreateUser({ email, password: userPassword, phone, salt});
            
            const token = await GenerateSignature({ email: email, _id: existingUser._id});

            return FormateData({id: existingUser._id, token });

        }catch(err){
            throw new APIError('Data Not found', err)
        }

    }


    async GetProfile(email){
  console.log("email",email);
        try {
            const existingUser = await this.repository.FindUser({email});
            return FormateData(existingUser);
            
        } catch (err) {
            throw new APIError('Data Not found', err)
        }
    }


    async ManageCart(UserId, product, qty, isRemove){
        try {
            const cartResult = await this.repository.AddCartItem(UserId, product, qty, isRemove);        
            return FormateData(cartResult);
        } catch (err) {
            throw new APIError('Data Not found', err)
        }
    }

}

module.exports = UserService;