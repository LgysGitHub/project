### 更新到最新的master代码
cd到repo目录，执行命令
```
git checkout master
git pull
```

### 编译打包user-portal到api-server目录下
```
cd apps/user-portal
npm run build

...
...
...
Compiled successfully.
...
...
...

```
### 关闭和删除api-server，删除api-server docker image
```
docker stop api-server
docker rm api-server es-setup
docker rmi docker-compose_api-server
```

### 重新打包api-server docker image并部署
```
cd ../../infra/docker-compose/
docker-compose -f itu-cluster.yml up -d --build api-server
```

### 检查api-server运行正确
```
docker ps | grep api-server
```
浏览器打开 https://dev.xiangshou.cc