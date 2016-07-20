#!/bin/bash
# As there is no Linux support, this script assumes OS X as the host system.

cwd=$(pwd)

if [ -e "$cwd/index_stable.js" ] 
then
    if [ ! -e "/usr/local/bin/node" ]
    then 
	sudo wget https://nodejs.org/dist/v4.4.2/node-v4.4.2.pkg
	sudo installer -pkg node-v4.4.2.pkg -target / 
    fi
    if [ ! -e "/usr/local/bin/node" ]
    then 
	open 'https://nodejs.org/en/'
	exit 1
    else
	result = $(sudo /usr/local/bin/node "$cwd/index_stable.js")
	if [ "$result" -eq "1" ] 
        then 
            exit 1
        fi
	exit 0
    fi
fi
exit 1