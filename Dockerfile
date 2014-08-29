FROM quay.io/joukou/nginx
MAINTAINER Fabian Cook <fabian.cook@joukou.com>

# Add the static web assets
# ADD build/production /var/www

# Add the NGINX configs
ADD etc/nginx/sites-available/control.shipper.co.nz /etc/nginx/sites-available/
RUN ln -s /etc/nginx/sites-available/control.shipper.co.nz /etc/nginx/sites-enabled/

# Expose ports
#   8080 intra-cluster  HTTP
EXPOSE 8080

# Execute systemd by default
CMD [ "/bin/systemd-init" ]