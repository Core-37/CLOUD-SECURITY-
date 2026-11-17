window.ACADEMY_DATA = window.ACADEMY_DATA || {};

window.RECALL_FLASHCARDS = [
  { id: "r1", tag: "linux", q: "chmod 400 key.pem — зачем?", a: "Ставит права 'читать только владельцу'. Без этого SSH откажется подключаться к облачному серверу из-за риска кражи ключа!", cmd: "chmod 400 my-cloud-key.pem" },
  { id: "r2", tag: "linux", q: "Как создать современный SSH-ключ?", a: "Создаёт пару Ed25519: публичный замок (.pub) кладём на сервер в ~/.ssh/authorized_keys, приватный оставляем себе.", cmd: "ssh-keygen -t ed25519" },
  { id: "r3", tag: "linux", q: "sudo ss -tulnp — что показывает?", a: "Все открытые порты и процессы на сервере. Если видишь 0.0.0.0:5432 — база открыта наружу!", cmd: "sudo ss -tulnp" },
  { id: "r4", tag: "linux", q: "0.0.0.0:22 vs 127.0.0.1:22 в ss?", a: "127.0.0.1 — только локально с самого сервера; 0.0.0.0 — слушает все интерфейсы (доступно извне).", cmd: "ss -tulnp | grep 0.0.0.0" },
  { id: "r5", tag: "linux", q: "Логи неудачных входов SSH (Arch vs Ubuntu)?", a: "В Arch Linux логи лежат в systemd-журнале; в Ubuntu/Debian — в текстовом файле auth.log.", cmd: "journalctl -u sshd | grep Failed" },
  { id: "r6", tag: "linux", q: "Поиск файлов с битом SUID (PrivEsc)?", a: "Находит программы, запускаемые с правами root (2>/dev/null скрывает ошибки 'Отказано в доступе').", cmd: "find / -perm -4000 -type f 2>/dev/null" },
  { id: "r7", tag: "linux", q: "Где случайно хранят пароли на сервере?", a: "В переменных окружения (env) или скрытых файлах .env. Никогда не пушь .env на GitHub!", cmd: "env | grep -iE 'AWS|AZURE|KEY|SECRET'" },

  { id: "r8", tag: "net", q: "10.0.1.0/24 vs 203.0.113.5/32?", a: "/24 — целый подъезд (256 IP-адресов, одна подсеть Subnet); /32 — ровно 1 конкретный IP (твой личный вход).", cmd: "10.0.0.0/16 = 65536 IP (весь VPC)" },
  { id: "r9", tag: "net", q: "Что такое 0.0.0.0/0 в файрволе?", a: "Весь интернет (любой IP на планете). Для портов 22, 3389 и баз данных (5432, 3306, 6379) — критическая дыра!", cmd: "Заменить на свой IP/32 или SSM" },
  { id: "r10", tag: "net", q: "Главные порты облака (22, 3389, 5432, 6379, 6443, 10250)?", a: "22=SSH, 3389=RDP, 5432=PostgreSQL, 6379=Redis, 6443=K8s API, 10250=Kubelet.", cmd: "Закрывать от 0.0.0.0/0!" },
  { id: "r11", tag: "net", q: "Public Subnet vs Private Subnet?", a: "У Public есть маршрут в Internet Gateway (тут ALB и NAT). У Private НЕТ прямого входа из интернета — здесь серверы и БД!", cmd: "IGW -> Public -> Private -> БД" },
  { id: "r12", tag: "net", q: "Как сервер в Private Subnet качает обновления?", a: "Через NAT Gateway (стоит в Public Subnet). Выпускает наружу за патчами, но снаружи войти нельзя!", cmd: "Private -> NAT GW -> IGW" },
  { id: "r13", tag: "net", q: "Security Group (SG) vs Network ACL (NACL)?", a: "SG — телохранитель у сервера, Stateful (помнит ответ), только Allow. NACL — шлагбаум подсети, Stateless, умеет явный Deny.", cmd: "Забанить плохой IP -> NACL DENY" },
  { id: "r14", tag: "net", q: "Зачем нужен VPC Endpoint?", a: "Частный 'подземный' канал внутри облака: серверы общаются с S3/KMS, не выходя в публичный интернет.", cmd: "Gateway/Interface VPC Endpoint" },

  { id: "r15", tag: "iam", q: "Правило оценки прав в IAM?", a: "1) По умолчанию ВСЁ запрещено; 2) Явный Explicit Deny ВСЕГДА побеждает любой Allow; 3) Иначе нужен Explicit Allow.", cmd: "Deny > Allow > Implicit Deny" },
  { id: "r16", tag: "iam", q: "IAM User vs IAM Role (и по каким буквам узнать ключ)?", a: "User = постоянный ключ AKIA...; Role = временный токен STS, начинается с ASIA... + нужен SessionToken!", cmd: "aws sts get-caller-identity" },
  { id: "r17", tag: "iam", q: "Что делать с Root-аккаунтом облака?", a: "Включить MFA, удалить Access Key (если были) и убрать логин в сейф. Повседневную работу вести через IAM Role / SSO!", cmd: "Root + Hardware/TOTP MFA" },
  { id: "r18", tag: "iam", q: "Опасность 'Action': '*', 'Resource': '*'?", a: "Это 'Права Бога' (AdministratorAccess). Нарушает принцип Least Privilege — при утечке ключа заберут весь аккаунт.", cmd: "python3 lab01_s3_and_iam_auditor.py" },
  { id: "r19", tag: "iam", q: "Зачем блок 'Condition' в JSON-политике?", a: "Ставит доп. проверку: пускать только с MFA (aws:MultiFactorAuthPresent) или только из IP офиса (aws:SourceIp).", cmd: "\"Condition\": {\"Bool\": {\"aws:MultiFactorAuthPresent\": \"true\"}}" },
  { id: "r20", tag: "iam", q: "Как работает Envelope Encryption в KMS?", a: "Главный ключ CMK сидит в сейфе HSM и шифрует лишь одноразовый Data Key (DEK), а сам файл зашифрован этим быстрым DEK.", cmd: "Нужно право kms:Decrypt в IAM!" },
  { id: "r21", tag: "iam", q: "Вход на облачный сервер БЕЗ порта 22?", a: "AWS SSM Session Manager (через IAM-роль), Azure Bastion или GCP IAP — шифрованный вход без открытых SSH-портов.", cmd: "aws ssm start-session --target i-..." },

  { id: "r22", tag: "s3", q: "4 барьера защиты S3-бакета?", a: "1) Block Public Access на весь аккаунт; 2) Откл. ACL (BucketOwnerEnforced); 3) Шифр SSE-KMS + только HTTPS; 4) Versioning.", cmd: "aws s3 ls s3://bucket --no-sign-request" },
  { id: "r23", tag: "s3", q: "В чём ловушка группы AuthenticatedUsers в S3?", a: "Это НЕ сотрудники компании! Это ЛЮБОЙ человек на планете со своим бесплатным аккаунтом AWS (Level 2 flAWS.cloud).", cmd: "Никогда не выдавать доступ AuthenticatedUsers!" },
  { id: "r24", tag: "s3", q: "Аналоги AWS S3 в Azure и GCP?", a: "В Azure — Azure Blob Storage (уровень доступа должен быть Private!). В Google Cloud — Cloud Storage (GCS).", cmd: "allow_blob_public_access = false" },
  { id: "r25", tag: "s3", q: "Зачем в Bucket Policy требовать aws:SecureTransport?", a: "Запрещает скачивание файлов по открытому HTTP — только шифрованный HTTPS (TLS)!", cmd: "\"Condition\": {\"Bool\": {\"aws:SecureTransport\": \"false\"}}" },

  { id: "r26", tag: "attack", q: "169.254.169.254 — что это за секретный адрес?", a: "Служба метаданных облачного сервера (IMDS). Отдаёт временные ключи IAM-роли, надетой на этот сервер!", cmd: "http://169.254.169.254/latest/meta-data/iam/" },
  { id: "r27", tag: "attack", q: "Как взломали Capital One (100+ млн данных)?", a: "Через баг SSRF заставили сервер сделать GET на 169.254.169.254 (старый IMDSv1), украли токены WAF-роли и выкачали S3.", cmd: "python3 lab02_ssrf_imds_simulator.py" },
  { id: "r28", tag: "attack", q: "Как IMDSv2 блокирует атаку SSRF -> IMDS?", a: "Требует сначала PUT-запрос за токеном + TTL, не пускает прокси (X-Forwarded-For) и режет прыжки (Hop Limit=1) -> 401!", cmd: "http_tokens = \"required\" (Terraform)" },
  { id: "r29", tag: "attack", q: "Топ-3 комбинации IAM Privilege Escalation?", a: "1) iam:PassRole + ec2:RunInstances; 2) iam:CreatePolicyVersion; 3) iam:AttachUserPolicy на самого себя.", cmd: "Ограничивай Resource в PassRole!" },
  { id: "r30", tag: "attack", q: "Что такое Subdomain Takeover?", a: "Старая CNAME-запись компании ведёт на удалённый S3-бакет или Azure App — хакер регистрирует его имя на себя!", cmd: "Удаляй DNS до удаления ресурса!" },
  { id: "r31", tag: "attack", q: "Утёк ключ AWS в публичный Git — первые 3 шага?", a: "1) Срочно Deactivate (НЕ удаляй сразу!) + Revoke sessions; 2) Проверь CloudTrail во ВСЕХ регионах; 3) Удали из истории Git (git filter-repo).", cmd: "Боты находят ключи на GitHub за ~15 сек!" },
  { id: "r32", tag: "attack", q: "Почему публичные EBS/RDS снапшоты опасны?", a: "Любой аккаунт AWS может подключить чужой публичный снимок диска к своему серверу и прочитать всю БД!", cmd: "aws ec2 enable-snapshot-block-public-access" },

  { id: "r33", tag: "devsecops", q: "Почему флаг --privileged в Docker смертелен?", a: "Контейнер видит устройства хоста: внутри можно смонтировать диск сервера (/dev/sda1) и стать root на хосте!", cmd: "privileged: false" },
  { id: "r34", tag: "devsecops", q: "Чем опасен проброс /var/run/docker.sock?", a: "Контейнер получает власть над самим Docker-демоном хоста и запускает новый контейнер с корнем / сервера!", cmd: "Не монтируй docker.sock в прод!" },
  { id: "r35", tag: "devsecops", q: "Модель 4C безопасности Kubernetes?", a: "Cloud (VPC/IAM) -> Cluster (RBAC/etcd/NetworkPolicy) -> Container (non-root/Trivy) -> Code (SAST).", cmd: "Запомни порядок от внешнего к коду!" },
  { id: "r36", tag: "devsecops", q: "Что хранится в базе etcd в Kubernetes?", a: "ВСЕ конфиги и секреты (пароли/токены) кластера! Обязательно шифровать Encryption at Rest и закрывать от сети.", cmd: "Порт API :6443, Kubelet :10250" },
  { id: "r37", tag: "devsecops", q: "Почему нельзя коммитить terraform.tfstate на GitHub?", a: "Внутри .tfstate лежат все IP, структура и часто пароли/ключи от созданных баз в открытом виде!", cmd: "Хранить в зашифрованном S3 Backend" },
  { id: "r38", tag: "devsecops", q: "Разница: Gitleaks vs Checkov vs Trivy vs Prowler?", a: "Gitleaks=ключи в Git; Checkov=ошибки в Terraform до деплоя; Trivy=CVE в Docker; Prowler=аудит живого облака по CIS.", cmd: "checkov -d . && trivy image app" },
  { id: "r39", tag: "devsecops", q: "Что такое OIDC для GitHub Actions -> AWS?", a: "Позволяет GitHub деплоить в облако по одноразовому токену БЕЗ создания вечных паролей и Access Key!", cmd: "Zero long-lived credentials!" },
  { id: "r40", tag: "devsecops", q: "AWS CloudTrail vs GuardDuty vs Microsoft Sentinel?", a: "CloudTrail = камера всех API-логов; GuardDuty = умный детектор угроз; Sentinel = облачный SIEM на языке KQL.", cmd: "aws cloudtrail lookup-events" },
  { id: "r41", tag: "devsecops", q: "Как работает SOAR авто-изоляция сервера в AWS?", a: "GuardDuty шлёт тревогу -> EventBridge перехватывает -> Lambda вешает пустую Security Group 'Карантин' за 3 секунды.", cmd: "Event-driven Incident Response" },
  { id: "r42", tag: "devsecops", q: "Shared Responsibility Model в 1 предложении?", a: "Облако защищает САМО облако (железо, ЦОД, гипервизор), а ты защищаешь всё ВНУТРИ облака (Linux, порты, IAM, данные).", cmd: "Security OF vs IN the Cloud" },
  { id: "r43", tag: "devsecops", q: "Чем jq полезен облачному безопаснику?", a: "Позволяет в 1 команду достать нужные IP, бакеты или роли из гигантских JSON-ответов aws-cli.", cmd: "aws iam list-users | jq '.Users[].UserName'" },
  { id: "r44", tag: "devsecops", q: "Зачем нужна команда terraform plan до apply?", a: "Показывает заранее, какие ресурсы создадутся или УДАЛЯТСЯ в облаке, чтобы не сломать продакшн.", cmd: "terraform plan" },
  { id: "r45", tag: "devsecops", q: "Главный совет Marius Poskus вместо покупки сертификатов?", a: "'Proof over Paper': бесплатные бейджи + 5 воспроизводимых проектов на GitHub (Terraform + Checkov + Python + SIEM) дают работу!", cmd: "Портфолио > стопка бумаг" }
];

