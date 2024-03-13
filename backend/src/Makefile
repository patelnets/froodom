test:
	python -m pytest

test-cov:
	python -m pytest --cov=./ --cov-report term-missing

test-cov-ci:
	python -m pytest --junitxml=pytest.xml --cov=./ --cov-report term-missing | tee pytest-coverage.txt

