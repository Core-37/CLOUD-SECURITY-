window.ACADEMY_DATA = window.ACADEMY_DATA || {};

window.ACADEMY_DATA.phase3 = {
  id: "phase3",
  title: "☁️ Фаза 3: Облачное Ядро (IAM, VPC, S3, KMS)",
  badge: "Недели 10–14 • Лаба №1",
  html: `
    <div class="hero-banner">
      <div class="hero-badge-row">
        <span class="badge badge-amber">🤝 Shared Responsibility</span>
        <span class="badge badge-blue">🔑 IAM + STS + Least Privilege</span>
        <span class="badge badge-cyan">🌐 VPC (SG vs NACL)</span>
        <span class="badge badge-purple">🪣 S3 &amp; KMS</span>
      </div>
      <h1 class="hero-title">Фаза 3 — Фундамент Облачной Безопасности: 4 Кита Защиты AWS и Azure</h1>
      <p class="hero-desc">
        В любом облаке более 200 сервисов, но 85% реальной безопасности держатся на 4 столпах: разделении ответственности, правах IAM, изоляции сети VPC и шифровании хранилищ.
      </p>
    </div>

    <h2 class="section-heading">🤝 1. Модель разделения ответственности (Shared Responsibility)</h2>
    <div class="diagram-card">
      <img src="../05-Assets/02_shared_responsibility_model.svg" alt="Модель разделения ответственности" onclick="openLightbox(this.src)">
      <div class="diagram-caption">Нажми на схему: On-Prem («свой дом») vs IaaS («квартира без мебели») vs PaaS vs SaaS («отель»)</div>
    </div>

    <h2 class="section-heading">🔑 2. IAM — Главная граница защиты облака</h2>
    <div class="analogy-box">
      <div class="analogy-header">🎭 Аналогия: IAM User (AKIA...) vs IAM Role (ASIA...)</div>
      • <strong>IAM User</strong> — постоянный пропуск сотрудника с вечным ключом <code class="inline-code">AKIA...</code> (плохо хранить на серверах!).<br>
      • <strong>IAM Role</strong> — временная «волшебная шляпа», которую надевает сервер EC2 или Lambda. Она каждые пару часов выдаёт через службу <strong>STS</strong> новый одноразовый ключ <code class="inline-code">ASIA...</code> + <code class="inline-code">SessionToken</code>.<br>
      • <strong>Алгоритм оценки прав:</strong> По умолчанию всё ЗАПРЕЩЕНО ➔ Явный <strong>DENY</strong> всегда побеждает любой <strong>ALLOW</strong> ➔ Если запретов нет, нужен явный <strong>ALLOW</strong>!
    </div>

    <div class="diagram-card">
      <img src="../05-Assets/03_iam_architecture_and_privesc_path.svg" alt="Архитектура IAM и путь PrivEsc" onclick="openLightbox(this.src)">
      <div class="diagram-caption">Логика IAM, структура JSON-политики и схема атаки повышения привилегий (PassRole)</div>
    </div>

    <h2 class="section-heading">🌐 3. Облачная сеть VPC: Public vs Private Subnet и SG vs NACL</h2>
    <div class="diagram-card">
      <img src="../05-Assets/04_cloud_network_vpc_architecture.svg" alt="Архитектура сети VPC" onclick="openLightbox(this.src)">
      <div class="diagram-caption">Путь трафика: Интернет ➔ WAF ➔ IGW ➔ Public (ALB/NAT) ➔ Private (EC2) ➔ Isolated (БД)</div>
    </div>

    <div class="grid-2">
      <div class="blue-box">
        <strong>🥋 Security Group (Телохранитель у самого сервера)</strong>
        <ul style="margin-left:18px; margin-top:6px;">
          <li><strong>Stateful (с памятью):</strong> если впустил запрос на порт 443, ответ выпустит автоматически!</li>
          <li>Поддерживает <strong>только Allow</strong> (явный запрет одного IP сделать нельзя).</li>
          <li>Может ссылаться на ID другой Security Group (например, пускать к backend только трафик от балансировщика ALB).</li>
        </ul>
      </div>
      <div class="arch-box">
        <strong>🚧 Network ACL / NACL (Шлагбаум на въезде в квартал-подсеть)</strong>
        <ul style="margin-left:18px; margin-top:6px;">
          <li><strong>Stateless (без памяти):</strong> нужно отдельно прописывать правила на вход и на выход.</li>
          <li>Поддерживает и <strong>Allow</strong>, и <strong>Deny</strong> — идеально, чтобы заблокировать IP-адрес атакующего!</li>
          <li>Правила проверяются строго по возрастанию номера (100, 200...).</li>
        </ul>
      </div>
    </div>

    <h2 class="section-heading">🪣 4. Хранилища S3 / Azure Blob и Шифрование KMS</h2>
    <div class="diagram-card">
      <img src="../05-Assets/06_s3_storage_misconfig_and_encryption.svg" alt="Защита S3 и шифрование KMS" onclick="openLightbox(this.src)">
      <div class="diagram-caption">4 барьера защиты бакетов S3 и как работает Envelope Encryption (CMK + Data Key)</div>
    </div>

    <div class="success-box">
      <strong>🧪 ПРАКТИКА — ЛАБА №1:</strong> Запусти наш локальный Python-аудитор IAM-политик и S3-конфигураций прямо в терминале:<br>
      <code class="inline-code">python3 02-Labs/lab01_s3_and_iam_auditor.py</code>
    </div>

    <div class="quiz-item" onclick="this.classList.toggle('open')">
      <div class="quiz-question"><span>🧪 Вопрос: У пользователя есть права Admin (<code class="inline-code">Allow *</code>), но в другой политике написано <code class="inline-code">Deny s3:DeleteBucket</code>. Сможет ли он удалить бакет?</span><span>▼</span></div>
      <div class="quiz-answer"><strong>Нет!</strong> По золотому правилу IAM явный запрет (Explicit Deny) <strong>всегда</strong> побеждает любое разрешение (Allow).</div>
    </div>

    <div class="card">
      <div class="check-row" data-check-id="c3-1"><input type="checkbox"><span>Разобрался в Shared Responsibility Model (разница между IaaS, PaaS и SaaS).</span></div>
      <div class="check-row" data-check-id="c3-2"><input type="checkbox"><span>Понял разницу между IAM User (<code class="inline-code">AKIA</code>) и IAM Role (<code class="inline-code">ASIA</code>) и правило Explicit Deny.</span></div>
      <div class="check-row" data-check-id="c3-3"><input type="checkbox"><span>Отличаю Public/Private/Isolated Subnets и Security Group (Stateful) от NACL (Stateless).</span></div>
      <div class="check-row" data-check-id="c3-4"><input type="checkbox"><span>Запустил и изучил вывод скрипта <code class="inline-code">lab01_s3_and_iam_auditor.py</code>.</span></div>
    </div>
  `
};

