var env = process.env.NODE_ENV;

// Default settings go here
var settings = {
    MONGO_URL: 'localhost', 
    MONGO_DB: 'noki-dev',
    MONGO_PORT: 27017,
    
    REDIS_PORT: 6379,
    REDIS_HOST: 'localhost',
    REDIS_MAX_ATTEMPTS: 5,

    PORT: process.env.PORT || 3000,

    LOG_LEVEL: 2,

    // Mandrill stuff
    MANDRILL_API_KEY: process.env.MANDRILL_API_KEY || 'K4NsYN27hNA4P6D03gPhCw',
    MANDRILL_CONFIRMATION_ADDRESS: process.env.MANDRILL_CONFIRMATION_ADDRESS || 'http://localhost:3000/confirm',
    MANDRILL_FROM: {
        "email": "mrroboto@localhost.com",
        "name": "Mr. Roboto"
    },
    MANDRILL_SUBJECT: "Confirm your email",

    ADMIN_ACCOUNTS_ENABLED: true,
    ACCOUNT_APPROVAL_ENABLED: true
}

if ( typeof env == 'undefined' ) {
    env = 'dev';
}

if ( env == 'dev' ) {

} else if ( env == 'test' ) {
    settings.MONGO_DB = 'test';
    LOG_LEVEL = 1;
}

console.log( "Using env:", env );

module.exports = settings;
