#*============================================================================*#
#*=====*                          Start App	                            *=====*#
#*============================================================================*#
.PHONY: docker-start local-deps-install local-serve

docker-start:
		@docker compose up

local-deps-install:
		cd frontend && npm install

local-serve:
		cd frontend && ng serve & cd backend && mvnd spring-boot:run