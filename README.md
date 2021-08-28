# topology-api
this is code is inteneded to be used as a library nevertheless I have provided index.js
you can use to explore the the api functionarlity

# project Structure
.
├── api                   # this folder includes the api classes and functions
    ├── api.js            # this file includes the main functionality of the api
    ├── device.js            # this file includes the Device class 
    ├── topology.js            # this file includes the Topology class 
├── tests       # this folder includes  testing files
    ├── api.test.js  # thisfile used for testing the api
├── generate_samples.ps1 #  this is a powershell script used to generate the samples folder
├── samples  # this folder can be regenerated by running the generate_samples.ps1 script on windows
├── images  
└── README.md

# technology
as it is obvious this code is written in javascript , uses jsdoc for documentation , jest for unit testing.
# Setup
* to setup this project you need to have nodejs version >= v12.19.0
* you need to run the following command `npm install`

# Testing
* before you run the test you need to make sure there is a samples folder if not u can run the generate_samples.ps1 script to generate them from topology.json file
* to test this code you need to run the command `npm run test`

# Code Analysis and linting
* this code was fomratted with prettier and eslint

