## K8S backend learning

This is a backend app build in Express js. This App will be used for testing K8S

Accepted Environmental value
| Key |  Default Value  |
|:-----|:--------:|
| APP_FLAVOR   |  Black  |
| POD_NAME   |  None  |
| NODE_NAME   |  None  |
| POD_IP   |  None  |
| NAMESPACE | None |

---
### Build Docker image and push to Docker Hub
Build an image with the Yellow tag
```bash
docker build --tag vimalsmenon/app-backend:yellow .
```
Docker Login with username and password
```bash
docker login
```
Docker push
```bash
docker push vimalsmenon/app-backend:yellow
```
---
Build an image with the Green tag
```bash
docker build --tag vimalsmenon/app-backend:green .
```
Docker Login with username and password
```bash
docker login
```
Docker push
```bash
docker push vimalsmenon/app-backend:green
```
---
Build an image with the Brown tag
```bash
docker build --tag vimalsmenon/app-backend:brown .
```
Docker Login with username and password
```bash
docker login
```
Docker push
```bash
docker push vimalsmenon/app-backend:brown
```