.PHONY : build

RED=\033[0;31m
GREEN=\033[0;32m
ORANGE=\033[0;33m
NC=\033[0m

# Setup ————————————————————————————————————————————————————————————————————————

current-dir := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))

dev-start:
	yarn run start
prod-start:
	yarn run start:prod
install:
	yarn install
build:
	yarn build