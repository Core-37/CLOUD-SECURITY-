# 🐙 Карточка Оформления Нового GitHub-Репозитория (`CLOUD-SECURITY-`)

Локальный Git в этой папке уже инициализирован на ветке `main`, коммит создан и удалённый адрес привязан к `https://github.com/Core-37/CLOUD-SECURITY-.git`.

---

## Шаг 1. Настройки репозитория на GitHub (`Core-37/CLOUD-SECURITY-`)
Перейди в репозиторий https://github.com/Core-37/CLOUD-SECURITY- и в блоке **About** (значок шестерёнки справа) заполни:

- **Repository name:** `CLOUD-SECURITY-`
- **Description (скопируй на выбор):**
  - *Вариант EN (рекомендуется для портфолио):*
    `Zero-to-Hero Cloud Security Course & Interactive Academy (AWS, Azure, Linux, IAM, VPC, SSRF/IMDSv2, Docker/K8s, Terraform DevSecOps, Cloud SIEM). 12 visual SVG paths, 45+ flashcards, Python labs & $0 cert alternatives.`
  - *Вариант RU:*
    `Полный курс Cloud Security с нуля: интерактивный сайт, окно вспоминанок (45+ карточек), 12 визуальных SVG-схем, разбор Capital One/flAWS, Terraform DevSecOps и 3 Python-лабы без оплаты.`
- **Visibility:** Public *(или Private — на твоё усмотрение, но для портфолио работодателю нужен Public)*.
- **НЕ ставь галочки** *Add a README*, *Add .gitignore*, *Choose a license* — они уже есть здесь!

---

## Шаг 2. Залей код одной командой

Из папки `Cloud-Security-Course`:
```bash
git push -u origin main
```
*(Если выбрал другое имя репозитория на GitHub — просто запусти `./push_to_github.sh https://github.com/Core-37/<ИМЯ>.git`)*

---

## Шаг 3. Добавь Topics (теги) справа в блоке «About» на GitHub
Скопируй через запятую / пробел в поле **Topics**:
```text
cloud-security aws-security azure-security devsecops terraform kubernetes-security iam cybersecurity-roadmap infosec blue-team cloud-pentesting
```
