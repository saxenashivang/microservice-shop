const { UserModel } = require('../models');
const { APIError, BadRequestError, STATUS_CODES } = require('../../utils/app-errors')

//Dealing with data base operations
class UserRepository {

    async CreateUser({ email, password, phone, salt }){
        try{
            const User = new UserModel({
                email,
                password,
                salt,
                phone,
                address: []
            })
            const UserResult = await User.save();
            return UserResult;
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create User')
        }
    }
    
    async FindUser({ email }){
        try{
            const existingUser = await UserModel.findOne({ email: email });
            return existingUser;
        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find User')
        }
    }

    async FindUserById({ id }){

        try {
            const existingUser = await UserModel.findById(id).populate('address')
            
            return existingUser;
        } catch (err) {
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find User');
        }
    }


    async AddCartItem(UserId, {  _id, name, price, banner }, qty, isRemove){

        try{

            const profile = await UserModel.findById(UserId).populate('cart');
    
            if(profile){ 
     
                const cartItem = {
                    product: { _id, name, price, banner},
                    unit: qty,
                };
              
                let cartItems = profile.cart;
                
                if(cartItems.length > 0){
                    let isExist = false;
                     cartItems.map(item => {

                        if(item.product._id.toString() === _id.toString()){
                            if(isRemove){
                                cartItems.splice(cartItems.indexOf(item), 1);
                            }else{
                                item.unit = qty;
                            }
                            isExist = true;
                        }
                    });
    
                    if(!isExist){
                        cartItems.push(cartItem);
                    } 
                }else{
                    cartItems.push(cartItem);
                }
    
                profile.cart = cartItems;
    
                const cartSaveResult = await profile.save();

                return cartSaveResult;
            }
            
            throw new Error('Unable to add to cart!');

        }catch(err){
            throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create User')
        }

    }

}

module.exports = UserRepository;