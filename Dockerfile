#FROM golang:1.18-alpine as builder
FROM ubuntu:22.04 as builder
ARG DEBIAN_FRONTEND=noninteractive

#WORKDIR $GOPATH/src/go.k6.io/k6

RUN apt-get update -y; 
RUN apt-get install wget -y

# Install golang
RUN wget https://go.dev/dl/go1.18.2.linux-amd64.tar.gz
RUN rm -rf /usr/local/go && tar -C /usr/local -xzf go1.18.2.linux-amd64.tar.gz; rm go1.18.2.linux-amd64.tar.gz
ENV PATH="/usr/local/go/bin:${PATH}"

# Install xk6
RUN /usr/local/go/bin/go install go.k6.io/xk6/cmd/xk6@latest

## build k6 with faker extension
## install faker
RUN /root/go/bin/xk6 build v0.2.0 --output /root/go/bin/k6 --with github.com/szkiba/xk6-faker


RUN apt-get update &&  \
    apt-get install -y ca-certificates curl && \
    rm -rf /var/lib/apt/lists/*

RUN curl -O https://s3.amazonaws.com/amazoncloudwatch-agent/debian/amd64/latest/amazon-cloudwatch-agent.deb && \
    dpkg -i -E amazon-cloudwatch-agent.deb && \
    rm -rf /tmp/*


FROM alpine:3.15
RUN apk add --no-cache ca-certificates && \
    adduser -D -u 12345 -g 12345 k6
COPY --from=builder /root/go/bin/k6 /usr/bin/k6

COPY --from=builder /tmp /tmp
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
COPY --from=builder /opt/aws/amazon-cloudwatch-agent /opt/aws/amazon-cloudwatch-agent
COPY codebuild/statsd.json /opt/aws/amazon-cloudwatch-agent/bin/default_linux_config.json
ADD start.sh /home/k6
RUN chmod +x /home/k6/start.sh
RUN chown -R 12345:12345 /opt/aws/amazon-cloudwatch-agent


USER 12345

ENV RUN_IN_CONTAINER=true
ENV AWS_REGION=eu-south-1


WORKDIR /home/k6
ENTRYPOINT [ "/bin/sh", "start.sh" ]