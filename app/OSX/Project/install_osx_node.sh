#!/bin/bash
# As there is no Linux support, this script assumes OS X as the host system.

if [ ! -e "/usr/local/bin/node" ]
then 
    sudo installer -pkg node-v4.4.7.pkg -target / 
fi
if [ ! -e "/usr/local/bin/node" ]
then 
    open 'https://nodejs.org/en/'
    exit 1
fi
exit 0