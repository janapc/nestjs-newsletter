#!/bin/sh

# create topics
docker exec -it kafka kafka-topics.sh --bootstrap-server kafka:9092 --create --if-not-exists --topic content-topic --replication-factor 1 --partitions 1
docker exec -it kafka kafka-topics.sh --bootstrap-server kafka:9092 --create --if-not-exists --topic register-subscriber-topic --replication-factor 1 --partitions 1
docker exec -it kafka kafka-topics.sh --bootstrap-server kafka:9092 --create --if-not-exists --topic remove-subscriber-topic --replication-factor 1 --partitions 1
