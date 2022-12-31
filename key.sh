read -p "Please enter your mongo key" key 
echo CONNECTION_STRING=$key >>.env

read -p "JWT_SECRET" JWT_SECRET 
echo JWT_SECRET=$1 >>.env

read -p "JWT_EXPIRE" JWT_EXPIRE 
echo JWT_EXPIRE=$1 >>.env

read -p "EMAIL_HOST" EMAIL_HOST 
echo EMAIL_HOST=$1 >>.env

read -p "EMAIL_PORT" EMAIL_PORT 
echo EMAIL_PORT=$1 >>.env

read -p "EMAIL_SECURE" EMAIL_SECURE 
echo EMAIL_SECURE=$1 >>.env

read -p "EMAIL_USERNAME" EMAIL_USERNAME 
echo EMAIL_USERNAME=$1 >>.env

read -p "EMAIL_PASSWORD" EMAIL_PASSWORD 
echo EMAIL_PASSWORD=$1 >>.env