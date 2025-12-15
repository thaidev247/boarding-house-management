# Thiết lập môi trường

## Cài đặt WSL (chỉ trên Windows)
Trong PowerShell:
```sh
wsl --install
```
## Cài đặt Docker
Hướng dẫn chính thức:
- [Windows](https://docs.docker.com/desktop/setup/install/windows-install/)
- [Linux](https://docs.docker.com/desktop/setup/install/linux/)

## Cài đặt minikube
Hướng dẫn chính thức:
[Cài đặt Minikube](https://kubernetes.io/vi/docs/tasks/tools/install-minikube/)

## Cài đặt k6 (công cụ load testing)
Hướng dẫn chính thức: [Grafana k6 docs](https://grafana.com/docs/k6/latest/set-up/install-k6/)

## Tạo file `k8s/grafana/grafana-smtp-secret.yaml` để thêm App Password cho việc gửi mail cảnh báo
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: grafana-smtp-secret
type: Opaque
stringData:
  smtp-password: <app password>
```
# Chạy dự án

## Clone repo
```sh
git clone -b main https://github.com/thaidev247/boarding-house-management.git

cd boarding-house-management
```

## Build các service

Khởi động Docker, chạy:
```sh
minikube start
```

Trên Windows PowerShell, chạy:
```sh
minikube docker-env | Invoke-Expression
```

Build các image:
```sh
docker build -t user-service:latest ./user-service
docker build -t tenant-service:latest ./tenant-service
docker build -t room-service:latest ./room-service
docker build -t payment-service:latest ./payment-service
```

Deploy lên Kubernetes:
```sh
kubectl apply -f ./k8s/databases
kubectl apply -f ./k8s/services
kubectl apply -f ./k8s/kong
kubectl apply -f ./k8s/grafana
```

Expose các cổng của Grafana và Kong API:
```ssh
kubectl port-forward svc/grafana 3000:3000
kubectl port-forward svc/kong 8000:8000 # API Gateway
kubectl port-forward svc/kong 8001:8001 # Admin
kubectl port-forward svc/kong 8002:8002 # Dashboard
```

Chạy trang web frontend (dùng bun [Bun](https://bun.sh/) package manager):
```sh
cd ./frontend
bun install
bun dev
```

Đăng nhập bằng tài khoản Admin có sẵn:
- Số điện thoại: **0999999999**
- Mật khẩu: **password**

Mở Minikube Dashboard:
```sh
minikube dashboard
```

Kong Dashboard
```sh
http://localhost:8002
```

# Load testing
Trong thư mục dự án:
```sh
k6 run ./k6/test.js
```