window.ACADEMY_DATA.phase7 = {
  id: "phase7",
  title: "🏆 Фаза 7: $0 Сертификаты, Проекты & Карьера",
  badge: "Бесплатная замена + Оффер",
  html: `
    <div class="hero-banner">
      <div class="hero-badge-row">
        <span class="badge badge-emerald">💸 $0 Замена Сертификатов</span>
        <span class="badge badge-cyan">🚀 5 Проектов GitHub (Marius Poskus)</span>
        <span class="badge badge-amber">💼 Forage + Резюме (UnixGuy)</span>
      </div>
      <h1 class="hero-title">Фаза 7 — Бесплатная Замена Сертификатов, 5 Проектов Портфолио и Выход на Работу</h1>
      <p class="hero-desc">
        На старте мы НЕ тратим $100–$400 на платные экзамены! Вместо них берём бесплатные официальные бейджи от Amazon, Microsoft, Fortinet и Qualys, проходим виртуальные стажировки Forage и показываем 5 реальных проектов на GitHub.
      </p>
    </div>

    <div class="diagram-card">
      <img src="../05-Assets/12_free_certs_and_portfolio_path.svg" alt="Бесплатная замена сертификатов и путь к офферу" onclick="openLightbox(this.src)">
      <div class="diagram-caption">Таблица бесплатной замены платных экзаменов ($0 вместо $2,000+) и 5 проектов на GitHub</div>
    </div>

    <h2 class="section-heading">💸 1. Матрица: Платный Сертификат ➔ Бесплатная Замена ($0)</h2>
    <div class="table-wrap">
      <table class="cyber-table">
        <thead><tr><th>Платный сертификат (Игнорируем сейчас)</th><th>Бесплатная замена ($0 — Знания + Бейдж)</th></tr></thead>
        <tbody>
          <tr><td><strong>CompTIA Network+ &amp; Security+</strong> (~$770)</td><td>Полные курсы <strong>Professor Messer</strong> (YouTube) + бесплатные сертификаты <a class="res-link" href="https://training.fortinet.com/" target="_blank">Fortinet FCF / FCA (NSE 1–3)</a> + бесплатные материалы обучения ISC2 CC</td></tr>
          <tr><td><strong>AWS Cloud Practitioner &amp; Security Specialty</strong> ($100 + $300)</td><td><a class="res-link" href="https://explore.skillbuilder.aws/" target="_blank">AWS Skill Builder</a> (бесплатные <strong>Knowledge Badges</strong> + игра <strong>Cloud Quest</strong>) + <a class="res-link" href="https://www.awseducate.com/" target="_blank">AWS Educate</a> + аудит курса AWS на Coursera (кнопка <em>Audit</em>)</td></tr>
          <tr><td><strong>Microsoft AZ-900 / SC-200 / AZ-500</strong> (~$165 каждый)</td><td><a class="res-link" href="https://learn.microsoft.com/" target="_blank">Microsoft Learn</a> + <strong>Microsoft Applied Skills</strong> (бесплатные практические лабы-экзамены прямо в браузере с выдачей официального бейджа!)</td></tr>
          <tr><td><strong>CCSK / CCSP</strong> ($395–$599)</td><td>Официальный PDF <strong>CSA Security Guidance</strong> (бесплатен) + бесплатный сертификат <a class="res-link" href="https://www.qualys.com/training/" target="_blank">Qualys Vulnerability Management Foundation</a></td></tr>
          <tr><td><strong>Платные лабы и буткемпы</strong> ($1,500–$10,000)</td><td><strong>flAWS.cloud</strong> + <strong>flAWS2.cloud</strong> + <strong>PwnedLabs (Free)</strong> + <strong>Kubernetes Goat</strong> + <strong>SadServers</strong> + стажировки <a class="res-link" href="https://www.theforage.com/" target="_blank">Forage</a></td></tr>
        </tbody>
      </table>
    </div>

    <h2 class="section-heading">🚀 2. Пять Проектов, которые нужно выложить в свой новый GitHub-репозиторий</h2>
    <div class="card">
      <ol style="margin-left:20px; font-size:0.9rem;">
        <li><strong>Hardened AWS VPC &amp; EC2 Baseline в Terraform + DevSecOps CI/CD:</strong> код безопасной сети (Public/Private/Isolated), закрытые S3, включённый <code class="inline-code">IMDSv2</code> и автоматическая проверка через GitHub Actions (<strong>Checkov + Gitleaks</strong>).</li>
        <li><strong>Python Cloud IAM &amp; S3 Security Auditor:</strong> доработай нашу Лабу №1 (<code class="inline-code">lab01_s3_and_iam_auditor.py</code>) для работы с <code class="inline-code">boto3</code> на LocalStack.</li>
        <li><strong>Capital One SSRF ➔ IMDSv1 vs IMDSv2 Lab + Writeups flAWS.cloud:</strong> разбор всех 6 уровней с кодом исправления и локальный симулятор (Лаба №2).</li>
        <li><strong>Hardened Docker &amp; Kubernetes Pipeline:</strong> сравнение уязвимого Dockerfile (root) и защищённого (non-root + Trivy 0 Critical CVE + NetworkPolicy).</li>
        <li><strong>Cloud SOC Playbook &amp; Sentinel KQL Rules:</strong> пошаговый план реакции на утечку ключа + отчёт аудита Prowler + KQL-запросы для поиска атак.</li>
      </ol>
    </div>

    <h2 class="section-heading">📄 3. Готовый шаблон резюме + Виртуальные стажировки Forage</h2>
    <div class="blue-box" style="margin-bottom:14px;">
      <strong>💼 Бесплатные виртуальные стажировки на <a class="res-link" href="https://www.theforage.com/" target="_blank">TheForage.com</a> (3–4 часа каждая):</strong><br>
      Пройди <strong>AWS APAC Solutions Architecture</strong> + <strong>AIG / Mastercard / Datacom Cybersecurity</strong> — и добавь их в раздел <em>Virtual Experience</em>!
    </div>

    <div class="code-wrap">
      <div class="code-header"><span>Resume Template — Junior Cloud Security / DevSecOps / Cloud SOC</span><button class="copy-btn" onclick="copyCode(this)">Копировать</button></div>
      <pre class="code-block">[Имя и Фамилия] | Junior Cloud Security &amp; DevSecOps Specialist
Email: your.email@example.com | Location: Remote | GitHub: github.com/&lt;USER&gt;/Cloud-Security-Course

SUMMARY
Cloud &amp; cybersecurity practitioner focused on securing AWS/Azure infrastructure, Linux systems, and DevSecOps CI/CD pipelines. Built practical labs covering IAM least privilege, VPC segmentation, Terraform IaC scanning (Checkov/Gitleaks), container hardening (Trivy), and cloud threat detection (CloudTrail, GuardDuty, Microsoft Sentinel KQL).

FREE CREDENTIALS &amp; TRAINING
• AWS Skill Builder: Cloud Quest (Cloud Practitioner) &amp; Security Knowledge Paths
• Microsoft Applied Skills: Cloud &amp; SIEM Security Operations (Sentinel / Azure)
• Fortinet Training Institute: FCF / FCA Cybersecurity Fundamentals (NSE 1–3)
• Qualys Vulnerability Management Foundation

HANDS-ON GITHUB PROJECTS
• Hardened Terraform VPC &amp; DevSecOps Pipeline (Checkov + Gitleaks + IMDSv2 enforced)
• Python Cloud IAM &amp; S3 Security Auditor (Least Privilege &amp; CIS Audit)
• SSRF to IMDSv1/IMDSv2 Attack Simulation &amp; flAWS.cloud Writeups
• Container Security (Non-root Docker, Trivy Zero-Critical) &amp; Cloud SOC KQL Playbook</pre>
    </div>
  `
};

