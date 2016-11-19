#!/bin/bash
# As there is no Linux support, this script assumes OS X as the host system.

sudo cp -R "/Library/Application Support/BDInstaller/" "./"

if [ -e "./index_stable.js" ] 
then
    if [ ! -e "/usr/local/bin/node" ]
    then 
	open 'https://nodejs.org/en/'
	exit 1
    else
	result = $(sudo /usr/local/bin/node "./index_stable.js")
	if [ "$result" -eq "1" ] 
        then 
            exit 1
        fi
	exit 0
    fi
fi
exit 1