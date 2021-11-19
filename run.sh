#!/bin/bash

export PATH="$(yarn global bin):$PATH"

serve -l 4000 --ssl-cert /home/pivx/cert/blockbook.crt --ssl-key /home/pivx/cert/blockbook.key -n -s /home/pivx/go/src/blockbook/binance/build > run.out 2>&1  </dev/null &