window.ACADEMY_DATA.sources = {
  id: "sources",
  title: "🌍 Все Проверенные Источники Мира",
  badge: "Университеты • GitHub • Linux • Видео",
  html: `
    <div class="hero-banner">
      <div class="hero-badge-row">
        <span class="badge badge-cyan">🎓 MIT, Stanford, Harvard, Coursera</span>
        <span class="badge badge-purple">🐙 GitHub Open-Source</span>
        <span class="badge badge-emerald">🐧 Linux &amp; Cloud Labs</span>
        <span class="badge badge-amber">📜 Стандарты CSA, OWASP, MITRE</span>
      </div>
      <h1 class="hero-title">Каталог Всех Проверенных Источников (100% Бесплатный Доступ)</h1>
      <p class="hero-desc">
        Никакой воды и сомнительных инфокурсов — только официальные университетские курсы (через <strong>Free Audit</strong>), проверенные GitHub-репозитории, документация и реальные тренажёры.
      </p>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-title">🎓 1. Университеты (Бесплатно / Free Audit)</div>
        <ul style="margin-left:18px; font-size:0.88rem;">
          <li><strong>MIT 6.858 — Computer Systems Security:</strong> <a class="res-link" href="https://ocw.mit.edu/" target="_blank">ocw.mit.edu</a> — изоляция, контейнеры, сети, криптография.</li>
          <li><strong>Stanford CS155 — Computer &amp; Network Security:</strong> <a class="res-link" href="https://cs155.stanford.edu/" target="_blank">cs155.stanford.edu</a> — лекции и конспекты Стэнфорда.</li>
          <li><strong>Univ. of Colorado — Cloud Computing Security (Coursera Audit):</strong> <a class="res-link" href="https://www.coursera.org/" target="_blank">coursera.org</a> — жми Enroll ➔ мелкую ссылку <em>Audit</em>!</li>
          <li><strong>Harvard CS50P (Python с нуля бесплатно):</strong> <a class="res-link" href="https://cs50.harvard.edu/python/" target="_blank">cs50.harvard.edu/python</a>.</li>
        </ul>
      </div>

      <div class="card">
        <div class="card-title">🎥 2. Видео, Каналы и Твои Видео-Ориентиры</div>
        <ul style="margin-left:18px; font-size:0.88rem;">
          <li><strong>Marius Poskus (@mariusposkus0):</strong> <a class="res-link" href="https://www.tiktok.com/@mariusposkus0" target="_blank">TikTok</a> — стратегия CISO «Proof over Paper».</li>
          <li><strong>UnixGuy (FASTEST Way to Learn Cloud Security):</strong> <a class="res-link" href="https://www.youtube.com/watch?v=r86YCwX_iU4" target="_blank">YouTube (r86YCwX_iU4)</a> — база ИТ ➔ 1 облако ➔ ИБ.</li>
          <li><strong>Professor Messer (Network+ &amp; Security+ бесплатно):</strong> <a class="res-link" href="https://www.professormesser.com/" target="_blank">professormesser.com</a>.</li>
          <li><strong>John Savill (Azure &amp; Sentinel):</strong> <a class="res-link" href="https://www.youtube.com/@NTFAQGuy" target="_blank">YouTube @NTFAQGuy</a>.</li>
          <li><strong>TechWorld with Nana (Docker/K8s/Terraform):</strong> <a class="res-link" href="https://www.youtube.com/@TechWorldwithNana" target="_blank">YouTube @TechWorldwithNana</a>.</li>
        </ul>
      </div>

      <div class="card">
        <div class="card-title">🐙 3. Лучшие GitHub-Репозитории и Вики</div>
        <ul style="margin-left:18px; font-size:0.88rem;">
          <li><a class="res-link" href="https://github.com/farhanashrafdev/90DaysOfCyberSecurity" target="_blank">farhanashrafdev/90DaysOfCyberSecurity</a> — 90-дневный план.</li>
          <li><a class="res-link" href="https://github.com/Hack-with-Github/Awesome-Hacking" target="_blank">Hack-with-Github/Awesome-Hacking</a> — библия утилит ИБ.</li>
          <li><a class="res-link" href="https://hackingthe.cloud/" target="_blank">Hacking the Cloud</a> — лучшая энциклопедия атак на AWS/Azure/GCP.</li>
          <li><a class="res-link" href="https://github.com/RhinoSecurityLabs/cloudgoat" target="_blank">RhinoSecurityLabs/cloudgoat</a> — уязвимая AWS-песочница.</li>
          <li><a class="res-link" href="https://github.com/madhuakula/kubernetes-goat" target="_blank">madhuakula/kubernetes-goat</a> — уязвимый кластер K8s.</li>
          <li><a class="res-link" href="https://learntocloud.guide/" target="_blank">learntocloud.guide</a> — пошаговый открытый учебник облаков.</li>
        </ul>
      </div>

      <div class="card">
        <div class="card-title">🐧 4. Linux-Полигоны, Стандарты и Лабы</div>
        <ul style="margin-left:18px; font-size:0.88rem;">
          <li><strong>Linux:</strong> <a class="res-link" href="https://overthewire.org/wargames/bandit/" target="_blank">OverTheWire Bandit</a> • <a class="res-link" href="https://sadservers.com/" target="_blank">SadServers</a> • <a class="res-link" href="https://wiki.archlinux.org/" target="_blank">ArchWiki</a></li>
          <li><strong>Облачные CTF:</strong> <a class="res-link" href="http://flaws.cloud/" target="_blank">flAWS.cloud</a> • <a class="res-link" href="http://flaws2.cloud/" target="_blank">flAWS2.cloud</a> • <a class="res-link" href="https://pwnedlabs.io/" target="_blank">PwnedLabs</a></li>
          <li><strong>Стандарты:</strong> <a class="res-link" href="https://attack.mitre.org/matrices/enterprise/cloud/" target="_blank">MITRE ATT&amp;CK Cloud</a> • <a class="res-link" href="https://cloudsecurityalliance.org/" target="_blank">CSA Guidance</a> • <a class="res-link" href="https://owasp.org/" target="_blank">OWASP Cloud/K8s Top 10</a></li>
        </ul>
      </div>
    </div>
  `
};

