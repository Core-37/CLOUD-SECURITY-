#!/usr/bin/env python3
"""
Лаба №3 (Фаза 5): Собственный статический сканер безопасности Terraform (Shift-Left DevSecOps).
Имитирует работу инструментов Checkov / tfsec / Gitleaks на файле sample_vulnerable_main.tf.
Запуск: python3 lab03_terraform_sec_check.py
"""

import re
from pathlib import Path

TARGET_TF = Path(__file__).parent / "sample_vulnerable_main.tf"


CHECKS = [
    {
        "id": "SEC-001 (Open SSH / World Access)",
        "severity": "CRITICAL",
        "pattern": r'cidr_blocks\s*=\s*\[\s*"0\.0\.0\.0/0"\s*\]',
        "message": "Обнаружен открытый доступ всему интернету (0.0.0.0/0) в Security Group!",
        "fix": "Ограничьте доступ своим IP (/32), Security Group балансировщика или используйте AWS SSM Session Manager без порта 22.",
    },
    {
        "id": "SEC-002 (Public S3 Bucket ACL)",
        "severity": "CRITICAL",
        "pattern": r'acl\s*=\s*"public-read(-write)?"',
        "message": "S3-бакет помечен как публичный (acl = 'public-read')!",
        "fix": "Удалите публичный ACL, включите aws_s3_bucket_public_access_block с 4 флагами = true.",
    },
    {
        "id": "SEC-003 (Unencrypted EBS Disk)",
        "severity": "HIGH",
        "pattern": r'encrypted\s*=\s*false',
        "message": "Отключено шифрование облачного диска (encrypted = false)!",
        "fix": "Установите encrypted = true и укажите kms_key_id для защиты данных на диске.",
    },
    {
        "id": "SEC-004 (IMDSv1 Enabled — Capital One Risk)",
        "severity": "CRITICAL",
        "pattern": r'http_tokens\s*=\s*"optional"',
        "message": "Разрешён устаревший IMDSv1 (http_tokens = 'optional') — риск кражи ключей через SSRF!",
        "fix": "Установите http_tokens = 'required' в блоке metadata_options.",
    },
    {
        "id": "SEC-005 (Hardcoded Secret / Access Key in Code)",
        "severity": "CRITICAL",
        "pattern": r'(AKIA[0-9A-Z]{16}|secret_key\s*=\s*"[^"]+")',
        "message": "КРИТИЧЕСКАЯ УТЕЧКА: В коде Terraform захардкожен секрет или AWS Access Key!",
        "fix": "Немедленно удалите ключ из кода, отзовите его в IAM, используйте IAM Role / OIDC или переменные окружения.",
    },
]


def scan_terraform_file(path: Path):
    print("\n⚙️  CORE-37 CLOUD SECURITY LAB #3 — DEVSECOPS СКАНЕР TERRAFORM (МИНИ-CHECKOV)\n")
    if not path.exists():
        print(f"❌ Файл {path} не найден!")
        return

    content = path.read_text(encoding="utf-8")
    lines = content.splitlines()
    print(f"🔍 Сканирование файла: {path.name} ({len(lines)} строк)\n" + "-" * 72)

    total_hits = 0
    for check in CHECKS:
        for line_no, line in enumerate(lines, start=1):
            if re.search(check["pattern"], line):
                total_hits += 1
                print(f"\n🚨 [{check['severity']}] {check['id']} (Строка {line_no})")
                print(f"   Код:       {line.strip()}")
                print(f"   Проблема:  {check['message']}")
                print(f"   🛡️ Как чинить: {check['fix']}")

    print("\n" + "=" * 72)
    if total_hits > 0:
        print(f"❌ СБОРКА CI/CD ОСТАНОВЛЕНА! Найдено критических нарушений: {total_hits}")
        print("💡 В реальном DevSecOps такие ошибки блокируются ДО запуска `terraform apply`!")
    else:
        print("✅ Все проверки Checkov/Gitleaks пройдены! Код готов к безопасному деплою.")
    print("=" * 72 + "\n")


if __name__ == "__main__":
    scan_terraform_file(TARGET_TF)
