FROM node:latest

# RUN apt-get update && apt-get install -y sudo && echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

RUN apt-get update && apt-get install python3-pip -y && pip install openpyxl

WORKDIR /usr/src/app

ADD . .




