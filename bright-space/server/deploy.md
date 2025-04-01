# To deploy
## Local
### Zip the code
cd server
zip -r project.zip . -x "node_modules/*" "dist/*" ".git/*"

### If this is your first time configure AWS
aws configure

### upload to AWS
aws s3 cp project.zip s3://bright-space/code-deploy-1/project.zip

### ssh
ssh ubuntu@54.206.127.22 -i BrightSpace.pem

## In the server
aws s3 cp s3://bright-space/code-deploy-1/project.zip project.zip
unzip -o project.zip -d Code/express-codedeploy-1/
npm install --prefix Code/express-codedeploy-1/
npm run build --prefix Code/express-codedeploy-1/

npm run dev --prefix Code/express-codedeploy-1/

sudo lsof -i :8080
kill -9 <PID>
## 

node-api.service

[Unit]
Description=Nodejs hello world App
Documentation=https://example.com
After=network.target

[Service]
Type=simple
User=ubuntu
ExecStart=/usr/bin/node /home/ubuntu/Code/express-codedeploy-1/dist/index.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
