git_commit := $(shell git rev-parse --short HEAD)
export REACT_APP_VERSION := $(git_commit)

.PHONY: start
start:
	npm run start

.PHONY: build
build:
	npm install
	npm run build
	echo $(REACT_APP_VERSION) > build/version.txt
