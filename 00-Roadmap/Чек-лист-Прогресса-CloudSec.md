# ✅📋 Чек-лист Прогресса Курса Cloud Security (Фазы 0–7)

> Ставь `[x]` вместо `[ ]` прямо в этом файле в Obsidian/редакторе или отмечай галочки на интерактивном сайте [`08-Cloud-Academy-Site/index.html`](../08-Cloud-Academy-Site/index.html) (там прогресс считается автоматически и повышает твой ранг!).

---

## 🛠️ Фаза 0: Физика облака и бесплатный полигон (Неделя 1)
- [ ] Понял простыми словами: облако — это аренда чужих серверов на базе Linux через API (без магии).
- [ ] Установил на свой Linux базовый набор: `git`, `curl`, `jq`, `python3`, `docker`.
- [ ] Установил `awscli`, `terraform` и настроил локальный эмулятор **LocalStack** (либо проверил запуск Python-лаб).
- [ ] Создал в своём будущем проекте строгий `.gitignore`, защищающий `.env`, `*.pem`, `*.tfstate`.

## 🐧 Фаза 1: Linux и Сети глазами облачного безопасника (Недели 2–5)
- [ ] Разобрался, как работают SSH-ключи (`ssh-keygen -t ed25519`), `authorized_keys` и зачем нужна команда `chmod 400`.
- [ ] Понял права доступа Linux (`rwx` / `644` / `755` / `sudo`), службы `systemd` и команду проверки портов `ss -tulnp`.
- [ ] Освоил подсети **CIDR** (`/16`, `/24`, `/32`, `0.0.0.0/0`) и запомнил ключевые порты (`22`, `80`, `443`, `3389`, `5432`, `6379`, `6443`).
- [ ] Прошёл минимум **уровни 0–20 OverTheWire Bandit** и починил **3+ серверов на SadServers**.

## 🐍 Фаза 2: Python, Bash, JSON/YAML и Git (Недели 6–9)
- [ ] Научился читать и фильтровать JSON через `jq` и понимать структуру YAML-конфигов.
- [ ] Освоил базовый Python (словари, списки, работа с файлами, HTTP-запросы `requests`, знакомство с `boto3`).
- [ ] Написал 2–3 простых Bash-скрипта для проверки открытых портов или парсинга логов.
- [ ] Настроил сканирование своего кода на забытые ключи через **Gitleaks** (или pre-commit hook).

## ☁️ Фаза 3: Фундамент Облака — Shared Responsibility, IAM, VPC, S3, KMS (Недели 10–14)
- [ ] Выбрал **одно главное облако** для старта (AWS или Azure) по методике UnixGuy.
- [ ] На 100% понял модель **Shared Responsibility** (IaaS vs PaaS vs SaaS).
- [ ] Разобрался с **IAM**: Root vs User vs Group vs Role, STS-токены (`AssumeRole`), JSON-политики и правило **Explicit Deny > Allow > Default Deny**.
- [ ] Понял архитектуру сети **VPC**: Public / Private / Isolated Subnets, IGW, NAT Gateway и отличие **Security Group (Stateful)** от **NACL (Stateless)**.
- [ ] Понял защиту хранилищ (**S3 Block Public Access**, Bucket Policy) и конвертное шифрование **KMS (Envelope Encryption)**.
- [ ] Запустил и полностью разобрал код **Лабы №1**: [`lab01_s3_and_iam_auditor.py`](../02-Labs/lab01_s3_and_iam_auditor.py).

## 💥 Фаза 4: Атаки на Облака (Red Team глазами защитника) (Недели 15–18)
- [ ] Разложил по шагам реальный взлом **Capital One**: SSRF ➔ `169.254.169.254` (IMDSv1) ➔ кража временных ключей ➔ выгрузка S3.
- [ ] Понял, как **IMDSv2** (`PUT`-токен + запрет прокси/хопов) полностью останавливает этот вектор атаки.
- [ ] Изучил основные векторы **IAM Privilege Escalation** (`iam:PassRole`, `CreatePolicyVersion`, `lambda:UpdateFunctionCode`).
- [ ] Запустил и изучил **Лабу №2**: [`lab02_ssrf_imds_simulator.py`](../02-Labs/lab02_ssrf_imds_simulator.py).
- [ ] Прошёл все **6 уровней `flAWS.cloud`** и минимум первые миссии **`flAWS2.cloud` / `PwnedLabs`**.

## 🐳 Фаза 5: Docker, Kubernetes, Terraform и DevSecOps (Недели 19–22)
- [ ] Понял основные угрозы контейнеров: запуск от `root`, флаг `--privileged`, проброс `/var/run/docker.sock`.
- [ ] Просканировал учебный Docker-образ сканером **Trivy** и устранил `USER root`.
- [ ] Разобрался в архитектуре **Kubernetes** (`Control Plane`, `etcd`, `kubelet`, `Pods`), модели **4C** и защите `RBAC` / `NetworkPolicy`.
- [ ] Написал базовый шаблон инфраструктуры в **Terraform** (`main.tf`) и понял опасность публичного `terraform.tfstate`.
- [ ] Запустил **Лабу №3**: [`lab03_terraform_sec_check.py`](../02-Labs/lab03_terraform_sec_check.py) и исправил все 5 дыр в `sample_vulnerable_main.tf`.

## 📡 Фаза 6: Облачный SIEM, Мониторинг и Авто-реагирование (Недели 23–25)
- [ ] Понял, как работают облачные логи: **CloudTrail** / **Activity Log**, **VPC Flow Logs**, DNS Logs.
- [ ] Разобрался в работе детекторов угроз (**Amazon GuardDuty**, **Microsoft Defender for Cloud**) и SIEM (**Microsoft Sentinel / KQL**, **Security Hub**).
- [ ] Узнал, как работает автоматическая реакция SOAR (`EventBridge + Lambda`) и аудит **Prowler / ScoutSuite** (CIS Benchmark).
- [ ] Запомнил чёткий алгоритм действий SOC-аналитика при утечке AWS Access Key (`Deactivate ➔ Revoke Sessions ➔ CloudTrail Lookup ➔ Cleanup`).

## 🏆 Фаза 7: Бесплатные бейджи, 5 проектов портфолио и Поиск Работы (Недели 26+)
- [ ] Получил минимум **2–3 бесплатных официальных бейджа** (AWS Cloud Quest / Skill Builder, Microsoft Applied Skills, Fortinet FCF/NSE 1–3, Qualys VM).
- [ ] Прошёл **2 бесплатные виртуальные стажировки Forage** (AWS Solutions Architecture / Datacom / AIG / Mastercard).
- [ ] Загрузил и красиво оформил **5 проектов портфолио на GitHub** (схема + README + примеры кода).
- [ ] Составил резюме и профиль LinkedIn под роли **Junior Cloud Ops / Junior SOC Analyst / Junior DevSecOps / Junior Cloud Security**.
