git_commit := $(shell git rev-parse --short HEAD)
export REACT_APP_VERSION := $(git_commit)



.PHONY: install
install:
	npm install

.PHONY: build
build:
	npm run build
	echo $(REACT_APP_VERSION) > build/version.txt

.PHONY: start
start:
	npm run start


.PHONY: all
all:
	npm install
	npm run build
	echo $(REACT_APP_VERSION) > build/version.txt
	npm run start

