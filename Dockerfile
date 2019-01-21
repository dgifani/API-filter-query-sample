###############################################################################
# Builder image from latest Node image
#
FROM  node:latest
ENV NODE_ENV=production

##########################
# Define working directory and copy source
#
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .
#########################

# Install npm dependencies only for production 

 RUN npm install --production
########################

# Expose ports 
EXPOSE 3000

# Start the application on expose port
CMD [ "npm", "start" ]
