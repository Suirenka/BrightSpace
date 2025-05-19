# To deploy
## Local
### build
npm run build
rm -rf ./server/build
mv build server/
cd server
zip -r project.zip . -x "node_modules/*" "dist/*" ".git/*"

### If this is your first time configure AWS
aws configure

### upload to AWS
### iteration 1 aws s3 cp project.zip s3://bright-space/code-deploy-1/project.zip
aws s3 cp project.zip s3://bright-space/server/project.zip
cd ..
ssh ubuntu@54.206.127.22 -i BrightSpace.pem
# iteration 1 ssh ubuntu@3.107.181.166 -i BrightSpace.pem 
# iteration 2 ssh ubuntu@3.107.181.166 -i BrightSpace.pem 

## In the server
### iteration 1 aws s3 cp s3://bright-space/code-deploy-1/project.zip project.zip
aws s3 cp s3://bright-space/server/project.zip project.zip

unzip -o project.zip -d Code/express-codedeploy-1/
npm install --prefix Code/express-codedeploy-1/
npm run build --prefix Code/express-codedeploy-1/

screen -ls
screen -X -S 12345.bright_space quit
screen -S bright_space

npm start --prefix Code/express-codedeploy-1/

sudo lsof -i :8080
kill -9 <PID>
## 

new instance w/ group
add IAM with full S3 Access

sudo apt update
sudo apt install nginx
sudo apt install -y apache2-utils

sudo htpasswd -c /etc/nginx/.htpasswd bs-test-user

sudo vim /etc/nginx/sites-available/default


server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name _;   # matches any host

    location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                auth_basic "Protected area";
                auth_basic_user_file /etc/nginx/.htpasswd;

                proxy_pass http://127.0.0.1:8080;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection   "upgrade";
                proxy_set_header Host         $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_cache_bypass $http_upgrade;
        }
}

sudo nginx -t
sudo systemctl reload nginx
