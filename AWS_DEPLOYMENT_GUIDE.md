# AWS Deployment Guide for Todo Backend

This backend is set up to deploy from GitHub Actions to a Docker-based AWS Elastic Beanstalk environment.

## Deployment Flow

1. Push to the `main` branch in the `be` repository.
2. GitHub Actions creates a source bundle from the repository.
3. The workflow uploads that bundle to Elastic Beanstalk.
4. Elastic Beanstalk rebuilds the Docker image from `Dockerfile`.
5. The container runs `prisma migrate deploy` before starting the API.

## What You Need In AWS

### 1. RDS PostgreSQL

Create a PostgreSQL instance and note the connection string:

```env
DATABASE_URL=postgresql://username:password@rds-endpoint:5432/todoapp?schema=public
```

Use the same VPC/security group setup as your Elastic Beanstalk environment or explicitly allow the Beanstalk instances to reach port `5432`.

### 2. Elastic Beanstalk Application

Create:

- Application name: for example `todo-backend`
- Environment name: for example `todo-backend-prod`
- Platform: `Docker`
- Instance type: `t3.micro` is enough to start

After the environment is created, add these Elastic Beanstalk environment properties:

```env
DATABASE_URL=postgresql://username:password@rds-endpoint:5432/todoapp?schema=public
NODE_ENV=production
PORT=4000
```

The app exposes `/health`, which Elastic Beanstalk can use for health checks.

## What You Need In GitHub

### Repository Variables

Add these repository variables in GitHub:

- `AWS_REGION`
- `EB_APPLICATION_NAME`
- `EB_ENVIRONMENT_NAME`

Example values:

```text
AWS_REGION=us-east-1
EB_APPLICATION_NAME=todo-backend
EB_ENVIRONMENT_NAME=todo-backend-prod
```

### Repository Secret

Add this secret in GitHub:

- `AWS_DEPLOY_ROLE_ARN`

This should be an IAM role that GitHub Actions can assume through OIDC.

## IAM Role For GitHub Actions

Create an IAM role with:

- Trusted entity type: `Web identity`
- Identity provider: GitHub's OIDC provider
- Audience: `sts.amazonaws.com`

Restrict the trust policy to this repository and branch:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::<AWS_ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:amoghatelkar/todo-be:ref:refs/heads/main"
        }
      }
    }
  ]
}
```

Attach a policy that allows:

- `elasticbeanstalk:CreateApplicationVersion`
- `elasticbeanstalk:UpdateEnvironment`
- `elasticbeanstalk:DescribeEnvironments`
- `s3:PutObject`
- `s3:GetObject`
- `s3:ListBucket`
- `sts:GetCallerIdentity`

Scope the S3 permissions to the Elastic Beanstalk bucket in your region:

```text
arn:aws:s3:::elasticbeanstalk-<region>-<account-id>
arn:aws:s3:::elasticbeanstalk-<region>-<account-id>/*
```

## First-Time AWS Setup Checklist

1. Create the RDS PostgreSQL database.
2. Create the Elastic Beanstalk Docker environment.
3. Set the Elastic Beanstalk environment variables, especially `DATABASE_URL`.
4. Create the GitHub OIDC IAM role and save its ARN as `AWS_DEPLOY_ROLE_ARN`.
5. Add the GitHub repository variables.
6. Push to `main`.

## Verification

After the first deployment:

1. Open the Elastic Beanstalk environment URL.
2. Check `https://<your-eb-url>/health`.
3. Confirm CloudWatch or Elastic Beanstalk logs show `prisma migrate deploy` succeeded.

## Troubleshooting

### App deploys but does not start

- Check Elastic Beanstalk logs for a Prisma migration failure.
- Confirm `DATABASE_URL` is present in Elastic Beanstalk environment properties.
- Confirm the Beanstalk instances can reach the RDS security group.

### GitHub Action fails before deploy

- Confirm `AWS_DEPLOY_ROLE_ARN` exists in GitHub secrets.
- Confirm `AWS_REGION`, `EB_APPLICATION_NAME`, and `EB_ENVIRONMENT_NAME` exist in GitHub variables.
- Confirm the IAM role trust policy matches the repo name and `main` branch exactly.

### Deployment succeeds but old code is still running

- Check the Elastic Beanstalk environment name in `EB_ENVIRONMENT_NAME`.
- Confirm the workflow ran on `main` and not only on a pull request.

## Notes

- This setup uses GitHub OIDC, not long-lived AWS access keys.
- Prisma migrations run on every container start; `prisma migrate deploy` is safe to run repeatedly.
- If you later want blue/green or multi-service deployment, move to ECS or App Runner. For this app size, Elastic Beanstalk is the shortest reliable path.
