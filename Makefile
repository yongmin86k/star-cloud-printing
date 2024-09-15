.PHONY: yarn-bootstrap start-api start-ios start-all stop-all

yarn-bootstrap:
	@echo "Bootstrapping all packages..."
	cd packages/shared && yarn install
	cd packages/server && yarn install
	cd packages/client && yarn install

start-api:
	@echo "Starting API server..."
	cd packages/server && yarn start &

start-ios:
	@echo "Starting Expo iOS app..."
	cd packages/client && yarn ios &

start-all: 
	@echo "Starting both API and iOS app..."
	make start-api
	make start-ios

stop-all:
	@echo "Stopping both API and iOS app..."
	pkill -f 'yarn start' || true
	pkill -f 'yarn ios' || true
