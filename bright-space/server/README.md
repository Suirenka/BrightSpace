### To deploy
zip -r project.zip . -x node_modules* dist* .git*
aws s3 cp project.zip s3://bright-space/code-deploy-1/project.zip