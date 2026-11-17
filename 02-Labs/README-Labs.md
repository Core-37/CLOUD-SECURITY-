# 🧪🛠️ 02. Лабораторный Полигон Cloud Security (100% Бесплатно, без карты банка)

> 🧭 **Навигатор:** [[Полный-Курс-Cloud-Security-С-Нуля|Курс]] • [[05-Галерея-Схем-и-Путей|Схемы]] • [[Окно-Быстрых-Вспоминанок|Окно Вспоминанок]]

В этом разделе собраны:
1. **3 готовые локальные Python-лабораторные работы** (запускаются мгновенно на твоём компьютере!).
2. **Инструкция по установке бесплатного «карманного AWS» (LocalStack)** в Docker — без регистрации карты!
3. **Инструкция по установке главных инструментов DevSecOps на Arch Linux и Ubuntu.**

---

## 💻 1. Запуск 3 готовых Python-лабораторий прямо сейчас

Все 3 скрипта используют только стандартную библиотеку Python 3 (не требуют `pip install`) и абсолютно безопасны:

```bash
cd 02-Labs

# Лаба №1: Аудитор IAM-политик (поиск Action:*, PassRole) и S3-конфигураций
python3 lab01_s3_and_iam_auditor.py

# Лаба №2: Симулятор взлома Capital One (SSRF -> IMDSv1) vs Защита IMDSv2
python3 lab02_ssrf_imds_simulator.py

# Лаба №3: Мини-Checkov сканер Terraform-кода (проверяет sample_vulnerable_main.tf)
python3 lab03_terraform_sec_check.py
```

---

## 🔧 2. Установка инструментов облачного безопасника (Arch Linux vs Ubuntu)

### 🏹 Если у тебя Arch Linux / EndeavourOS / Manjaro:
```bash
sudo pacman -Syu
sudo pacman -S git curl jq python docker aws-cli-v2 terraform trivy
sudo systemctl enable --now docker
sudo usermod -aG docker $USER   # перелогинься после этого!

# Checkov, Gitleaks и Prowler (в изолированном venv или через AUR):
python -m venv ~/cloudsec-venv
source ~/cloudsec-venv/bin/activate
pip install checkov prowler localstack awscli-local
```

### 🐧 Если у тебя Ubuntu / Debian / WSL2 / Kali:
```bash
sudo apt update && sudo apt install -y git curl jq python3 python3-venv docker.io unzip
sudo systemctl enable --now docker
sudo usermod -aG docker $USER

# AWS CLI v2
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip && sudo ./aws/install

# Trivy, Terraform и Python-инструменты (Checkov, Prowler, LocalStack)
python3 -m venv ~/cloudsec-venv
source ~/cloudsec-venv/bin/activate
pip install checkov prowler
```

---

## 🐳 3. Твой собственный AWS дома без банковской карты (LocalStack)

**LocalStack** запускает настоящий эмулятор сервисов AWS (S3, IAM, EC2, Lambda, STS, CloudTrail) у тебя в Docker:

```bash
# 1. Запустить бесплатный контейнер LocalStack:
docker run --rm -d --name localstack -p 4566:4566 localstack/localstack

# 2. Задать фейковые тестовые ключи (чтобы aws-cli работал локально):
export AWS_ACCESS_KEY_ID="test"
export AWS_SECRET_ACCESS_KEY="test"
export AWS_DEFAULT_REGION="us-east-1"

# 3. Создать свой первый S3-бакет у себя на ПК и загрузить туда файл!
aws --endpoint-url=http://localhost:4566 s3 mb s3://my-local-secure-bucket
echo "secret test data" > test.txt
aws --endpoint-url=http://localhost:4566 s3 cp test.txt s3://my-local-secure-bucket/
aws --endpoint-url=http://localhost:4566 s3 ls s3://my-local-secure-bucket/
```

---

## 🌐 4. Главные бесплатные онлайн-полигоны (в браузере)

1. **`flAWS.cloud`** (http://flaws.cloud/) — 6 уровней реальных дыр AWS (S3, `.git`, EBS-снимки, SSRF ➔ IMDS).
2. **`flAWS2.cloud`** (http://flaws2.cloud/) — 2 ветки: за атакующего (*Attacker*) и за расследователя логов (*Defender*)!
3. **`PwnedLabs.io`** (https://pwnedlabs.io/) — бесплатные сценарии по AWS, Azure, GCP и Kubernetes.
4. **`SadServers.com`** (https://sadservers.com/) — починка сломанных облачных Linux-серверов прямо в браузере.
5. **`Kubernetes Goat`** (https://github.com/madhuakula/kubernetes-goat) — уязвимый учебный кластер K8s в Docker/Minikube.
