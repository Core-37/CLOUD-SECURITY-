window.ACADEMY_DATA = window.ACADEMY_DATA || {};

window.ACADEMY_DATA.phase5 = {
  id: "phase5",
  title: "🐳 Фаза 5: Docker, Kubernetes & Terraform",
  badge: "Недели 19–22 • Лаба №3",
  html: `
    <div class="hero-banner">
      <div class="hero-badge-row">
        <span class="badge badge-purple">🐳 Docker &amp; Container Breakout</span>
        <span class="badge badge-cyan">☸️ Kubernetes 4C Security</span>
        <span class="badge badge-emerald">⚙️ Terraform IaC + Checkov + Trivy</span>
      </div>
      <h1 class="hero-title">Фаза 5 — Контейнеры (Docker &amp; K8s), Terraform и DevSecOps (Shift-Left)</h1>
      <p class="hero-desc">
        Главный навык современного Cloud Security Engineer по советам Marius Poskus: находить дыры в инфраструктуре ещё <strong>ДО того, как сервер появится в облаке</strong>!
      </p>
    </div>

    <h2 class="section-heading">🐳 1. Безопасность Docker и Kubernetes (Модель 4C и 3 пути побега)</h2>
    <div class="diagram-card">
      <img src="../05-Assets/07_containers_docker_kubernetes_security.svg" alt="Безопасность Docker и Kubernetes" onclick="openLightbox(this.src)">
      <div class="diagram-caption">Матрёшка 4C (Cloud ➔ Cluster ➔ Container ➔ Code) и Топ-3 пути побега на хост</div>
    </div>

    <div class="grid-2">
      <div class="danger-box" style="margin:0;">
        <strong>🔥 Что ломают в Docker и K8s:</strong>
        <ul style="margin-left:18px; margin-top:6px;">
          <li>Запуск процесса в контейнере от <code class="inline-code">root (UID 0)</code>.</li>
          <li>Флаг <code class="inline-code">--privileged</code> ➔ можно смонтировать диск хоста (<code class="inline-code">/dev/sda1</code>)!</li>
          <li>Монтирование сокета <code class="inline-code">/var/run/docker.sock</code> внутрь контейнера.</li>
          <li>Незашифрованный <code class="inline-code">etcd</code> или открытый порт Kubelet <code class="inline-code">:10250</code>.</li>
        </ul>
      </div>
      <div class="success-box" style="margin:0;">
        <strong>🛡️ Как чинят (Best Practices):</strong>
        <ul style="margin-left:18px; margin-top:6px;">
          <li>Всегда добавлять <code class="inline-code">USER 10001</code> и минимальный образ (<code class="inline-code">alpine / distroless</code>).</li>
          <li>Включать <code class="inline-code">readOnlyRootFilesystem: true</code> и запрещать эскалацию прав.</li>
          <li>Ограничивать общение подов через <code class="inline-code">NetworkPolicy</code> (фронтенд не лезет в БД!).</li>
          <li>Проверять все образы сканером <strong>Trivy</strong> до деплоя!</li>
        </ul>
      </div>
    </div>

    <h2 class="section-heading">⚙️ 2. Конвейер Terraform (IaC) и Shift-Left DevSecOps</h2>
    <div class="diagram-card">
      <img src="../05-Assets/08_terraform_iac_devsecops_pipeline.svg" alt="Конвейер Terraform и DevSecOps" onclick="openLightbox(this.src)">
      <div class="diagram-caption">Путь кода: Gitleaks (секреты) ➔ Checkov (IaC) ➔ Semgrep/Trivy (код и образы) ➔ OIDC деплой ➔ Prowler</div>
    </div>

    <div class="code-wrap">
      <div class="code-header"><span>4 Главные Команды DevSecOps Инженера</span><button class="copy-btn" onclick="copyCode(this)">Копировать</button></div>
      <pre class="code-block">gitleaks detect --source . -v               # Поиск случайно забытых паролей и ключей AWS в Git
checkov -d ./terraform/                     # Аудит Terraform (.tf) до запуска terraform apply
trivy image --severity HIGH,CRITICAL app:1  # Сканирование Docker-образа на известные уязвимости CVE
prowler aws                                 # Аудит живого облака по 300+ правилам CIS Benchmark</pre>
    </div>

    <div class="success-box">
      <strong>🧪 ПРАКТИКА — ЛАБА №3:</strong> Запусти наш собственный мини-Checkov сканер на Python, который найдёт все 5 облачных ошибок в учебном файле <code class="inline-code">sample_vulnerable_main.tf</code>:<br>
      <code class="inline-code">python3 02-Labs/lab03_terraform_sec_check.py</code>
    </div>

    <div class="card">
      <div class="check-row" data-check-id="c5-1"><input type="checkbox"><span>Понял, почему опасны <code class="inline-code">USER root</code>, <code class="inline-code">--privileged</code> и <code class="inline-code">docker.sock</code> в контейнерах.</span></div>
      <div class="check-row" data-check-id="c5-2"><input type="checkbox"><span>Запомнил 4 слоя Kubernetes (4C) и зачем шифровать <code class="inline-code">etcd</code>.</span></div>
      <div class="check-row" data-check-id="c5-3"><input type="checkbox"><span>Запустил <code class="inline-code">lab03_terraform_sec_check.py</code> и научился читать ошибки в Terraform-коде.</span></div>
    </div>
  `
};

