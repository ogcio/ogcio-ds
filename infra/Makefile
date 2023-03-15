MAKEFLAGS += --no-print-directory
SHELL=/bin/bash

.PHONY: default

help: ## Show this help message.
	@echo 'usage: make [target] ...'
	@echo
	@echo 'targets:'
	@egrep '^(.+)\:\ ##\ (.+)' ${MAKEFILE_LIST} | column -t -c 2 -s ':#'

## Export environment variables if a .env file is present.
ifneq ("$(wildcard .env)","")
  sinclude .env
  export $(shell [ -f .env ] && sed 's/=.*//' .env)
else
  $(error Note - An .env file cannot be found.)
endif

asdf_setup: ## Install plugins from the .tool-versions file
	@asdf plugin add terraform || true
	@asdf install

terragrunt_init: ## Terraform init
	@cd terragrunt/$(ENVIRONMENT)/$(AWS_REGION)/$(TF_MODULE) && terragrunt init

terragrunt_validate: ## Terraform init
	@cd terragrunt/$(ENVIRONMENT)/$(AWS_REGION)/$(TF_MODULE) && terragrunt validate

terragrunt_plan: default ## Terraform plan over Terragrunt
	@cd terragrunt/$(ENVIRONMENT)/$(AWS_REGION)/$(TF_MODULE) && terragrunt plan

terragrunt_apply: default ## Terrafomr apply over Terragrunt
	@cd terragrunt/$(ENVIRONMENT)/$(AWS_REGION)/$(TF_MODULE) && terragrunt apply -auto-approve
