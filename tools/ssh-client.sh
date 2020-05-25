#!/bin/bash
ssh -i ~/.ssh/LightsailDefaultKey-eu-west-2.pem -L 3000:localhost:80 bitnami@build.processesjs.com
