import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as deployment from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import { Construct } from 'constructs';

export class AppStack extends cdk.Stack {
    bucket: s3.Bucket;
    originAccessIdentity: cloudfront.OriginAccessIdentity;
    distribution: cloudfront.Distribution;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        this.bucket = new s3.Bucket(this, 'AWSShopBucket', {
            bucketName: 'nodejs-aws-shop-react-96tm',
        });
        this.originAccessIdentity = new cloudfront.OriginAccessIdentity(
            this,
            'AWSShopOAI',
            {
                comment: this.bucket.bucketName,
            }
        );
        this.bucket.grantRead(this.originAccessIdentity);

        this.distribution = new cloudfront.Distribution(
            this,
            'AWSShopDistribution',
            {
                defaultBehavior: {
                    origin: new origins.S3Origin(this.bucket, {
                        originAccessIdentity: this.originAccessIdentity,
                    }),
                    viewerProtocolPolicy:
                        cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                },
                defaultRootObject: 'index.html',
                errorResponses: [
                    {
                        httpStatus: 404,
                        responseHttpStatus: 200,
                        responsePagePath: '/index.html',
                    },
                ],
            }
        );
    }
}

const app = new cdk.App();
const stack = new AppStack(app, 'AWSShopStack', {
    env: { region: 'eu-north-1' },
});

new deployment.BucketDeployment(stack, 'AWSShopDeployment', {
    destinationBucket: stack.bucket,
    sources: [deployment.Source.asset('./dist')],
    distribution: stack.distribution,
    distributionPaths: ['/*'],
});

new cdk.CfnOutput(stack, 'Domain URL', {
    value: stack.distribution.distributionDomainName,
});
