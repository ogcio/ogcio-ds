# Infrastructure

## Prerequisite

- asdf - is a tool for managing multiple runtime versions for different CLIs, in the following [link](https://asdf-vm.com/guide/getting-started.html) you can find more details about how `asdf` can be installed on your machine.

## Initial setup

```bash
asdf install
asdf local terraform 1.3.7
```

## Terraform & Terragrunt

We have two important ENV variables that need to be passed to the `make` command when we are dealing with the infrastructure over Terragrunt:

- ENVIRONMENT - dev/uat/prod
- TF_MODULE - the name of the Terraform module

Initializing the state and instaling the dependencies
```bash
make terragrunt_init ENVIRONMENT=prod TF_MODULE=s3
```

Terragrunt validate
```bash
make terragrunt_validate ENVIRONMENT=prod TF_MODULE=s3
```

Terragrunt plan
```bash
make terragrunt_plan ENVIRONMENT=prod TF_MODULE=s3
```

Terragrunt apply
```bash
make terragrunt_apply ENVIRONMENT=prod TF_MODULE=s3
```
