fmt-write:
	black .
fmt-check:
	black . --check
isort-write:
	isort src serverless_backend app.py
isort-check:
	isort src serverless_backend app.py --check
pylint:
	pylint --recursive=y src serverless_backend app.py
mypy:
	mypy src serverless_backend app.py

fmt: fmt-write isort-write
lint: fmt-check isort-check pylint