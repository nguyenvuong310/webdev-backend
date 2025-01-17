
build:
	docker buildx build --platform linux/amd64 -t vuong676/gscore:latest .

up: 
	npm run start:dev
