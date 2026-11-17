window.ACADEMY_DATA = window.ACADEMY_DATA || {};

window.ACADEMY_DATA.dashboard = {
  id: "dashboard",
  title: "🏠 Главная Панель & Карта Пути",
  badge: "С нуля до профи",
  html: `
    <div class="hero-banner">
      <div class="hero-badge-row">
        <span class="badge badge-cyan">☁️ Cloud Security с абсолютного нуля</span>
        <span class="badge badge-emerald">💸 $0 Сертификаты &amp; Бесплатный Полигон</span>
        <span class="badge badge-purple">🧠 Окно Вспоминанок (Alt+M)</span>
        <span class="badge badge-amber">🖼️ 12 Схем &amp; Путей</span>
      </div>
      <h1 class="hero-title">Интерактивная Академия Cloud Security: От Нуля до Реального Портфолио</h1>
      <p class="hero-desc">
        Полный практический курс, объединивший стратегию CISO <strong>Marius Poskus (@mariusposkus0)</strong>, пошаговый план <strong>UnixGuy</strong>, роудмап <strong>90DaysOfCyberSecurity</strong>, материалы <strong>MIT / Stanford / Coursera</strong> и лучшие бесплатные полигоны мира (<strong>flAWS.cloud</strong>, <strong>PwnedLabs</strong>, <strong>LocalStack</strong>, <strong>SadServers</strong>). Нажми на <strong>🧠 Вспоминалки</strong> вверху или справа внизу в любой момент, чтобы быстро освежить команды и термины!
      </p>
    </div>

    <div class="analogy-box">
      <div class="analogy-header">⚡ Главная правда перед стартом (Что говорят профи):</div>
      • <strong>Что такое Облако физически?</strong> Это не магия в небе — это гигантские дата-центры Amazon, Microsoft и Google, набитые обычными Linux-серверами, которые ты арендуешь через интернет и управляешь ими через API и код.<br>
      • <strong>Почему 99% взломов облаков — НЕ вина Amazon/Microsoft?</strong> Облако — как арендованная квартира: стены охраняет владелец дома, а если ты оставил дверь открытой (<code class="inline-code">0.0.0.0/0</code>) или выкинул ключи от квартиры на GitHub — ограбят тебя.<br>
      • <strong>Почему без платных сертификатов реально?</strong> На старте мы полностью заменяем дорогие экзамены ($100–$400) бесплатными официальными бейджами (<strong>AWS Skill Builder</strong>, <strong>Microsoft Applied Skills</strong>, <strong>Fortinet NSE 1–3</strong>, <strong>Qualys VM</strong>) и 5 реальными проектами на GitHub!
    </div>

    <div class="card">
      <div class="card-title">🗺️ Визуальная Карта Твоего Маршрута (Нажми на схему для увеличения!)</div>
      <div class="diagram-card">
        <img src="../05-Assets/01_cloud_security_roadmap_zero_to_hero.svg" alt="Полный маршрут Cloud Security с нуля" onclick="openLightbox(this.src)">
        <div class="diagram-caption">Нажми на картинку, чтобы открыть карту Фаз 0–7 на весь экран</div>
      </div>
    </div>

    <h2 class="section-heading">📊 Сводная Таблица Всех 8 Фаз (6–9 месяцев при 1.5–2 ч/день)</h2>
    <div class="table-wrap">
      <table class="cyber-table">
        <thead>
          <tr><th>Фаза</th><th>Тема и Навыки</th><th>Срок</th><th>Главный результат и Лаба</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Фаза 0</strong></td><td>Физика облака + Бесплатный полигон</td><td>1 нед</td><td>Docker + <strong>LocalStack</strong> (бесплатный AWS без карты!) + защита <code class="inline-code">.gitignore</code></td></tr>
          <tr><td><strong>Фаза 1</strong></td><td>Linux и Сети глазами облачника</td><td>3–4 нед</td><td>SSH-ключи (<code class="inline-code">chmod 400</code>), порты, CIDR (<code class="inline-code">/24, /32</code>), <code class="inline-code">Bandit</code> и <code class="inline-code">SadServers</code></td></tr>
          <tr><td><strong>Фаза 2</strong></td><td>Python, Bash, JSON/YAML и Git</td><td>3 нед</td><td>Парсинг через <code class="inline-code">jq</code>, скрипты на Python (<code class="inline-code">boto3</code>) и поиск секретов <code class="inline-code">Gitleaks</code></td></tr>
          <tr><td><strong>Фаза 3</strong></td><td>Фундамент Облака: IAM, VPC, S3, KMS</td><td>4–5 нед</td><td>Shared Responsibility, JSON-политики, Subnets/SG/NACL + <strong>Лаба №1 (Аудитор)</strong></td></tr>
          <tr><td><strong>Фаза 4</strong></td><td>Атаки на Облака (Red Team)</td><td>3–4 нед</td><td>Взлом Capital One (<code class="inline-code">SSRF ➔ IMDSv1</code>), защита <code class="inline-code">IMDSv2</code>, <code class="inline-code">flAWS.cloud</code> + <strong>Лаба №2</strong></td></tr>
          <tr><td><strong>Фаза 5</strong></td><td>Docker, Kubernetes и Terraform DevSecOps</td><td>4 нед</td><td>Модель 4C, побеги из контейнера, <code class="inline-code">Checkov</code> + <code class="inline-code">Trivy</code> + <strong>Лаба №3</strong></td></tr>
          <tr><td><strong>Фаза 6</strong></td><td>Облачный SIEM, Логи и Авто-реакция</td><td>3 нед</td><td><code class="inline-code">CloudTrail</code>, <code class="inline-code">GuardDuty</code>, <code class="inline-code">Microsoft Sentinel (KQL)</code>, <code class="inline-code">Prowler</code>, плейбук SOC</td></tr>
          <tr><td><strong>Фаза 7</strong></td><td>$0 Бейджи, 5 Проектов и Оффер</td><td>Финал</td><td>Бесплатные бейджи + <strong>Forage</strong> + 5 проектов на GitHub + Резюме</td></tr>
        </tbody>
      </table>
    </div>
  `
};

