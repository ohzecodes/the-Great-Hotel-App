let express = require('express');
let app = express();
let valid = require("validator")
const {check} = require('express-validator');
var exports = module.exports = {};
app.use(express.urlencoded({extended: true}));

exports.form1 = [
    check("name").trim()
    .not().isEmpty()
    .isLength({min:5}).withMessage('must be at least 5 chars long')
    .escape()
    
    
    
    ,
    check('city').trim()
    .not().isEmpty()
    .isLength({min:5}).withMessage("must be 5 char or +")
    
    .escape()
    


    ,    
    check('streetAddress')   
    .trim()
    .not().isEmpty().isLength({min:5})
    .withMessage("something is wrong with the streetAddress ")
    ,
    check("website")
    .trim()
    .isLength({min:8}).withMessage("must be 8+ chars")
    .isURL()
    .customSanitizer(
        string=> {
            if (
              string.substring(0, 3) === "www" ||
              string.substring(0, 8) !== "https://"
            ) {
              string = "https://" + string;
            }
            return string;
          }


    )
]
exports.form2=[
    
    
    check('rating')
    .trim()
    .escape()
    .not().isEmpty()
    .isNumeric()
    .isLength({min:1})
    .withMessage("Fill in the rating")
    ,
    check('review')
    .trim().escape().isLength({max:200})
    

]









