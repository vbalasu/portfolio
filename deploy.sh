export AWS_PROFILE=vbalasu_admin
npm run build
aws s3 cp --acl public-read --recursive build/ s3://cloudmatica/portfolio/
aws cloudfront create-invalidation --distribution-id E2W7OXYPAHD5VU --paths '/*'