window.ACADEMY_DATA.analogies = {
  id: "analogies",
  title: "💡 Банк Бытовых Аналогий (Понятно с 1-го раза)",
  badge: "18+ Живых Примеров",
  html: `
    <div class="hero-banner">
      <div class="hero-badge-row">
        <span class="badge badge-amber">🏠 Сложное ➔ Простыми словами</span>
        <span class="badge badge-cyan">🔍 Фильтр по темам</span>
      </div>
      <h1 class="hero-title">Банк Аналогий из Реальной Жизни: Вся Суть Cloud Security без Заумных Терминов</h1>
      <p class="hero-desc">Если какой-то термин кажется сухим — посмотри сюда! Каждая облачная технология — это просто правило из обычной жизни.</p>
    </div>

    <div style="margin-bottom:18px; display:flex; gap:8px; flex-wrap:wrap;">
      <button class="btn-action" onclick="filterAnalogies('all')">Все</button>
      <button class="btn-action" onclick="filterAnalogies('linux')">🐧 Linux &amp; Сети</button>
      <button class="btn-action" onclick="filterAnalogies('iam')">🔑 IAM &amp; Ответственность</button>
      <button class="btn-action" onclick="filterAnalogies('net')">🌐 VPC &amp; S3</button>
      <button class="btn-action" onclick="filterAnalogies('attack')">💥 Атаки &amp; Защита</button>
    </div>

    <div class="grid-2" id="analogyGrid">
      <div class="card analogy-card" data-cat="linux"><div class="card-title">⚡ 1. Облако vs Свой сервер</div><p>Свой сервер — бензиновый генератор на балконе (сам заправляй и чини). Облако — розетка от городской электростанции: включил 100 ламп на час и заплатил по счётчику.</p></div>
      <div class="card analogy-card" data-cat="linux"><div class="card-title">🔑 2. Публичный vs Приватный SSH-ключ</div><p>Публичный ключ (<code class="inline-code">.pub</code>) — открытый навесной замок, который ты вешаешь на дверь облачного сервера. Приватный (<code class="inline-code">.pem</code>) — единственный ключ от него у тебя в кармане (права <code class="inline-code">chmod 400</code>).</p></div>
      <div class="card analogy-card" data-cat="linux"><div class="card-title">🏢 3. Подсети CIDR (/16, /24, /32)</div><p><code class="inline-code">/16</code> — весь жилой квартал (VPC, 65 536 адресов). <code class="inline-code">/24</code> — один подъезд (Subnet, 256 квартир). <code class="inline-code">/32</code> — одна твоя квартира. <code class="inline-code">0.0.0.0/0</code> — все 8 миллиардов человек на Земле!</p></div>
      <div class="card analogy-card" data-cat="iam"><div class="card-title">🏨 4. Shared Responsibility (IaaS / PaaS / SaaS)</div><p>On-Prem = свой дом (сам чинишь крышу и замки). IaaS = пустая квартира без мебели (стены облака, но замки и патчи Linux — твои!). PaaS = квартира с ремонтом. SaaS = номер в отеле (отвечаешь за то, кому отдал ключ).</p></div>
      <div class="card analogy-card" data-cat="iam"><div class="card-title">🎭 5. IAM User (AKIA) vs IAM Role (ASIA)</div><p>User — вечный пропуск на шее. Role — временная «волшебная шляпа», которую надевает сервер: каждый час служба STS выдаёт новый одноразовый бейдж с таймером самоуничтожения.</p></div>
      <div class="card analogy-card" data-cat="iam"><div class="card-title">⛔ 6. Правило оценки IAM (Explicit Deny)</div><p>Даже если 10 начальников написали тебе на пропуске «Разрешить всё», но 1 охранник поставил штамп «ЗАПРЕТИТЬ удаление» — дверь не откроется никогда.</p></div>
      <div class="card analogy-card" data-cat="net"><div class="card-title">🥋 7. Security Group vs Network ACL</div><p>Security Group — личный телохранитель у двери квартиры (Stateful: если впустил гостя, выпустит обратно сам). NACL — шлагбаум на въезде в квартал (Stateless: проверяет и въезд, и выезд, но умеет банить плохие номера машин!).</p></div>
      <div class="card analogy-card" data-cat="net"><div class="card-title">🔁 8. NAT Gateway в Private Subnet</div><p>Окошко выдачи заказов наружу с глухим односторонним стеклом: серверы изнутри могут сходить за обновлениями пакетов, но ни один хакер с улицы зайти внутрь не сможет.</p></div>
      <div class="card analogy-card" data-cat="net"><div class="card-title">✉️ 9. Шифрование KMS (Envelope Encryption)</div><p>Тяжёлый несгораемый сейф (KMS HSM) не таскают к каждому документу: внутри сейфа хранится мастер-ключ, которым лишь запечатывают одноразовые ключики от конвертов с файлами.</p></div>
      <div class="card analogy-card" data-cat="attack"><div class="card-title">☎️ 10. Взлом Capital One (SSRF ➔ IMDSv1)</div><p>Посетитель просит секретаря у окна: «Позвони по внутреннему номеру 169.254.169.254 и зачитай код сейфа вслух!». В старом IMDSv1 секретарь доверчиво диктовал ключи. В IMDSv2 ввели пароль-токен и запрет переадресации!</p></div>
      <div class="card analogy-card" data-cat="attack"><div class="card-title">🪧 11. Subdomain Takeover</div><p>Магазин съехал из торгового центра, но забыл снять фирменную вывеску у входа. Мошенник арендовал пустой павильон и принимает покупателей под чужим брендом.</p></div>
      <div class="card analogy-card" data-cat="attack"><div class="card-title">🐳 12. Контейнер Docker --privileged / docker.sock</div><p>Поселился в изолированной комнате, но арендодатель случайно оставил в твоей тумбочке ключи от котельной и пульт управления всем домом — ты тут же захватываешь всё здание.</p></div>
    </div>
  `
};

