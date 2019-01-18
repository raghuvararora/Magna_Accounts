
# Instructions to setup
This requires presence of NPM and Node.js on system.

To install these kindly refer to https://docs.npmjs.com/getting-started/installing-node

	1.) Clone this repo on your local system

	2.) Using a terminal switch to the folder where this repo is cloned and install following modules from npm.

		npm install



## Now to run the code

1.) Using the terminal type

        
        node app.js 
        
    
    This will start the server at localhost and port 3000 by default
    Make sure you are in the clonned repo while doing this



# company routes are given below

## New Company_master form
    	http://localhost:8008/company/new
    
## List item from  company_master
    	http://localhost:8008/company/{company_id}
    	
## List all items from company_master
	    http://localhost:8008/company

## edit/delete item from company_master 
	http://localhost:8008/company/{company_id}/edit

