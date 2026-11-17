# Учебный файл Terraform с 5 нарочными ошибками безопасности (для Лабы №3)
# Попробуй найти их глазами, а затем запусти: python3 lab03_terraform_sec_check.py

provider "aws" {
  region     = "us-east-1"
  access_key = "AKIAIOSFODNN7EXAMPLE" # Ошибка 5: захардкоженный тестовый ключ в коде!
  secret_key = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
}

resource "aws_security_group" "insecure_ssh_sg" {
  name        = "allow-all-ssh"
  description = "Dangerous open SSH"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Ошибка 1: SSH открыт всему миру!
  }
}

resource "aws_s3_bucket" "insecure_backups" {
  bucket = "company-secret-backups-2026"
  acl    = "public-read" # Ошибка 2: Публичное чтение бакета!
}

resource "aws_instance" "insecure_web_server" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"

  root_block_device {
    volume_size = 20
    encrypted   = false # Ошибка 3: Незашифрованный диск EBS!
  }

  metadata_options {
    http_endpoint = "enabled"
    http_tokens   = "optional" # Ошибка 4: Разрешён устаревший IMDSv1 (риск Capital One)!
  }
}