window.ACADEMY_DATA.commands = {
  id: "commands",
  title: "⇄ Переводчик Облаков и Команд",
  badge: "AWS • Azure • GCP • Linux",
  html: `
    <div class="hero-banner">
      <div class="hero-badge-row">
        <span class="badge badge-amber">🟠 Amazon AWS</span>
        <span class="badge badge-blue">🔵 Microsoft Azure</span>
        <span class="badge badge-emerald">🟢 Google Cloud</span>
        <span class="badge badge-cyan">🐧 Arch / Ubuntu</span>
      </div>
      <h1 class="hero-title">Розеттский Камень Облаков + Справочник Команд Безопасника</h1>
      <p class="hero-desc">Выучи одно облако — и переводи термины на остальные за секунду! Плюс мгновенный поиск команд ниже.</p>
    </div>

    <div class="diagram-card">
      <img src="../05-Assets/10_aws_vs_azure_vs_gcp_rosetta_map.svg" alt="Розеттский камень AWS Azure GCP" onclick="openLightbox(this.src)">
      <div class="diagram-caption">Нажми на таблицу сравнения сервисов AWS ↔ Microsoft Azure ↔ Google Cloud</div>
    </div>

    <div class="card">
      <input type="text" class="search-input" style="max-width:100%; margin-bottom:14px;" placeholder="🔎 Фильтр команд (например: s3, iam, trivy, checkov, pacman, ss, cloudtrail, prowler)..." oninput="filterCommandTable(this.value)">
      <div class="table-wrap" style="margin:0;">
        <table class="cyber-table" id="cmdMasterTable">
          <thead><tr><th>Область</th><th>Задача</th><th>Команда (CLI / Терминал)</th></tr></thead>
          <tbody>
            <tr><td>Linux</td><td>Защитить приватный ключ перед SSH</td><td><code class="inline-code">chmod 400 key.pem &amp;&amp; ssh -i key.pem ubuntu@IP</code></td></tr>
            <tr><td>Linux</td><td>Проверить открытые порты и процессы</td><td><code class="inline-code">sudo ss -tulnp</code></td></tr>
            <tr><td>Linux (Arch/Ubuntu)</td><td>Поставить Docker и jq</td><td><code class="inline-code">sudo pacman -S docker jq</code> / <code class="inline-code">sudo apt install docker.io jq</code></td></tr>
            <tr><td>AWS CLI</td><td>Узнать под каким юзером/ролью я сейчас</td><td><code class="inline-code">aws sts get-caller-identity</code></td></tr>
            <tr><td>AWS CLI</td><td>Проверить S3-бакет анонимно (без ключей)</td><td><code class="inline-code">aws s3 ls s3://bucket-name --no-sign-request</code></td></tr>
            <tr><td>AWS CLI</td><td>Найти открытые на мир 0.0.0.0/0 Security Groups</td><td><code class="inline-code">aws ec2 describe-security-groups --filters Name=ip-permission.cidr,Values='0.0.0.0/0'</code></td></tr>
            <tr><td>AWS CLI</td><td>Посмотреть последние API-события в CloudTrail</td><td><code class="inline-code">aws cloudtrail lookup-events --max-results 20</code></td></tr>
            <tr><td>Azure CLI</td><td>Проверить публичность Blob Storage аккаунтов</td><td><code class="inline-code">az storage account list --query "[].{name:name,pub:allowBlobPublicAccess}"</code></td></tr>
            <tr><td>Azure CLI</td><td>Проверить правила файрволов NSG</td><td><code class="inline-code">az network nsg list -o table</code></td></tr>
            <tr><td>DevSecOps</td><td>Найти забытые секреты и ключи в Git</td><td><code class="inline-code">gitleaks detect --source . -v</code></td></tr>
            <tr><td>DevSecOps</td><td>Проверить код Terraform до деплоя</td><td><code class="inline-code">checkov -d ./terraform/</code></td></tr>
            <tr><td>DevSecOps</td><td>Найти критические CVE в Docker-образе</td><td><code class="inline-code">trivy image --severity HIGH,CRITICAL my-app:latest</code></td></tr>
            <tr><td>CSPM Аудит</td><td>Полный аудит живого AWS/Azure по стандартам CIS</td><td><code class="inline-code">prowler aws</code> / <code class="inline-code">prowler azure --az-cli-auth</code></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `
};

