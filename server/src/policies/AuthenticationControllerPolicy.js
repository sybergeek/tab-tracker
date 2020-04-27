const Joi = require('joi')

module.exports = {
    register (req, res, next) {
        const schema = {
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            )
        }
        /*eslint-disable no-unused-vars*/
        const {error, value} = Joi.validate(req.body, schema)
        /*eslint-enable no-unused-vars*/
        if (error){
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'You must provide a valid email address'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: `The password provided failed to match the following rules:
                            <br>
                            1. It must contain ONLY the follwing characters: lowercase, uppercase, numbers.
                            <br>
                            2. It must be atleast 8 characters and atmost 32 characters in length.`
                    })
                    break
                default:
                    res.status(400).send({
                        error: 'Invalid registration information'
                    })
            }
        } else {
            next()
        }
    }
}
