PYTHON_VERSION=python3
VENV_NAME=venv
PYTHON=$(VENV_NAME)/bin/python

.PHONY: help
.DEFAULT: help
help:
	@echo "make test"
	@echo "	   Run tests with unittest framework."
	@echo "make venv"
	@echo "	   Create and update virtual environment."

.PHONY: venv
venv: $(VENV_NAME)/bin/activate
$(VENV_NAME)/bin/activate: requirements.txt # if requirements.txt changed, this will need to be run again
	# create virtual environment
	test -d $(VENV_NAME) || virtualenv -p $(PYTHON_VERSION) $(VENV_NAME)
	# upgrade pip
	$(PYTHON) -m pip install -U pip
	# install development dependencies
	$(PYTHON) -m pip install -Ur requirements.txt

.PHONY: test
test: venv
	$(PYTHON) -m unittest discover tests

.PHONY: clean
clean:
	rm -rf $(VENV_NAME)
