
#
# Binaries
#

BIN := ./node_modules/.bin

#
# Variables
#

HOST      ?= localhost
PORT      ?= 8080
NODE_ENV  ?= development

STYLES      = $(shell find assets -type f -name '*.scss')
SCRIPTS     = $(shell find lib -type f -name '*.js' -o -name '*.vue')

BROWSERIFY_OPTS = -t vueify -t babelify -t [ partialify --alsoAllow svg ] -t envify

DOMAIN  = polysoph-staging.surge.sh
BRANCH  = $(shell git rev-parse --abbrev-ref HEAD)

#
# Tasks
#

build: assets styles scripts
	@true

watch: install styles
	@true & \
		onchange 'assets/**/*.{woff,ttf,jpg,png,gif}' -- make assets & \
		onchange 'index.html' 'assets/images/**/*' -- make assets & \
		onchange 'assets/**/*.scss' -- make styles & \
		budo index.js:build/assets/bundle.js --live --pushstate \
			--host $(HOST) \
			--port $(PORT) \
			--css build/assets/bundle.css -- $(BROWSERIFY_OPTS) & \
		wait

deploy:
	@echo "Deploying branch \033[0;33m$(BRANCH)\033[0m to Surge..."
	@make clean
	@NODE_ENV=production make build
	@(cd build && \
		sed -i '' -e 's/\/build\//\//g' index.html && \
		cp index.html 200.html && \
		surge . -d $(DOMAIN))
	@echo "Deployed to \033[0;32mhttp://$(DOMAIN)/\033[0m"

test: lint

lint: .eslintrc
	@$(BIN)/eslint --ext .js,.vue lib/

clean:
	@rm -rf build
clean-deps:
	@rm -rf node_modules

#
# Shorthands
#

install: node_modules
assets: build/favicon.png build/index.html build/assets/fonts/ build/assets/images/
styles: build/assets/bundle.css
scripts: build/assets/bundle.js

#
# Targets
#

node_modules: package.json
	@npm install

build/%: %
	@mkdir -p $(@D)
	@cp -r $< $@

build/favicon.png: assets/images/favicon.png
	@mkdir -p $(@D)
	@cp -r $< $@

build/assets/%: assets/%
	@mkdir -p $(@D)
	@cp -r $< $@

build/assets/bundle.css: $(STYLES)
	@mkdir -p $(@D)
	@sassc --sourcemap assets/css/index.scss $@
	@$(BIN)/postcss --use autoprefixer $@ -o $@

build/assets/bundle.js: $(SCRIPTS)
	@mkdir -p $(@D)
	@browserify $(BROWSERIFY_OPTS) index.js -o $@

#
# Phony
#

.PHONY: watch clean clean-deps
