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
	npm run lint
	CI=1 npm run test
	npm run build
	npm run start
