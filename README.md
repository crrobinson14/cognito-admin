# Cognito Admin

This project provides an enhanced admin panel as an alternative to what's found in the AWS Web Console. The intent is to provide a more
user-friendly interface with additional features available (currently) only in the CLI, not the Web interface.

## Installation and Usage

This project is intended to run locally. It currently only supports Access/Secret key authentication, and I didn't want the headache of
trying to host something myself that securely managed access to such sensitive data. To install it, just:
 
 1. Clone this repository locally.
 1. Run `yarn` to install the dependencies. You will need Node 10.x or higher and Yarn installed to do this.
 1. Copy `config.json.example` to `config.json` and edit the settings there. The settings should be self explanatory.
 1. Run `yarn serve` and access the URL it provides.

Note that the access/secret key must be supplied here because this is primarily a front-end Web project that calls the Cognito APIs
directly - it doesn't have an internal API of its own. It's therefore not able to access your local AWS CLI `credentials` file and I view
that as a good thing. The credentials you provide don't need to be a global admin user for your Amazon account. It just needs admin access
to the specific Cognito User Pool you want to administer. That means you can set up a special user and IAM role just for this purpose, with
only those permissions required to administer the pool you want. I strongly recommend that you do this.  

## Docker

This project includes a Docker file, meaning you can run this project without Node / Yarn installed. You should still create
`config.json` as described above first, then run:

    docker build -t cognito-admin .
    docker run -p 8080:8080 -d cognito-admin

One caveat is that this method will require a rebuild for any future updates.

*NOTE: I do not recommend using this method as a means of deployment! This project has no provisions for controlling access to it.
It was intended to be run locally in a trusted environment (your workstation), not hosted on a server.* 

