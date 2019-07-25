FROM ubuntu:16.04
ARG NVM_INSTALL_SCRIPT=https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh
ARG LIBXTST=http://ubuntu.mirrors.tds.net/ubuntu/pool/main/libx/libxtst/libxtst6_1.2.2-1_amd64.deb
ARG NODE_ENV=production
ADD ./_dist /app
COPY ./start.sh /app
COPY ./apt.pkgs /app
COPY ./supervisor.conf /tmp
ENV NVM_DIR=/usr/local/nvm
ENV DISPLAY=':99.0'
RUN useradd -ms /bin/bash electron
RUN /usr/bin/apt-get update && \
      /usr/bin/apt-get install -y $(cat /app/apt.pkgs) && \
      /usr/bin/apt-get install -y wget supervisor && \
      /usr/bin/wget -O /tmp/libxtst.deb $LIBXTST && \
      /usr/bin/dpkg -i /tmp/libxtst.deb && \
      /usr/bin/wget -O /tmp/nvm_install.sh $NVM_INSTALL_SCRIPT && \
      /bin/mkdir -p $NVM_DIR && \
      /bin/chmod +x /tmp/nvm_install.sh && \
      /tmp/nvm_install.sh && \
      . $NVM_DIR/nvm.sh && \
      nvm install 6.15.1 && \
      cd /app && \
      npm install && \
      /bin/mv /tmp/supervisor.conf /etc/supervisor/conf.d && \
      /bin/chmod +x /app/start.sh && \
      /bin/chown -R electron:electron /app && \
      /bin/chown root /app/node_modules/electron/dist/chrome-sandbox && \
      /bin/chmod 4755 /app/node_modules/electron/dist/chrome-sandbox && \
      /bin/rm -rf /var/lib/apt/lists/*
USER electron
WORKDIR /app
ENTRYPOINT ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]
