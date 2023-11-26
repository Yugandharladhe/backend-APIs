const bcrypt=  require("bcrypt");


module.exports.generateSalt = async (password)=>{
    const salt = await bcrypt.genSalt(10);
    const encrypt = await bcrypt.hash(password, salt);
    return encrypt;
}


module.exports.matchPassword = async function(enteredPassword, saltPin){
    return await bcrypt.compare(enteredPassword, saltPin);
  
  }
  