window.ACADEMY_DATA.videos_synthesis = {
  id: "videos_synthesis",
  title: "🎬 Синтез Видео и GitHub-Репозиториев",
  badge: "Marius Poskus • UnixGuy • 90Days",
  html: `
    <div class="hero-banner">
      <div class="hero-badge-row">
        <span class="badge badge-purple">TikTok: @mariusposkus0</span>
        <span class="badge badge-rose">YouTube: UnixGuy (r86YCwX_iU4)</span>
        <span class="badge badge-cyan">GitHub: 90DaysOfCyberSecurity &amp; Awesome-Hacking</span>
      </div>
      <h1 class="hero-title">Разбор Твоих Источников: Как Соединить Советы CISO, UnixGuy и GitHub в Один План</h1>
      <p class="hero-desc">
        Вместо того чтобы хаотично смотреть десятки роликов и сохранять закладки, здесь собрана конкретная выжимка из всех указанных тобой видео и репозиториев — что брать, в каком порядке учить и чего НЕ делать.
      </p>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-title">👔 1. Уроки CISO Marius Poskus (<code class="inline-code">@mariusposkus0</code>)</div>
        <p style="font-size:0.9rem; color:var(--text-secondary);">Видео: <code class="inline-code">7620055869098626326</code> &amp; <code class="inline-code">7649022999210904854</code></p>
        <ul style="margin-left:18px; margin-top:10px; font-size:0.9rem;">
          <li><strong>Принцип «Proof over Paper» (Доказательства важнее бумаг):</strong> Покупка сертификатов без практики создаёт проблему «нет доказательств, что ты умеешь настраивать облако руками».</li>
          <li><strong>Никаких дорогих буткемпов за $10,000:</strong> Все навыки прекрасно осваиваются через бесплатные песочницы, документацию и домашнюю лабораторию.</li>
          <li><strong>Главное оружие современного CloudSec:</strong> не кликать мышкой в консоли, а уметь описывать безопасное облако через <strong>Terraform (IaC)</strong>, проверять код автосканерами и настраивать мониторинг (<strong>GuardDuty / Sentinel</strong>).</li>
          <li><strong>Твой GitHub = твой первый опыт работы:</strong> 5 оформленных проектов со схемами и кодом заменяют пустую строчку «опыт работы».</li>
        </ul>
      </div>

      <div class="card">
        <div class="card-title">⚡ 2. Уроки UnixGuy (<code class="inline-code">watch?v=r86YCwX_iU4</code>)</div>
        <p style="font-size:0.9rem; color:var(--text-secondary);">Видео: <em>«FASTEST Way to Learn Cloud Security and ACTUALLY Get a Job»</em></p>
        <ul style="margin-left:18px; margin-top:10px; font-size:0.9rem;">
          <li><strong>Честность про старт:</strong> Нельзя перепрыгнуть в Cloud Security, не понимая, что такое IP, DNS, Linux и как работает обычная сеть.</li>
          <li><strong>Правило ОДНОГО облака на старте:</strong> Выбери <strong>AWS</strong> (лидер рынка и стартапов, лучшие хакерские CTF) <strong>или Microsoft Azure</strong> (корпорации, банки, <code class="inline-code">Entra ID</code> + <code class="inline-code">Sentinel</code>). Не пытайся учить сразу три!</li>
          <li><strong>Чёткий порядок слоёв:</strong> 1) Сети и Linux ➔ 2) База выбранного облака ➔ 3) Безопасность (IAM, VPC, S3, Логи) ➔ 4) Упаковка в резюме под ключевые слова HR.</li>
          <li><strong>Побег из «Ада туториалов»:</strong> после каждого часа видео — 3 часа практики руками в лаборатории!</li>
        </ul>
      </div>
    </div>

    <h2 class="section-heading">🐙 3. Интеграция GitHub: 90DaysOfCyberSecurity + Awesome-Hacking</h2>
    <div class="table-wrap">
      <table class="cyber-table">
        <thead><tr><th>Блок из 90DaysOfCyberSecurity</th><th>Что было в базовом плане</th><th>Как мы адаптировали и усилили для Cloud Security</th></tr></thead>
        <tbody>
          <tr><td><strong>Дни 1–14:</strong> Network+ &amp; Security+</td><td>Теория сетей и ИБ</td><td>Сфокусировались на <strong>CIDR (/16, /24, /32)</strong>, портах облака, TLS и <strong>Shared Responsibility Model</strong> (Фазы 1 и 3)</td></tr>
          <tr><td><strong>Дни 15–28:</strong> Linux</td><td>Команды терминала</td><td><strong>SSH-ключи (<code class="inline-code">chmod 400</code>)</strong>, аудит портов <code class="inline-code">ss -tulnp</code>, <code class="inline-code">Bandit</code> и облачный тренажёр <strong>SadServers</strong></td></tr>
          <tr><td><strong>Дни 29–42:</strong> Python</td><td>Базовый синтаксис</td><td>Работа с JSON (<code class="inline-code">jq</code>), облачный SDK <code class="inline-code">boto3</code> и написание реальных Python-аудиторов (Лабы 1–3)</td></tr>
          <tr><td><strong>Дни 43–70:</strong> Трафик, Git, SIEM</td><td>Wireshark, Git, ELK</td><td><strong>VPC Flow Logs</strong>, поиск утечек ключей <code class="inline-code">Gitleaks</code>, <strong>AWS CloudTrail</strong> и <strong>Microsoft Sentinel (KQL)</strong></td></tr>
          <tr><td><strong>Дни 71–95:</strong> Cloud &amp; Хакинг</td><td>7 дней обзора облака</td><td>Расширено до полноценных <strong>4 фаз</strong> + лучшие утилиты из <em>Awesome-Hacking</em>: <code class="inline-code">Prowler</code>, <code class="inline-code">Checkov</code>, <code class="inline-code">Trivy</code>, <code class="inline-code">flAWS.cloud</code>, <code class="inline-code">CloudGoat</code></td></tr>
        </tbody>
      </table>
    </div>
  `
};