window.ACADEMY_DATA.phase4 = {
  id: "phase4",
  title: "💥 Фаза 4: Атаки на Облака и Разбор flAWS",
  badge: "Недели 15–18 • Лаба №2",
  html: `
    <div class="hero-banner">
      <div class="hero-badge-row">
        <span class="badge badge-rose">💥 Capital One Case Study</span>
        <span class="badge badge-amber">🕵️ SSRF ➔ 169.254.169.254</span>
        <span class="badge badge-emerald">🛡️ Защита IMDSv2</span>
        <span class="badge badge-cyan">🚩 flAWS.cloud Levels 1–6</span>
      </div>
      <h1 class="hero-title">Фаза 4 — Атаки на Облака (Red Team) и Разбор Реальных Взломов</h1>
      <p class="hero-desc">
        Чтобы уметь защищать облако, ты должен знать, какими именно путями в него проникают хакеры: через метаданные серверов (IMDS), ошибки IAM, забытые ключи в <code class="inline-code">.git</code> и публичные снапшоты.
      </p>
    </div>

    <h2 class="section-heading">💥 1. Взлом Capital One (100+ млн записей): Путь SSRF ➔ IMDSv1</h2>
    <div class="diagram-card">
      <img src="../05-Assets/05_ssrf_to_imds_attack_path.svg" alt="Путь атаки SSRF на IMDS и защита IMDSv2" onclick="openLightbox(this.src)">
      <div class="diagram-caption">Как хакеры воруют временные ключи роли с адреса 169.254.169.254 и почему IMDSv2 всё блокирует</div>
    </div>

    <div class="danger-box">
      <strong>⚠️ Запомни адрес <code class="inline-code">169.254.169.254</code> навсегда!</strong><br>
      Это служба метаданных (IMDS), работающая внутри каждого облачного сервера (EC2 / Azure VM / GCP). Если на сайте есть уязвимость <strong>SSRF</strong> (сервер сам скачивает URL, введённый пользователем), и на сервере включён старый <strong>IMDSv1</strong> — злоумышленник простым GET-запросом крадёт ключи роли сервера!
    </div>

    <div class="success-box">
      <strong>🛡️ Как защититься в 1 строчку кода Terraform:</strong><br>
      Обязательно включить <strong>IMDSv2</strong> (<code class="inline-code">http_tokens = "required"</code> и <code class="inline-code">http_put_response_hop_limit = 1</code>). Тогда без предварительного <code class="inline-code">PUT</code>-запроса и при наличии прокси-заголовка <code class="inline-code">X-Forwarded-For</code> облако отвечает <strong>401 Unauthorized</strong>!
    </div>

    <h2 class="section-heading">🔑 2. Топ-4 пути IAM Privilege Escalation (Захват прав админа)</h2>
    <div class="table-wrap">
      <table class="cyber-table">
        <thead><tr><th>Опасное право у юзера</th><th>Как хакер становится админом</th><th>Как защититься</th></tr></thead>
        <tbody>
          <tr><td><code class="inline-code">iam:PassRole</code> + <code class="inline-code">ec2:RunInstances</code></td><td>Создаёт новый сервер, вешает на него готовую <strong>AdminRole</strong>, заходит по SSH и крадёт её токен из IMDS!</td><td>Запретить <code class="inline-code">"Resource": "*"</code> в <code class="inline-code">iam:PassRole</code></td></tr>
          <tr><td><code class="inline-code">iam:CreatePolicyVersion</code></td><td>Создаёт новую версию своей же политики, вписывает <code class="inline-code">Action: "*"</code> и активирует её по умолчанию</td><td>Запретить юзерам менять свои же IAM-политики</td></tr>
          <tr><td><code class="inline-code">iam:AttachUserPolicy</code></td><td>Одной командой прикрепляет к себе готовую политику <code class="inline-code">AdministratorAccess</code></td><td>Внедрять <strong>Permission Boundaries</strong> (потолок прав)</td></tr>
          <tr><td><code class="inline-code">lambda:UpdateFunctionCode</code></td><td>Меняет код существующей Lambda-функции с высокой ролью и сливает токены через <code class="inline-code">os.environ</code></td><td>Запретить ручное обновление кода в продакшне</td></tr>
        </tbody>
      </table>
    </div>

    <h2 class="section-heading">🚩 3. Шпаргалка по бесплатному полигону <code class="inline-code">flAWS.cloud</code> (Уровни 1–6)</h2>
    <div class="card">
      <ol style="margin-left:20px; font-size:0.9rem;">
        <li><strong>Level 1:</strong> Открытый S3-бакет — проверка без пароля через <code class="inline-code">aws s3 ls s3://flaws.cloud/ --no-sign-request</code>.</li>
        <li><strong>Level 2:</strong> Ловушка группы <em>AuthenticatedUsers</em> (доступ разрешён ЛЮБОМУ бесплатному аккаунту AWS на планете!).</li>
        <li><strong>Level 3:</strong> Внутри бакета забыта папка <code class="inline-code">.git/</code> — внутри старого коммита лежит удалённый ключ <code class="inline-code">AKIA...</code>.</li>
        <li><strong>Level 4:</strong> По найденным ключам находим публичный снимок диска (EBS Snapshot), внутри которого лежат пароли.</li>
        <li><strong>Level 5:</strong> Классический <strong>SSRF ➔ IMDSv1 (<code class="inline-code">169.254.169.254</code>)</strong> на прокси-сервере.</li>
        <li><strong>Level 6:</strong> Сбор информации с Read-Only правами (Policy enumeration &amp; Lambda API Gateway).</li>
      </ol>
    </div>

    <div class="success-box">
      <strong>🧪 ПРАКТИКА — ЛАБА №2:</strong> Запусти наш безопасный локальный симулятор атаки Capital One и защиты IMDSv2:<br>
      <code class="inline-code">python3 02-Labs/lab02_ssrf_imds_simulator.py</code>
    </div>

    <div class="card">
      <div class="check-row" data-check-id="c4-1"><input type="checkbox"><span>Запустил симулятор <code class="inline-code">lab02_ssrf_imds_simulator.py</code> и понял разницу между IMDSv1 (200 OK кража!) и IMDSv2 (401/403 блок).</span></div>
      <div class="check-row" data-check-id="c4-2"><input type="checkbox"><span>Понял, чем опасны <code class="inline-code">iam:PassRole</code>, публичные EBS-снимки и Subdomain Takeover.</span></div>
      <div class="check-row" data-check-id="c4-3"><input type="checkbox"><span>Прошёл все 6 уровней бесплатного полигона <a class="res-link" href="http://flaws.cloud/" target="_blank">flAWS.cloud</a> (и попробовал <a class="res-link" href="http://flaws2.cloud/" target="_blank">flAWS2.cloud</a>).</span></div>
    </div>
  `
};
