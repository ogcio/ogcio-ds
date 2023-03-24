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

### Additional Terraform modules

To extend the Terraform code by having more different TF modules you need to create a separate directory in `infra/terrraform` (example infra/terraform/ec2). It is essential to define the providers, tags, versions etc in each module because those definitions are not shared between the modules.

Once the Terraform module is created, the next requirement is to include the module in Terragrunt. In the main `infra/terragrunt/terragrunt.hcl` file there is a standard definition of the folder structure and the default env variables, and the next step will be creating a directory in environment/region with all required variables for that specific module.

# GitHub Actions

## Deploy to S3

There is a GitHub Workflow for deploying the bundle to AWS S3 which is triggered automatically after a PR is merged in the `main` branch.

## Terraform and Terragrunt deployments over GitHub Actions

There is a GitHub Workflow created in the `.github/workflows` directory where the Infrastructure as Code deployments are automated. The following modules/services are covered in the workflow at the moment:

- s3
- acm
- cf

For any additional modules that need to be added to the workflow, the `.github/workflows/terraform-aws-prod.yml` needs to be extended by adding that new module in `workflow_dispatch`. There is no trigger for this pipeline, a manual action is required for selecting the TF module and TF action (plan/apply). For more information on how to start a manual workflow please visit the official GitHub [documentation](https://docs.github.com/en/actions/managing-workflow-runs/manually-running-a-workflow).

## NPM Publish

There is another GitHub workflow that is used for publishing npm packages to GitHub packages. The trigger for this action is the `release` creation process with the following steps:

- Create a `tag` from the latest version of the `main` branch
- Create a `release` from the previously created `tag` and the NPM publish workflow will be triggered
