# Blerdeblurb

## About Blerdeblurb!

Blerdeblurb was created by Elwyn Palmerton in 2020 as project for learning and practicing React. It was was modeled roughly after Twitter and designed to have a similar functionality with its own style. In 2022 it was redeployed on AWS.

## Tech Stack

### Frontend

The Blerdeblurb frontend was created with React, Material-UI, and Redux. It uses JWT for login and authentication.

### Backend

The Blerdeblurb backend was built with Node.js and MongoDB.

### DevOps

Blerdeblurb is deployed on AWS with the following services

**Frontend:**

- S3
- CodeCommit
- CodeBuild: Builds and deploys the artifact to the S3 bucket
- Route 53
- AWS Certificate Manager
- CloudFront: Caching and SSL certificate.

**Backend:**

- ElasticBeanstalk - deploys to EC2 instances with an Application Load Balancer.
- ACM and Route 53 - for managing SSL and domain name.
- CodeCommit and CodePipeline for deployment.

## Running Blerdeblurb

To run Blerdeblurb locally, you need to clone both repos:

**frontend:**
git clone https://github.com/ElwynPalmerton/Blerdeblerb-client.git

**backend:**

git clone https://github.com/ElwynPalmerton/Blerdeblerb-API.git