window.ACADEMY_DATA.phase0 = {
  id: "phase0",
  title: "🛠️ Фаза 0: Что такое Облако + Полигон ($0)",
  badge: "Неделя 1 • Старт без карты",
  html: `
    <div class="hero-banner">
      <div class="hero-badge-row">
        <span class="badge badge-cyan">🛠️ Фаза 0 (Неделя 1)</span>
        <span class="badge badge-emerald">🐳 Docker + LocalStack (AWS дома бесплатно!)</span>
      </div>
      <h1 class="hero-title">Фаза 0 — Что такое Облако на самом деле и Бесплатная Лаборатория без Банковской Карты</h1>
      <p class="hero-desc">
        Чтобы учиться облачной безопасности, тебе НЕ нужна платная подписка или кредитная карта с риском получить огромный счёт. Сначала мы поднимем личный «карманный AWS» прямо на твоём Linux!
      </p>
    </div>

    <div class="analogy-box">
      <div class="analogy-header">⚡ Аналогия из реальной жизни: Электростанция vs Свой Генератор</div>
      • <strong>Свой сервер в офисе (On-Premises):</strong> Ты купил бензиновый генератор на балкон. Сам покупаешь канистры бензина, меняешь масло, чинишь мотор. Если на праздник пришло в 10 раз больше людей — генератор сгорает.<br>
      • <strong>Облако (AWS / Azure / GCP):</strong> Ты просто втыкаешь вилку в розетку огромной электростанции в дата-центре Amazon или Microsoft. По сути <strong>облако — это обычные Linux-серверы в гигантском охраняемом ангаре</strong>, которыми ты управляешь по сети через команды API.
    </div>

    <h2 class="section-heading">🔧 1. Установка инструментов на твой компьютер</h2>
    <div class="grid-2">
      <div class="arch-box arch-only">
        <strong>🏹 Для Arch Linux / EndeavourOS / Manjaro:</strong>
        <div class="code-wrap">
          <div class="code-header"><span>Arch Linux Terminal</span><button class="copy-btn" onclick="copyCode(this)">Копировать</button></div>
          <pre class="code-block">sudo pacman -Syu
sudo pacman -S git curl jq python docker aws-cli-v2 terraform trivy
sudo systemctl enable --now docker
sudo usermod -aG docker $USER

# Изолированная среда Python для Checkov, Prowler и LocalStack:
python -m venv ~/cloudsec-venv
source ~/cloudsec-venv/bin/activate
pip install checkov prowler</pre>
        </div>
      </div>

      <div class="ubuntu-box ubuntu-only">
        <strong>🐧 Для Ubuntu / Debian / Kali / WSL2:</strong>
        <div class="code-wrap">
          <div class="code-header"><span>Ubuntu / Debian Terminal</span><button class="copy-btn" onclick="copyCode(this)">Копировать</button></div>
          <pre class="code-block">sudo apt update &amp;&amp; sudo apt install -y git curl jq python3 python3-venv docker.io unzip
sudo systemctl enable --now docker
sudo usermod -aG docker $USER

# Установка Terraform, Trivy и Checkov/Prowler:
python3 -m venv ~/cloudsec-venv
source ~/cloudsec-venv/bin/activate
pip install awscli checkov prowler</pre>
        </div>
      </div>
    </div>

    <h2 class="section-heading">🐳 2. Бесплатный AWS дома за 1 минуту (LocalStack)</h2>
    <div class="card">
      <div class="card-title">Как тренироваться с командами <code class="inline-code">aws s3</code> и <code class="inline-code">aws iam</code> без реального аккаунта</div>
      <p style="font-size:0.9rem; color:var(--text-secondary);"><strong>LocalStack</strong> — это официальный Docker-эмулятор AWS, который поднимается на твоём порту <code class="inline-code">4566</code>.</p>
      <div class="code-wrap">
        <div class="code-header"><span>Запуск карманного AWS в Docker</span><button class="copy-btn" onclick="copyCode(this)">Копировать</button></div>
        <pre class="code-block"># 1. Запускаем эмулятор AWS на порту 4566:
docker run --rm -d --name localstack -p 4566:4566 localstack/localstack

# 2. Задаём фейковые ключи (подходят любые слова для локального стенда):
export AWS_ACCESS_KEY_ID="test"
export AWS_SECRET_ACCESS_KEY="test"
export AWS_DEFAULT_REGION="us-east-1"

# 3. Создаём локальный S3-бакет и смотрим его:
aws --endpoint-url=http://localhost:4566 s3 mb s3://my-first-lab-bucket
aws --endpoint-url=http://localhost:4566 s3 ls</pre>
      </div>
    </div>

    <div class="danger-box">
      <strong>🚨 Главная ошибка новичка №1:</strong> Никогда не загружай файлы <code class="inline-code">.env</code>, <code class="inline-code">*.pem</code>, <code class="inline-code">*.key</code>, <code class="inline-code">*.tfstate</code> в публичный GitHub! Автоматические боты крадут ключи с GitHub за <strong>10–30 секунд</strong> и запускают майнеры на тысячи долларов! Всегда используй готовый файл <code class="inline-code">.gitignore</code> из корня курса.
    </div>

    <h2 class="section-heading">✅ Чек-лист выхода из Фазы 0</h2>
    <div class="card">
      <div class="check-row" data-check-id="c0-1"><input type="checkbox"><span>Понял простыми словами: облако — это удалённые Linux-серверы, управляемые через API и код.</span></div>
      <div class="check-row" data-check-id="c0-2"><input type="checkbox"><span>Установил <code class="inline-code">git</code>, <code class="inline-code">jq</code>, <code class="inline-code">python3</code> и <code class="inline-code">docker</code>, проверил запуск Docker.</span></div>
      <div class="check-row" data-check-id="c0-3"><input type="checkbox"><span>Проверил, что открывается <strong>🧠 Окно Маленьких Вспоминанок</strong> (кнопка вверху или <code class="inline-code">Alt + M</code>).</span></div>
    </div>
  `
};

