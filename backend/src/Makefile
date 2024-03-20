test:
	python -m pytest

test-cov:
	python -m pytest --cov=./ --cov-report term-missing

test-cov-ci:
	python -m pytest --junitxml=pytest.xml --cov=./ --cov-report term-missing | tee pytest-coverage.txt

fmt-write:
	black .
fmt-check:
	black . --check
isort-write:
	isort .
isort-check:
	isort . --check
pylint:
	pylint --recursive=y .
mypy:
	mypy .

fmt: fmt-write isort-write
lint: fmt-check isort-check pylint
