# 💼🏛️ 07. Карьера, Стратегия Входа на Работу (UnixGuy + Marius Poskus) и Готовый Шаблон Резюме

> 🧭 **Связанные разделы:** [[Бесплатная-Замена-Сертификатов|Замена сертификатов ($0)]] • [[06-5-Проектов-Портфолио-и-CTF|5 проектов]] • [[12_free_certs_and_portfolio_path.svg|Схема пути к офферу]]

---

## 🎯 1. Реалистичный план входа в профессию (без сказок)

По честному разбору **UnixGuy (`r86YCwX_iU4`)** и **Marius Poskus (`@mariusposkus0`)**, сразу на позицию *Senior Cloud Security Architect* без коммерческого опыта не берут. Зато есть **4 идеальные стартовые двери**, в которые реально зайти после прохождения нашего курса:

1. **Junior Cloud / DevOps / Systems Engineer** (с сильным уклоном в безопасность: Terraform, Linux, Docker, IAM, сети).
2. **Junior SOC Analyst (Tier 1/2) с облачным уклоном** (работа в SIEM Microsoft Sentinel, чтение логов CloudTrail/Defender, расследование фишинга и утечек ключей).
3. **Junior Vulnerability Management / AppSec / CloudSec Analyst** (сканирование инфраструктуры и контейнеров в Qualys / Trivy / Prowler, контроль исправлений).
4. **Junior GRC / Cloud Compliance Analyst** (аудит облаков по CIS Benchmarks, NIST CSF 2.0, ISO 27001).

Через **6–12 месяцев** на любой из этих позиций ты переходишь на полноценную роль **Cloud Security Engineer** (и уже сама компания оплачивает тебе экзамены `AWS Security Specialty` или `AZ-500`!).

---

## 🛠️ 2. Как бесплатно усилить графу «Опыт и Достижения» (Forage + Бейджи)

Зарегистрируйся бесплатно на **Forage** (https://www.theforage.com/) и пройди 2–3 симуляции (каждая 3–5 часов, абсолютно бесплатно, дают сертификат):
1. **AWS APAC — Solutions Architecture Virtual Experience Program** *(проектирование масштабируемой и безопасной облачной архитектуры в AWS)*.
2. **Datacom / Telstra / AIG — Cybersecurity Virtual Experience** *(анализ угроз, триаж инцидентов, уязвимости Log4j и CISA бюллетени)*.
3. **Mastercard — Cybersecurity Virtual Experience** *(фишинг и повышение осведомлённости сотрудников — GRC)*.

---

## 📄 3. Готовый шаблон резюме (Скопируй и адаптируй под свои проекты)

```text
[ИМЯ И ФАМИЛИЯ]
Junior Cloud Security / DevSecOps & Cloud SOC Specialist
Email: you@example.com | Location: City / Remote
GitHub: github.com/<ТВОЙ_ЛОГИН>/Cloud-Security-Course | LinkedIn: linkedin.com/in/...

SUMMARY
Hands-on cybersecurity & cloud enthusiast focused on securing cloud infrastructure (AWS & Azure), Linux systems, and CI/CD pipelines. Built practical lab projects covering IAM least privilege, VPC network segmentation, Terraform IaC security scanning (Checkov/Gitleaks), container security (Docker/Trivy), and cloud threat detection (CloudTrail, GuardDuty, Microsoft Sentinel KQL).

TECHNICAL SKILLS
• Cloud & IAM: AWS (IAM, STS, VPC, S3, EC2, KMS, CloudTrail, GuardDuty), Azure Basics (Entra ID, NSG, Blob, Sentinel)
• DevSecOps & IaC: Terraform, Docker, Kubernetes Security (4C/RBAC), Checkov, Trivy, Gitleaks, Prowler, GitHub Actions
• OS, Networking & Code: Linux (Arch / Ubuntu), Bash, Python (boto3, security automation), TCP/IP, CIDR, DNS, SSH, TLS, SQL/KQL
• Frameworks & GRC: Shared Responsibility Model, CIS Benchmarks, NIST CSF 2.0, OWASP Cloud-Native Top 10, MITRE ATT&CK Cloud

FREE BADGES & TRAINING
• AWS Skill Builder — Cloud Quest: Cloud Practitioner / AWS Security Knowledge Path
• Microsoft Applied Skills — Cloud & Security Operations (Microsoft Sentinel / Azure)
• Fortinet Training Institute — FCF / FCA Cybersecurity Fundamentals (NSE 1–3)
• Qualys Vulnerability Management Foundation — Certified in CVSS prioritization & remediation

HANDS-ON CLOUD SECURITY PROJECTS (GITHUB PORTFOLIO)
• Hardened AWS VPC & DevSecOps CI/CD Pipeline (Terraform + Checkov + Gitleaks):
  Authored modular Terraform infrastructure enforcing IMDSv2, encrypted EBS/S3 with Block Public Access, and strict Security Groups; integrated automated pre-deploy IaC & secret scanning in GitHub Actions.
• Python Cloud IAM & S3 Security Auditor:
  Developed an automated Python security auditing tool detecting overly permissive IAM policies (Action: "*", iam:PassRole escalation paths) and exposed S3 buckets against CIS best practices.
• Capital One Attack Simulation (SSRF -> IMDSv1 vs IMDSv2 Defense Lab) & flAWS.cloud Writeups:
  Built a local simulation demonstrating metadata credential theft via SSRF on IMDSv1 and remediation using IMDSv2 token/hop restrictions; documented all 6 levels of flAWS.cloud with code-level fixes.
• Container Hardening & Cloud SOC Incident Playbook:
  Hardened Dockerfiles/K8s manifests (non-root user, Trivy zero-critical scan) and authored an AWS Access Key Compromise Incident Response Playbook + Sentinel KQL hunting queries.

VIRTUAL EXPERIENCE PROGRAMS (FORAGE)
• AWS Solutions Architecture & Cybersecurity Analyst Job Simulations (AWS / AIG / Mastercard):
  Designed secure cloud architectures, triaged security alerts, and produced CISA vulnerability remediation guides.

EXPERIENCE
• [Твоя текущая / прошлая работа] | [Годы]
  (Переформулируй через навыки работы с ИТ-системами, базами данных, соблюдением регламентов, конфиденциальностью и решением проблем клиентов!)
```
