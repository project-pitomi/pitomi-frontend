# pitomi-frontend
Check https://github.com/project-pitomi/pitomi for project pitomi

#### Sample k8s manifests

##### deployment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pitomi-frontend
  labels:
    app: pitomi-frontend
spec:
  replicas: 1
  selector:
    matchLabels:
      app: pitomi-frontend
  template:
    metadata:
      labels:
        app: pitomi-frontend
    spec:
      containers:
      - name: pitomi-frontend
        image: <<Image>>
        ports:
        - containerPort: 3000

```

`<<Image>>` name:tag of your image



##### service.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: pitomi-frontend
  labels:
    app: pitomi-frontend
spec:
  ports:
  - port: 3000
    protocol: TCP
  selector:
    app: pitomi-frontend

```

