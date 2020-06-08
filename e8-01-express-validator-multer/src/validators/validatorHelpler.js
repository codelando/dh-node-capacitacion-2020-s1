module.exports = function (errors) {
    return {
        errors: errors,
        create(field, msg, value = '', location = 'body') {
            console.log(this)
            this.errors[field] = {
                value: value,
                msg: msg,
                param: field,
                location: location,
            }
        },
        has(field) {
            return this.errors.hasOwnProperty(field);
        },
        msg(field) {
            if (this.errors.hasOwnProperty(field)) {
                return this.errors[field].msg;
            } else {
                return null
            }
        },
        value(field) {
            if (this.errors.hasOwnProperty(field)) {
                return this.errors[field].value;
            } else {
                return null
            }        
        }
    }
}