window.ACADEMY_DATA.phase1 = {
  id: "phase1",
  title: "🐧 Фаза 1: Linux и Сети для Облаков",
  badge: "Недели 2–5 • Фундамент",
  html: `
    <div class="hero-banner">
      <div class="hero-badge-row">
        <span class="badge badge-blue">🐧 Linux Administration</span>
        <span class="badge badge-cyan">🌐 TCP/IP • Порты • CIDR • DNS • TLS</span>
      </div>
      <h1 class="hero-title">Фаза 1 — Linux и Сети глазами Облачного Безопасника</h1>
      <p class="hero-desc">
        90% всех виртуальных машин и контейнеров в облаках крутятся на Linux. А каждое правило фаервола в AWS (Security Group) и Azure (NSG) требует уверенно читать IP-адреса, маски CIDR и номера портов!
      </p>
    </div>

    <div class="card">
      <div class="card-title">🌉 Мост: как знания Linux превращаются в облачную безопасность</div>
      <div class="diagram-card">
        <img src="../05-Assets/11_linux_networking_to_cloud_bridge.svg" alt="Мост от Linux и сетей к облаку" onclick="openLightbox(this.src)">
        <div class="diagram-caption">Нажми, чтобы увеличить схему «Linux ➔ Облако»</div>
      </div>
    </div>

    <h2 class="section-heading">🔑 1. Как входят в облачный сервер: SSH-ключи и <code class="inline-code">chmod 400</code></h2>
    <div class="analogy-box">
      <div class="analogy-header">🔐 Аналогия с замком и ключом</div>
      Вместо пароля, который подбирают боты, в облаке используют два файла:<br>
      • <strong>Публичный ключ (<code class="inline-code">.pub</code>)</strong> — это <strong>навесной замок</strong>. Он лежит на облачном сервере в файле <code class="inline-code">~/.ssh/authorized_keys</code>.<br>
      • <strong>Приватный ключ (<code class="inline-code">.pem</code> / <code class="inline-code">id_ed25519</code>)</strong> — это <strong>твой уникальный ключ</strong> в кармане. На него ОБЯЗАТЕЛЬНО ставят права <code class="inline-code">chmod 400 key.pem</code> («читать только мне»), иначе сам клиент SSH откажется пускать из-за угрозы кражи файла!
    </div>

    <div class="code-wrap">
      <div class="code-header"><span>6 Главных Команд Аудита Linux-сервера</span><button class="copy-btn" onclick="copyCode(this)">Копировать</button></div>
      <pre class="code-block">chmod 400 my-cloud-key.pem                   # Защита приватного SSH-ключа
ssh -i my-cloud-key.pem ubuntu@203.0.113.10  # Вход на облачный сервер
sudo ss -tulnp                               # Какие порты и программы открыты наружу?
ps aux                                       # От какого юзера (root?) запущен сайт
find / -perm -4000 -type f 2&gt;/dev/null       # Поиск SUID-файлов для повышения прав до root
env | grep -iE "AWS|AZURE|KEY|SECRET"        # Проверка не утекли ли секреты в env</pre>
    </div>

    <h2 class="section-heading">🏢 2. Сети и Подсети CIDR — Понятно за 2 минуты</h2>
    <div class="analogy-box">
      <div class="analogy-header">🏠 Аналогия с жилым комплексом (Как запомнить /16, /24, /32 и 0.0.0.0/0 навсегда)</div>
      • <code class="inline-code">10.0.0.0/16</code> = <strong>Весь жилой комплекс (VPC)</strong> — заморожены первые 2 числа, внутри <strong>65,536</strong> адресов.<br>
      • <code class="inline-code">10.0.1.0/24</code> = <strong>Один конкретный подъезд (Subnet)</strong> — заморожены первые 3 числа, внутри <strong>256</strong> квартир (от .0 до .255).<br>
      • <code class="inline-code">203.0.113.5/32</code> = <strong>Ровно одна квартира (1 IP)</strong> — заморожены все 32 бита! Ставим для входа своего домашнего/офисного IP.<br>
      • <code class="inline-code">0.0.0.0/0</code> = <strong>ВСЯ ПЛАНЕТА ЗЕМЛЯ!</strong> Открыть порт <code class="inline-code">22</code> (SSH), <code class="inline-code">3389</code> (RDP) или базу (<code class="inline-code">5432</code>/<code class="inline-code">3306</code>/<code class="inline-code">6379</code>) на <code class="inline-code">0.0.0.0/0</code> — критическая ошибка №1 в облаках!
    </div>

    <h2 class="section-heading">🧪 Практика и Проверка себя</h2>
    <div class="blue-box" style="margin-bottom:14px;">
      <strong>🎯 Бесплатные тренажёры этой фазы:</strong><br>
      1. <a class="res-link" href="https://overthewire.org/wargames/bandit/" target="_blank">OverTheWire Bandit (Уровни 0–20)</a> — отработка терминала, прав доступа и SSH-ключей.<br>
      2. <a class="res-link" href="https://sadservers.com/" target="_blank">SadServers.com</a> — починка реальных «сломанных» облачных Linux-серверов прямо в браузере (задачи <em>Saint John</em>, <em>Saskatoon</em>).
    </div>

    <div class="quiz-item" onclick="this.classList.toggle('open')">
      <div class="quiz-question"><span>🧪 Вопрос 1: Зачем перед входом по SSH на облачный сервер пишут <code class="inline-code">chmod 400 key.pem</code>?</span><span>▼</span></div>
      <div class="quiz-answer">Права <code class="inline-code">400</code> означают «только чтение и только для владельца файла». Если файл ключа могут читать другие пользователи компьютера, программа <code class="inline-code">ssh</code> считает ключ скомпрометированным и заблокирует подключение!</div>
    </div>
    <div class="quiz-item" onclick="this.classList.toggle('open')">
      <div class="quiz-question"><span>🧪 Вопрос 2: Разработчик открыл порт 5432 для <code class="inline-code">0.0.0.0/0</code> и порт 22 для <code class="inline-code">203.0.113.5/32</code>. Где пожар?</span><span>▼</span></div>
      <div class="quiz-answer">Пожар на порту <strong>5432 (PostgreSQL)</strong> — база данных открыта абсолютно всему интернету (<code class="inline-code">0.0.0.0/0</code>)! А порт 22 с маской <code class="inline-code">/32</code> открыт только для одного конкретного IP-адреса.</div>
    </div>

    <div class="card" style="margin-top:14px;">
      <div class="check-row" data-check-id="c1-1"><input type="checkbox"><span>Понял работу SSH-ключей (<code class="inline-code">chmod 400</code>), портов (<code class="inline-code">ss -tulnp</code>) и подсетей CIDR (<code class="inline-code">/24</code>, <code class="inline-code">/32</code>, <code class="inline-code">0.0.0.0/0</code>).</span></div>
      <div class="check-row" data-check-id="c1-2"><input type="checkbox"><span>Прошёл уровни Bandit 0–15 и решил минимум 2 сценария на SadServers.</span></div>
    </div>
  `
};

