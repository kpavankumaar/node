/*
* create and export configuration variables 
*
*/ 
// container for all the environments
var environments = {};
// staging environment
environments.staging = {
    port:3000,
    'envName': 'staging'
}
// production environment
environments.production ={
    port:5000,
    'envName':'production'
}
// determine which enviroment was passed as a command line argument
console.log(process.env.a);
console.log(process.env.b);
var currentEnvironment = typeof(process.env.node_env) == 'string' ? process.env.node_env.toLowerCase() : '';

var environmentToExport = typeof (environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

module.exports = environmentToExport;