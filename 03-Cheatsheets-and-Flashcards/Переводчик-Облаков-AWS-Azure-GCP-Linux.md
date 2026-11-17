# 🔄🗿 Переводчик Облаков (AWS ↔ Azure ↔ GCP) и Справочник Команд (Arch / Ubuntu / Cloud CLI)

> Схема визуального сравнения 3 облаков: [[10_aws_vs_azure_vs_gcp_rosetta_map.svg]]

---

## 1. Таблица-переводчик сервисов 3 главных облаков

| Категория | 🟠 Amazon AWS | 🔵 Microsoft Azure | 🟢 Google Cloud (GCP) | Зачем это безопаснику |
| :--- | :--- | :--- | :--- | :--- |
| **Права и Доступ** | IAM, IAM Identity Center | Microsoft Entra ID + RBAC | Cloud IAM, Service Accounts | Самое главное место: выдача минимальных прав (Least Privilege) и MFA |
| **Временные роли для серверов** | IAM Role + STS | Managed Identity | Service Account | Чтобы не хранить вечные ключи в `.env` на сервере |
| **Виртуальные серверы** | EC2 | Azure Virtual Machines | Compute Engine | Контроль IMDS, патчи ОС, закрытие SSH/RDP |
| **Безопасный вход без SSH** | AWS SSM Session Manager | Azure Bastion | Identity-Aware Proxy (IAP) | Избавляет от необходимости открывать порт `22` миру |
| **Объектное хранилище** | Amazon S3 | Azure Blob Storage | Cloud Storage (GCS) | Закрывать публичный доступ (`Block Public Access`), шифровать |
| **Виртуальная сеть** | VPC | Virtual Network (VNet) | VPC | Сегментация: Public / Private / Isolated подсети |
| **Файрвол сервера / сети** | Security Groups + NACL | NSG (Network Security Group) | VPC Firewall Rules | Блокировка `0.0.0.0/0` на чувствительные порты |
| **WAF и Защита от DDoS** | AWS WAF + AWS Shield | Azure Front Door + Firewall | Cloud Armor | Защита от SQLi/XSS и перегрузки сайта |
| **Ключи и Секреты** | AWS KMS + Secrets Manager | Azure Key Vault | Cloud KMS + Secret Manager | Шифрование дисков/бакетов и авто-ротация паролей БД |
| **Логи API (Камера)** | CloudTrail | Azure Activity Log | Cloud Audit Logs | Расследование инцидентов: кто, когда и что сломал |
| **Умный Детектор Угроз** | Amazon GuardDuty | Microsoft Defender for Cloud | Security Command Center | Поиск кражи ключей, майнеров, сканирования портов |
| **Облачный SIEM** | Security Hub + OpenSearch | Microsoft Sentinel (KQL) | Google SecOps (Chronicle) | Сбор всех тревог и охота на угрозы |
| **Управляемый Kubernetes** | Amazon EKS | Azure Kubernetes (AKS) | Google Kubernetes (GKE) | Настройка RBAC, Pod Security, защита `etcd` |

---

## 2. Шпаргалка команд: Arch Linux ↔ Ubuntu ↔ AWS CLI ↔ Azure CLI

### Пакеты и База Linux
| Задача | 🏹 Arch Linux | 🐧 Ubuntu / Debian / Kali |
| :--- | :--- | :--- |
| Обновить систему | `sudo pacman -Syu` | `sudo apt update && sudo apt upgrade -y` |
| Поставить базовые утилиты | `sudo pacman -S git jq curl docker terraform trivy` | `sudo apt install -y git jq curl docker.io` |
| Включить и запустить Docker | `sudo systemctl enable --now docker` | `sudo systemctl enable --now docker` |
| Посмотреть логи службы SSH | `journalctl -u sshd -n 50` | `sudo tail -n 50 /var/log/auth.log` |
| Показать все открытые порты | `sudo ss -tulnp` | `sudo ss -tulnp` |

### Команды Аудита в AWS CLI (`aws`) и Azure CLI (`az`)
| Что проверить | 🟠 AWS CLI (включая `--endpoint-url=http://localhost:4566` для LocalStack!) | 🔵 Azure CLI (`az`) |
| :--- | :--- | :--- |
| Кто я сейчас (какой ключ/роль)? | `aws sts get-caller-identity` | `az account show` |
| Список пользователей и ролей | `aws iam list-users` / `aws iam list-roles` | `az ad user list` / `az role assignment list` |
| Проверить публичность S3 / Blob | `aws s3 ls s3://bucket --no-sign-request` | `az storage account list --query "[].{name:name,public:allowBlobPublicAccess}"` |
| Список виртуальных серверов | `aws ec2 describe-instances \| jq '.Reservations[].Instances[].PublicIpAddress'` | `az vm list -d -o table` |
| Найти открытые на мир `0.0.0.0/0` порты | `aws ec2 describe-security-groups --filters Name=ip-permission.cidr,Values='0.0.0.0/0'` | `az network nsg list -o table` |
| Посмотреть последние события аудита | `aws cloudtrail lookup-events --max-results 20` | `az monitor activity-log list --max-events 20` |

### Инструменты DevSecOps и Облачного Аудита
```bash
# 1. Проверить Git-репозиторий на забытые пароли и ключи (Gitleaks):
gitleaks detect --source . -v

# 2. Проверить Terraform-файлы на дыры безопасности ДО деплоя (Checkov):
checkov -d ./terraform/

# 3. Просканировать Docker-образ на критические CVE (Trivy):
trivy image --severity HIGH,CRITICAL my-app:1.0

# 4. Просканировать живой AWS или Azure аккаунт на 300+ проверок CIS (Prowler):
prowler aws
prowler azure --az-cli-auth
```
