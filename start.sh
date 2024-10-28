# Start cloudwatch agent

mkdir -p /root/.aws


cat << EOF > /root/.aws/credentials
[AmazonCloudWatchAgent]
aws_access_key_id = $AWS_ACCESS_KEY_ID
aws_secret_access_key = $AWS_SECRET_ACCESS_KEY
aws_session_token = $AWS_SESSION_TOKEN
aws_session_token = $AWS_SESSION_TOKEN
region = eu-south-1
EOF

K6_STATSD_ENABLE_TAGS=true K6_BROWSER_ARGS='no-sandbox' K6_BROWSER_HEADLESS=true k6 run --out statsd $1