window.ACADEMY_DATA.phase6 = {
  id: "phase6",
  title: "📡 Фаза 6: Облачный SIEM, Логи и SOAR",
  badge: "Недели 23–25 • Blue Team",
  html: `
    <div class="hero-banner">
      <div class="hero-badge-row">
        <span class="badge badge-emerald">📹 CloudTrail &amp; VPC Flow Logs</span>
        <span class="badge badge-amber">🚨 GuardDuty &amp; Defender</span>
        <span class="badge badge-purple">📊 Microsoft Sentinel (KQL)</span>
        <span class="badge badge-cyan">⚡ SOAR Авто-изоляция</span>
      </div>
      <h1 class="hero-title">Фаза 6 — Мониторинг Облака, Облачный SIEM и Авто-реагирование на Инциденты</h1>
      <p class="hero-desc">
        В облаке каждый клик и команда — это API-запрос. Если правильно настроить логирование и умные детекторы угроз, кража ключа отлавливается за секунды!
      </p>
    </div>

    <div class="diagram-card">
      <img src="../05-Assets/09_cloud_siem_detection_incident_path.svg" alt="Путь обнаружения и автоответа Cloud SIEM" onclick="openLightbox(this.src)">
      <div class="diagram-caption">От API-атаки хакера до автоматической изоляции сервера через EventBridge + Lambda за 3 секунды</div>
    </div>

    <h2 class="section-heading">🔎 1. Как мы видим всё, что происходит в облаке</h2>
    <div class="table-wrap">
      <table class="cyber-table">
        <thead><tr><th>Инструмент (AWS / Azure)</th><th>Что он делает (Аналогия)</th><th>Какие атаки ловит</th></tr></thead>
        <tbody>
          <tr><td><strong>AWS CloudTrail</strong> / <strong>Azure Activity Log</strong></td><td>Камера 24/7 над всеми API-действиями в аккаунте</td><td>Создание бэкдор-юзера (<code class="inline-code">CreateUser</code>), попытки отключить логи (<code class="inline-code">StopLogging</code>), вход с чужого IP</td></tr>
          <tr><td><strong>VPC Flow Logs</strong></td><td>Журнал всех сетевых пакетов (Accept / Reject)</td><td>Сканирование портов, утечка гигабайт данных наружу, связь с вредоносными IP</td></tr>
          <tr><td><strong>Amazon GuardDuty</strong> / <strong>Defender for Cloud</strong></td><td>Умный детектор угроз на основе ML и Threat Intel</td><td>Кража токенов EC2 (<code class="inline-code">Exfiltration.OutsideAWS</code>), запуск майнеров криптовалюты</td></tr>
          <tr><td><strong>Microsoft Sentinel</strong> / <strong>AWS Security Hub</strong></td><td>Единый пульт дежурного SOC-аналитика (SIEM)</td><td>Корреляция событий из почты, Entra ID, файрволов и облаков через запросы <strong>KQL</strong></td></tr>
          <tr><td><strong>Prowler / ScoutSuite</strong></td><td>Автоматический инспектор по стандартам CIS</td><td>Незашифрованные диски, открытые порты, отсутствие MFA у админов</td></tr>
        </tbody>
      </table>
    </div>

    <h2 class="section-heading">📊 2. Пример KQL-запроса для Microsoft Sentinel (Охота на взлом входа)</h2>
    <div class="code-wrap">
      <div class="code-header"><span>Microsoft Sentinel KQL Hunting Query — Поиск брутфорса и входов из чужих стран</span><button class="copy-btn" onclick="copyCode(this)">Копировать</button></div>
      <pre class="code-block">SigninLogs
| where TimeGenerated &gt; ago(24h)
| where ResultType != 0                         // Только неудачные попытки входа
| summarize FailedAttempts = count() by UserPrincipalName, IPAddress, Location
| where FailedAttempts &gt; 15                     // Более 15 ошибок за сутки
| sort by FailedAttempts desc</pre>
    </div>

    <h2 class="section-heading">🚨 3. Главный вопрос собеседования: «У нас утекли ключи AWS Access Key! Что делать по шагам?»</h2>
    <div class="card">
      <ol style="margin-left:20px; font-size:0.9rem;">
        <li><strong>НЕ удаляй ключ в панике сразу</strong> — сначала нажми <strong>Deactivate</strong> (отключи, чтобы хакер остановился, но сохранилась история для расследования) + добавь политику <code class="inline-code">Deny All</code>!</li>
        <li>Если скомпрометирована <strong>IAM Role</strong> — нажми <strong>Revoke active sessions</strong> (аннулирует уже выданные временные токены по времени <code class="inline-code">aws:TokenIssueTime</code>).</li>
        <li>Открой <strong>CloudTrail</strong> и проверь по <code class="inline-code">AccessKeyId</code> все вызовы во <strong>ВСЕХ регионах</strong> (хакеры часто запускают майнеры в <code class="inline-code">ap-south-1</code> или <code class="inline-code">sa-east-1</code>, куда админы не смотрят!).</li>
        <li>Ищи команды закрепления: <code class="inline-code">CreateUser</code>, <code class="inline-code">CreateAccessKey</code>, <code class="inline-code">AttachUserPolicy</code>, <code class="inline-code">RunInstances</code>.</li>
        <li>Удали всё созданное хакером, перевыпусти секреты и перейди на временные роли / OIDC!</li>
      </ol>
    </div>

    <div class="card">
      <div class="check-row" data-check-id="c6-1"><input type="checkbox"><span>Понял разницу между CloudTrail (API-логи), VPC Flow Logs (трафик) и GuardDuty (умный детект).</span></div>
      <div class="check-row" data-check-id="c6-2"><input type="checkbox"><span>Запомнил алгоритм реагирования на утечку ключа AWS (Deactivate ➔ Revoke ➔ CloudTrail во всех регионах).</span></div>
    </div>
  `
};
