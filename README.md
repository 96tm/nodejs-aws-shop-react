# Task 2. Serving SPA

### Task link
https://github.com/rolling-scopes-school/aws/blob/main/aws-developer/02_serving_spa/task.md

## URLS

### S3 Static Site URL (manual deployment)
http://nodejs-aws-shop-react-manual-96tm.s3-website.eu-north-1.amazonaws.com

### S3 Static Site URL (automated CDK deployment, should return "403 Forbidden")

http://nodejs-aws-shop-react-96tm.s3-website.eu-north-1.amazonaws.com

### Cloudfront Distribution URL (automated CDK deployment)

https://d35z48cg6epmdi.cloudfront.net

## NPM scripts
- build: npm run build
- bootstrap: npm run cdk:bootstrap
- deploy: npm run cdk:cloudfront:deploy
