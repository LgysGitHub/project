### Install docker and node (>=14)

### Install ts-node (optional)
Install ts-node globally can let you run Typescript directly (instead of using tsc to translate `.ts` into `.js`).
To install run `npm install -g ts-node`.

### Install dependencies
Run `npm ci` to install all the dependencies from package-lock.json
Run `npm install --save-exact` to install new dependencies and generating new package-lock.json

### Locally setup your Elasticsearch with valid data (indices and mappings)
Refer to [infra elasticsearch readme](../../infra/elasticsearch/README.md)

### Setup your environment variables
Please ask devOps to create an Aliyun user for you. Create a `.env` file under `api-server/` directory, the following is the template:
```
ALI_ACCESS_KEY_ID=<aliyun access key>
ALI_SECRET_ACCESS_KEY=<aliyun secret key>
ALI_SMS_SIGN_NAME=享授网络科技
ALI_SMS_VERIFICATION_TEMPLATE=SMS_221060241
AMAP_KEY=<高德地图 API Key>
```

### Start the API server
Run `npm start` to start the server
