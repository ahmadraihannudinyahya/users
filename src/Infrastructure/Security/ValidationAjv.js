const Validation = require("../../Applications/Security/Validation");
const InvariantError = require("../../Commons/Exepctions/InvariantError");

class ValidationAjv extends Validation{
    constructor({ajv}){
        super();
        this._ajv = new ajv();
    }
    validate(data, schema){
        return new Promise((resolve, reject) => {
            const validate = this._ajv.compile(schema);
            const valid = validate( data);
            if(valid){
                return resolve();
            }
            const textError = validate.errors[0].instancePath.replace("/", "").replace(/\//g, " ") + " " + validate.errors[0].message;
            return reject(new InvariantError(textError));
        });
    }
}
module.exports = ValidationAjv;