window.ACADEMY_DATA.phase2 = {
  id: "phase2",
  title: "🐍 Фаза 2: Python, Bash, JSON/YAML и Git",
  badge: "Недели 6–9 • Автоматизация",
  html: `
    <div class="hero-banner">
      <div class="hero-badge-row">
        <span class="badge badge-purple">📜 JSON &amp; YAML</span>
        <span class="badge badge-blue">🐍 Python + boto3</span>
        <span class="badge badge-rose">🔐 Git + Gitleaks</span>
      </div>
      <h1 class="hero-title">Фаза 2 — Языки Облака: JSON, YAML, Bash, Python (<code class="inline-code">boto3</code>) и Защита Секретов в Git</h1>
      <p class="hero-desc">
        Чтобы искать ошибки среди 500 серверов или 100 бакетов S3, ты не будешь тыкать мышкой в браузере — всё автоматизируется через JSON, <code class="inline-code">jq</code>, Bash и Python!
      </p>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-title">📜 1. Зачем безопаснику JSON и YAML?</div>
        <p style="font-size:0.9rem; color:var(--text-secondary);">
          • <strong>JSON</strong> (<code class="inline-code">{"Effect": "Allow"}</code>) — язык всех правил доступа (<strong>IAM Policies</strong>) и ответов <code class="inline-code">aws-cli</code>.<br>
          • <strong>YAML</strong> (отступы пробелами без фигурных скобок) — язык <strong>Docker Compose</strong>, <strong>Kubernetes</strong>, <strong>GitHub Actions</strong> и правил SIEM.<br>
          • Утилита <strong><code class="inline-code">jq</code></strong> позволяет за 1 секунду вытащить нужные данные из гигантского JSON-ответа облака!
        </p>
      </div>

      <div class="card">
        <div class="card-title">🚨 2. Опасность Git: удаление ключа новым коммитом НЕ спасает!</div>
        <p style="font-size:0.9rem; color:var(--text-secondary);">
          Если ты случайно залил на GitHub файл с ключом <code class="inline-code">AKIA...</code>, а потом удалил его и сделал новый <code class="inline-code">git push</code> — <strong>ключ навсегда остался в истории предыдущего коммита!</strong><br><br>
          ✅ Проверка истории репозитория перед пушем: <code class="inline-code">gitleaks detect --source . -v</code>
        </p>
      </div>
    </div>

    <div class="card">
      <div class="card-title">🐍 Пример на Python (<code class="inline-code">boto3</code>) — Проверка S3 через код</div>
      <div class="code-wrap">
        <div class="code-header"><span>check_buckets_localstack.py</span><button class="copy-btn" onclick="copyCode(this)">Копировать</button></div>
        <pre class="code-block">import boto3

# Подключаемся к нашему бесплатному LocalStack (или убери endpoint_url для реального AWS)
s3 = boto3.client("s3", endpoint_url="http://localhost:4566")
buckets = s3.list_buckets().get("Buckets", [])

for b in buckets:
    name = b["Name"]
    try:
        pab = s3.get_public_access_block(Bucket=name)["PublicAccessBlockConfiguration"]
        print(f"[OK] {name}: BlockPublicAccess = {pab}")
    except Exception:
        print(f"[ALERT!] {name}: PublicAccessBlock НЕ НАСТРОЕН!")</pre>
      </div>
    </div>

    <div class="card">
      <div class="check-row" data-check-id="c2-1"><input type="checkbox"><span>Понял разницу между JSON и YAML, попробовал фильтрацию через <code class="inline-code">jq</code>.</span></div>
      <div class="check-row" data-check-id="c2-2"><input type="checkbox"><span>Изучил основы Python (словари, циклы, файлы) по курсу Harvard CS50P / Python.</span></div>
      <div class="check-row" data-check-id="c2-3"><input type="checkbox"><span>Запомнил, почему при утечке ключа в Git нужно немедленно отзывать ключ в IAM, а не просто делать <code class="inline-code">git rm</code>.</span></div>
    </div>
  `
};
