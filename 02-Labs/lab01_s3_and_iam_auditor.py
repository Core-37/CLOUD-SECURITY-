#!/usr/bin/env python3
"""
Лаба №1 (Фаза 3): Автоматический аудитор безопасности IAM-политик и S3-бакетов.
Имитирует работу реальных CSPM-сканеров (Prowler / ScoutSuite) без подключения к AWS.
Запуск: python3 lab01_s3_and_iam_auditor.py
"""

import json

# Учебные конфигурации (часть с критическими дырами, часть — правильные)
SAMPLE_IAM_POLICIES = [
    {
        "name": "DevInternPolicy (ОПАСНАЯ ПОЛИТИКА)",
        "policy": {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Action": "*",
                    "Resource": "*",
                }
            ],
        },
    },
    {
        "name": "WebServerPrivEscPolicy (СКРЫТЫЙ PRIVESC)",
        "policy": {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Action": ["iam:PassRole", "ec2:RunInstances"],
                    "Resource": "*",
                }
            ],
        },
    },
    {
        "name": "SecureReaderPolicy (ОБРАЗЕЦ LEAST PRIVILEGE)",
        "policy": {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Action": ["s3:GetObject"],
                    "Resource": "arn:aws:s3:::company-public-assets/*",
                    "Condition": {"Bool": {"aws:MultiFactorAuthPresent": "true"}},
                }
            ],
        },
    },
]

SAMPLE_S3_BUCKETS = [
    {
        "bucket": "company-db-backups-2026",
        "block_public_access": False,
        "encryption_kms": False,
        "versioning": False,
        "bucket_policy_principal": "*",
        "require_https": False,
    },
    {
        "bucket": "company-encrypted-vault",
        "block_public_access": True,
        "encryption_kms": True,
        "versioning": True,
        "bucket_policy_principal": "arn:aws:iam::123456789012:role/BackupRole",
        "require_https": True,
    },
]


def audit_iam_policies(policies):
    print("=" * 72)
    print("🔑 ЧАСТЬ 1. АУДИТ IAM-ПОЛИТИК (ПРИНЦИП МИНИМАЛЬНЫХ ПРИВИЛЕГИЙ)")
    print("=" * 72)

    for item in policies:
        name = item["name"]
        statements = item["policy"].get("Statement", [])
        findings = []

        for idx, stmt in enumerate(statements, start=1):
            effect = stmt.get("Effect", "")
            actions = stmt.get("Action", [])
            if isinstance(actions, str):
                actions = [actions]
            resources = stmt.get("Resource", [])
            if isinstance(resources, str):
                resources = [resources]

            if effect == "Allow":
                if "*" in actions and "*" in resources:
                    findings.append(
                        f"[CRITICAL] Правило #{idx}: Полные права Бога ('Action': '*', 'Resource': '*'). "
                        "При утечке ключа хакер захватит весь аккаунт!"
                    )
                elif "*" in resources:
                    findings.append(
                        f"[HIGH] Правило #{idx}: 'Resource': '*' разрешает действие на ВСЕ ресурсы облака."
                    )

                if "iam:PassRole" in actions and "*" in resources:
                    findings.append(
                        f"[CRITICAL] Правило #{idx}: 'iam:PassRole' + '*' позволяет передать роль админа "
                        "новому серверу EC2 и повысить привилегии (Privilege Escalation)!"
                    )

                if not stmt.get("Condition"):
                    findings.append(
                        f"[INFO] Правило #{idx}: Нет блока 'Condition' (например, проверки MFA или IP)."
                    )

        print(f"\n📄 Политика: {name}")
        if not findings:
            print("   ✅ ИДЕАЛЬНО: Нарушений не найдено (соответствует Least Privilege).")
        else:
            for f in findings:
                print(f"   ⚠️  {f}")

    # Показать эталон исправленной политики
    safe_example = {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "LeastPrivilegeReadOnly",
                "Effect": "Allow",
                "Action": ["s3:GetObject"],
                "Resource": "arn:aws:s3:::my-app-assets-prod/reports/*",
                "Condition": {"Bool": {"aws:MultiFactorAuthPresent": "true"}},
            }
        ],
    }
    print("\n💡 Как правильно переписать опасную политику (образец JSON):")
    print(json.dumps(safe_example, indent=2, ensure_ascii=False))


def audit_s3_buckets(buckets):
    print("\n" + "=" * 72)
    print("🪣 ЧАСТЬ 2. АУДИТ ОБЛАЧНЫХ ХРАНИЛИЩ (S3 BUCKETS)")
    print("=" * 72)

    for b in buckets:
        issues = []
        if not b["block_public_access"]:
            issues.append("[CRITICAL] Выключен 'Block Public Access' — риск утечки данных в мир!")
        if b["bucket_policy_principal"] == "*":
            issues.append("[CRITICAL] В Bucket Policy стоит 'Principal: *' (доступ для всех в интернете)!")
        if not b["encryption_kms"]:
            issues.append("[HIGH] Не включено шифрование KMS (SSE-KMS).")
        if not b["versioning"]:
            issues.append("[MEDIUM] Выключено версионирование (риск потери данных при Ransomware).")
        if not b["require_https"]:
            issues.append("[MEDIUM] Нет принудительного HTTPS (aws:SecureTransport == true).")

        print(f"\n🪣 Бакет: s3://{b['bucket']}")
        if not issues:
            print("   ✅ ЗАЩИЩЁН: Все 5 базовых контролей S3 пройдены!")
        else:
            for issue in issues:
                print(f"   ❌ {issue}")


if __name__ == "__main__":
    print("\n🛡️  CORE-37 CLOUD SECURITY LAB #1 — АУДИТ IAM И S3\n")
    audit_iam_policies(SAMPLE_IAM_POLICIES)
    audit_s3_buckets(SAMPLE_S3_BUCKETS)
    print("\n✅ Лаба №1 завершена! Попробуй добавить свою политику в SAMPLE_IAM_POLICIES и перезапустить скрипт.\n")
