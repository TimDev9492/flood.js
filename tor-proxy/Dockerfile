# use Ubuntu as base image
FROM ubuntu:latest

# install tor
RUN apt-get update && apt-get install -y tor

# copy tor configuration file into container
COPY torrc /etc/tor/torrc

# Expose the default Tor SOCKS port
EXPOSE 9050

# Start Tor
CMD ["tor", "-f", "/etc/tor/torrc"]