window.ACADEMY_DATA.gallery = {
  id: "gallery",
  title: "🖼️ Галерея Схем (12 Путей) & Лабы",
  badge: "12 Схем + Файлы",
  html: `
    <div class="hero-banner">
      <div class="hero-badge-row">
        <span class="badge badge-cyan">🖼️ Все 12 Визуальных Схем</span>
        <span class="badge badge-emerald">🧪 3 Локальных Python-Лабы</span>
        <span class="badge badge-amber">✅ Бэкап Прогресса</span>
      </div>
      <h1 class="hero-title">Галерея Всех 12 Визуальных Схем, Путей Атак и Лабораторных Файлов</h1>
      <p class="hero-desc">Кликни по любой картинке, чтобы увеличить её на весь экран! Все файлы открываются и в Obsidian, и на GitHub.</p>
    </div>

    <div class="card" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
      <span><strong>⚙️ Управление твоим прогрессом курса:</strong></span>
      <div style="display:flex; gap:8px;">
        <button class="btn-action" onclick="exportProgress()">💾 Скачать бэкап прогресса (JSON)</button>
        <button class="btn-action" onclick="resetProgress()">🔄 Сбросить галочки</button>
      </div>
    </div>

    <div class="grid-3">
      <div class="diagram-card"><img src="../05-Assets/01_cloud_security_roadmap_zero_to_hero.svg" onclick="openLightbox(this.src)" alt="1"><div class="diagram-caption">1. Полный маршрут Cloud Security с нуля (Фазы 0–7)</div></div>
      <div class="diagram-card"><img src="../05-Assets/02_shared_responsibility_model.svg" onclick="openLightbox(this.src)" alt="2"><div class="diagram-caption">2. Модель разделения ответственности (IaaS/PaaS/SaaS)</div></div>
      <div class="diagram-card"><img src="../05-Assets/03_iam_architecture_and_privesc_path.svg" onclick="openLightbox(this.src)" alt="3"><div class="diagram-caption">3. Архитектура IAM и путь атаки Privilege Escalation</div></div>
      <div class="diagram-card"><img src="../05-Assets/04_cloud_network_vpc_architecture.svg" onclick="openLightbox(this.src)" alt="4"><div class="diagram-caption">4. Путь пакета в сети VPC (SG vs NACL, Public/Private)</div></div>
      <div class="diagram-card"><img src="../05-Assets/05_ssrf_to_imds_attack_path.svg" onclick="openLightbox(this.src)" alt="5"><div class="diagram-caption">5. Взлом Capital One (SSRF ➔ IMDSv1) и защита IMDSv2</div></div>
      <div class="diagram-card"><img src="../05-Assets/06_s3_storage_misconfig_and_encryption.svg" onclick="openLightbox(this.src)" alt="6"><div class="diagram-caption">6. Хранилища S3/Blob (4 рубежа) и KMS Envelope Encryption</div></div>
      <div class="diagram-card"><img src="../05-Assets/07_containers_docker_kubernetes_security.svg" onclick="openLightbox(this.src)" alt="7"><div class="diagram-caption">7. Контейнеры Docker &amp; K8s (4C и 3 пути побега)</div></div>
      <div class="diagram-card"><img src="../05-Assets/08_terraform_iac_devsecops_pipeline.svg" onclick="openLightbox(this.src)" alt="8"><div class="diagram-caption">8. Конвейер DevSecOps &amp; Terraform (Shift-Left)</div></div>
      <div class="diagram-card"><img src="../05-Assets/09_cloud_siem_detection_incident_path.svg" onclick="openLightbox(this.src)" alt="9"><div class="diagram-caption">9. Облачный SIEM (CloudTrail/GuardDuty/Sentinel) и SOAR</div></div>
      <div class="diagram-card"><img src="../05-Assets/10_aws_vs_azure_vs_gcp_rosetta_map.svg" onclick="openLightbox(this.src)" alt="10"><div class="diagram-caption">10. Розеттский камень: AWS ↔ Azure ↔ GCP</div></div>
      <div class="diagram-card"><img src="../05-Assets/11_linux_networking_to_cloud_bridge.svg" onclick="openLightbox(this.src)" alt="11"><div class="diagram-caption">11. Мост от Linux и сетей к облачным сервисам</div></div>
      <div class="diagram-card"><img src="../05-Assets/12_free_certs_and_portfolio_path.svg" onclick="openLightbox(this.src)" alt="12"><div class="diagram-caption">12. Бесплатная замена сертификатов ($0) и путь к офферу</div></div>
    </div>

    <h2 class="section-heading">📂 Локальные файлы и Python-лабы курса</h2>
    <div class="card">
      <div class="grid-2">
        <div class="blue-box">
          <strong>📘 Учебники в Markdown (Obsidian):</strong>
          <ul style="margin-left:18px; margin-top:6px;">
            <li><a class="res-link" href="../00-Roadmap/Полный-Курс-Cloud-Security-С-Нуля.md" target="_blank">Полный-Курс-Cloud-Security-С-Нуля.md</a></li>
            <li><a class="res-link" href="../01-Theory-Notes/01-Linux-и-Сети-для-Облаков.md" target="_blank">01-Linux-и-Сети-для-Облаков.md</a></li>
            <li><a class="res-link" href="../01-Theory-Notes/02-AWS-и-Azure-Фундамент-и-IAM.md" target="_blank">02-AWS-и-Azure-Фундамент-и-IAM.md</a></li>
            <li><a class="res-link" href="../01-Theory-Notes/03-Атаки-на-Облака-и-Защита.md" target="_blank">03-Атаки-на-Облака-и-Защита.md</a></li>
            <li><a class="res-link" href="../01-Theory-Notes/04-Docker-Kubernetes-Terraform-DevSecOps.md" target="_blank">04-Docker-Kubernetes-Terraform-DevSecOps.md</a></li>
          </ul>
        </div>
        <div class="arch-box">
          <strong>🧪 3 Готовые Python-Лабы и Шпаргалки:</strong>
          <ul style="margin-left:18px; margin-top:6px;">
            <li><a class="res-link" href="../02-Labs/lab01_s3_and_iam_auditor.py" target="_blank">lab01_s3_and_iam_auditor.py (Аудитор IAM и S3)</a></li>
            <li><a class="res-link" href="../02-Labs/lab02_ssrf_imds_simulator.py" target="_blank">lab02_ssrf_imds_simulator.py (Capital One SSRF/IMDSv2)</a></li>
            <li><a class="res-link" href="../02-Labs/lab03_terraform_sec_check.py" target="_blank">lab03_terraform_sec_check.py (Сканер Terraform)</a></li>
            <li><a class="res-link" href="../03-Cheatsheets-and-Flashcards/Окно-Быстрых-Вспоминанок.md" target="_blank">Окно-Быстрых-Вспоминанок.md</a></li>
            <li><a class="res-link" href="../04-Resources/Все-Проверенные-Источники-Мира.md" target="_blank">Все-Проверенные-Источники-Мира.md</a></li>
          </ul>
        </div>
      </div>
    </div>
  `
};

window.ACADEMY_DATA.flashcards_page = {
  id: "flashcards_page",
  title: "⚡ Окно Маленьких Вспоминанок",
  badge: "45+ Карточек за 5 сек",
  html: `
    <div class="hero-banner">
      <div class="hero-badge-row">
        <span class="badge badge-purple">🧠 Активное вспоминание (Active Recall)</span>
        <span class="badge badge-cyan">⚡ Отдельное окно доступно всегда: Alt + M</span>
      </div>
      <h1 class="hero-title">База Маленьких Вспоминанок (Повторение за 5 минут в день)</h1>
      <p class="hero-desc">
        Нажми кнопку ниже, чтобы выдвинуть отдельное плавающее окно поверх любого урока, скрыть ответы и потренировать память перед практикой или собеседованием — или просматривай все 45+ карточек прямо здесь!
      </p>
      <div style="margin-top:14px;">
        <button class="btn-action btn-recall-trigger" onclick="openRecallDrawer()">🧠 Открыть Плавающее Окно Вспоминанок</button>
      </div>
    </div>
    <div id="inlineFlashcardsMount"></div>
  `
};
