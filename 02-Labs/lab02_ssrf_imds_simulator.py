#!/usr/bin/env python3
"""
Лаба №2 (Фаза 4): Локальная безопасная симуляция взлома Capital One (SSRF -> IMDSv1)
и демонстрация того, как IMDSv2 полностью блокирует атаку.
Запуск: python3 lab02_ssrf_imds_simulator.py
"""

import secrets

# Симулируемые секретные данные роли, привязанной к веб-серверу (EC2)
MOCK_IMDS_DATA = {
    "role_name": "WebApp-WAF-Role",
    "credentials": {
        "Code": "Success",
        "Type": "AWS-HMAC",
        "AccessKeyId": "ASIASAMPLEKEY12345678",
        "SecretAccessKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
        "Token": "IQoJb3JpZ2luX2VjECoaCXVzLWVhc3QtMSJGMEQC...",
        "Expiration": "2026-11-17T23:59:59Z",
    },
}


class CloudMetadataServer:
    """Модель службы метаданных EC2 (169.254.169.254) с поддержкой IMDSv1 и IMDSv2."""

    def __init__(self, require_imdsv2: bool):
        self.require_imdsv2 = require_imdsv2
        self.valid_tokens = set()

    def handle_put_token(self, headers: dict):
        # IMDSv2 запрещает запросы через прокси (X-Forwarded-For) и требует TTL заголовок
        if "X-Forwarded-For" in headers:
            return 403, "403 Forbidden: Прокси-заголовки запрещены в IMDSv2!"
        ttl = headers.get("X-aws-ec2-metadata-token-ttl-seconds")
        if not ttl:
            return 400, "400 Bad Request: Отсутствует заголовок TTL!"
        token = secrets.token_hex(16)
        self.valid_tokens.add(token)
        return 200, token

    def handle_get_metadata(self, path: str, headers: dict):
        if self.require_imdsv2:
            token = headers.get("X-aws-ec2-metadata-token")
            if not token or token not in self.valid_tokens:
                return 401, "401 Unauthorized: Включен IMDSv2! Простые GET-запросы отклонены."

        if path == "/latest/meta-data/iam/security-credentials/":
            return 200, MOCK_IMDS_DATA["role_name"]
        if path == f"/latest/meta-data/iam/security-credentials/{MOCK_IMDS_DATA['role_name']}":
            return 200, MOCK_IMDS_DATA["credentials"]
        return 404, "404 Not Found"


def vulnerable_webapp_fetch(target_url: str, imds_server: CloudMetadataServer):
    """
    Имитация веб-приложения с уязвимостью SSRF:
    Приложение без проверки принимает URL от пользователя и делает обычный GET-запрос,
    нередко добавляя заголовок X-Forwarded-For от балансировщика/прокси.
    """
    print(f"   🌐 [WebApp] Пользователь передал параметр ?url={target_url}")
    if target_url.startswith("http://169.254.169.254"):
        path = target_url.replace("http://169.254.169.254", "")
        # Простой SSRF умеет делать только GET без кастомных заголовков IMDSv2
        status, body = imds_server.handle_get_metadata(path, headers={"X-Forwarded-For": "198.51.100.42"})
        return status, body
    return 200, "<html>Обычный внешний сайт</html>"


def run_simulation():
    print("\n💥 CORE-37 CLOUD SECURITY LAB #2 — СИМУЛЯТОР SSRF -> IMDSv1 vs IMDSv2\n")

    # ---------------------------------------------------------
    # СЦЕНАРИЙ 1: Устаревший IMDSv1 (как было у Capital One)
    # ---------------------------------------------------------
    print("=" * 72)
    print("🔴 СЦЕНАРИЙ 1: Сервер работает на IMDSv1 (http_tokens = 'optional')")
    print("=" * 72)
    imds_v1 = CloudMetadataServer(require_imdsv2=False)

    print("\n[Шаг 1] Хакер ищет имя IAM-роли сервера через баг SSRF:")
    code, role_resp = vulnerable_webapp_fetch(
        "http://169.254.169.254/latest/meta-data/iam/security-credentials/", imds_v1
    )
    print(f"   ⬅️ Ответ сервера ({code}): Найдена роль -> '{role_resp}'")

    print("\n[Шаг 2] Хакер запрашивает временные ключи найденной роли:")
    code, creds_resp = vulnerable_webapp_fetch(
        f"http://169.254.169.254/latest/meta-data/iam/security-credentials/{role_resp}", imds_v1
    )
    print(f"   ⬅️ Ответ сервера ({code}): КЛЮЧИ УКРАДЕНЫ!")
    print(f"      AccessKeyId:     {creds_resp['AccessKeyId']}")
    print(f"      SecretAccessKey: {creds_resp['SecretAccessKey'][:12]}... (скрыто)")
    print(f"      SessionToken:    {creds_resp['Token'][:18]}...")
    print("   💀 ИТОГ: Теперь хакер выполняет `aws s3 sync` со своего ноутбука!\n")

    # ---------------------------------------------------------
    # СЦЕНАРИЙ 2: Включен IMDSv2 (Защита в 1 строчку Terraform!)
    # ---------------------------------------------------------
    print("=" * 72)
    print("🟢 СЦЕНАРИЙ 2: На сервере включён IMDSv2 (http_tokens = 'required')")
    print("=" * 72)
    imds_v2 = CloudMetadataServer(require_imdsv2=True)

    print("\n[Шаг 1] Хакер пытается повторить ту же SSRF-атаку простым GET:")
    code, blocked_resp = vulnerable_webapp_fetch(
        "http://169.254.169.254/latest/meta-data/iam/security-credentials/", imds_v2
    )
    print(f"   🛡️ Ответ сервера ({code}): {blocked_resp}")

    print("\n[Шаг 2] А что если хакер попробует запросить PUT-токен через прокси?")
    put_code, put_msg = imds_v2.handle_put_token(
        headers={"X-aws-ec2-metadata-token-ttl-seconds": "60", "X-Forwarded-For": "198.51.100.42"}
    )
    print(f"   🛡️ Ответ сервера ({put_code}): {put_msg}")

    print("\n[Шаг 3] Как работает ЛЕГИТИМНЫЙ скрипт прямо внутри самого EC2-сервера:")
    ok_code, valid_token = imds_v2.handle_put_token(headers={"X-aws-ec2-metadata-token-ttl-seconds": "60"})
    print(f"   ✅ Шаг А (PUT) получил временный токен: {valid_token[:16]}...")
    get_code, ok_role = imds_v2.handle_get_metadata(
        "/latest/meta-data/iam/security-credentials/",
        headers={"X-aws-ec2-metadata-token": valid_token},
    )
    print(f"   ✅ Шаг Б (GET с токеном) разрешён ({get_code}): роль = {ok_role}")
    print("\n🎓 Вывод: Включение IMDSv2 + запрет SSRF + Least Privilege полностью защищает облако!\n")


if __name__ == "__main__":
    run_simulation()
