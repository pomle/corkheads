git_commit := $(shell git rev-parse --short HEAD)
export REACT_APP_VERSION := $(git_commit)

.PHONY: all
all: install test build start

.PHONY: install
install:
	npm install

.PHONY: test
test:
	npm run lint
	CI=1 npm run test

.PHONY: build
build: install
	npm run build
	echo $(REACT_APP_VERSION) > build/version.txt

.PHONY: start
start:
	npm run start
