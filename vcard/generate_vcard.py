#!/usr/bin/env python3
"""
Gerador e Validador de vCard para Marcelo Matos
Gera arquivo vCard 4.0 compatível e valida sua estrutura
"""

import datetime
import re
from pathlib import Path

class VCardGenerator:
    def __init__(self):
        self.version = "4.0"
        self.encoding = "UTF-8"
        
    def generate_vcard(self, contact_data):
        """Gera vCard formatado a partir dos dados de contato"""
        vcard_lines = [
            "BEGIN:VCARD",
            f"VERSION:{self.version}",
            f"FN:{contact_data['full_name']}",
            f"N:{contact_data['surname']};{contact_data['given_name']};;;",
        ]
        
        if 'organization' in contact_data:
            vcard_lines.append(f"ORG:{contact_data['organization']}")
            
        if 'title' in contact_data:
            vcard_lines.append(f"TITLE:{contact_data['title']}")
            
        for phone in contact_data.get('phones', []):
            vcard_lines.append(f"TEL;TYPE={phone['type']}:{phone['number']}")
            
        for email in contact_data.get('emails', []):
            vcard_lines.append(f"EMAIL;TYPE={email['type']}:{email['address']}")
            
        if 'url' in contact_data:
            vcard_lines.append(f"URL:{contact_data['url']}")
            
        if 'address' in contact_data:
            addr = contact_data['address']
            vcard_lines.append(f"ADR;TYPE=work:;;{addr['street']};{addr['city']};{addr['state']};{addr['zip']};{addr['country']}")
            
        for social in contact_data.get('social_profiles', []):
            vcard_lines.append(f"X-SOCIALPROFILE;TYPE={social['type']}:{social['url']}")
            
        if 'whatsapp' in contact_data:
            vcard_lines.append(f"IMPP:whatsapp:tel:{contact_data['whatsapp']}")
            
        if 'note' in contact_data:
            vcard_lines.append(f"NOTE:{contact_data['note']}")
            
        if 'categories' in contact_data:
            vcard_lines.append(f"CATEGORIES:{','.join(contact_data['categories'])}")
            
        # Timestamp de revisão
        timestamp = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")
        vcard_lines.append(f"REV:{timestamp}")
        
        vcard_lines.append("END:VCARD")
        
        return "\r\n".join(vcard_lines)
    
    def validate_vcard(self, vcard_content):
        """Valida estrutura básica do vCard"""
        errors = []
        
        if not vcard_content.startswith("BEGIN:VCARD"):
            errors.append("vCard deve iniciar com BEGIN:VCARD")
            
        if not vcard_content.endswith("END:VCARD"):
            errors.append("vCard deve terminar com END:VCARD")
            
        if "VERSION:4.0" not in vcard_content:
            errors.append("Versão 4.0 não encontrada")
            
        if not re.search(r"FN:.+", vcard_content):
            errors.append("Campo FN (nome completo) obrigatório")
            
        # Validar formato de email
        email_pattern = r"EMAIL[^:]*:([^@]+@[^@]+\.[^@]+)"
        emails = re.findall(email_pattern, vcard_content)
        for email in emails:
            if not re.match(r"^[^@]+@[^@]+\.[^@]+$", email):
                errors.append(f"Email inválido: {email}")
                
        return errors
    
    def save_vcard(self, vcard_content, filename):
        """Salva vCard em arquivo"""
        path = Path(filename)
        path.write_text(vcard_content, encoding=self.encoding)
        return path.absolute()

def main():
    """Gera o vCard do Marcelo Matos"""
    generator = VCardGenerator()
    
    # Dados de contato do Marcelo Matos
    contact_data = {
        'full_name': 'Marcelo Matos',
        'given_name': 'Marcelo',
        'surname': 'Matos',
        'organization': 'Complemento - Liberdade e Tecnologia',
        'title': 'Desenvolvedor Full Stack / DevOps',
        'phones': [
            {'type': 'cell,voice', 'number': '+55-11-977974431'}
        ],
        'emails': [
            {'type': 'work', 'address': 'contato@marcelomatos.dev'},
            {'type': 'home', 'address': 'marcelofmatos@gmail.com'}
        ],
        'url': 'https://marcelomatos.dev',
        'address': {
            'street': '',
            'city': 'Boa Vista',
            'state': 'Roraima',
            'zip': '69000-000',
            'country': 'Brasil'
        },
        'whatsapp': '+5511977974431',
        'social_profiles': [
            {'type': 'linkedin', 'url': 'https://www.linkedin.com/in/marcelomatosdev/'},
            {'type': 'github', 'url': 'https://github.com/marcelofmatos'},
            {'type': 'twitter', 'url': 'https://twitter.com/marcelofmatos'},
            {'type': 'linktree', 'url': 'https://linktr.ee/marcelofmatos'}
        ],
        'note': 'Desenvolvedor Full Stack e DevOps com mais de 15 anos de experiência. Especialista em softwares livres, automação em nuvem, containerização e infraestrutura de TI. Atua com PHP, JavaScript, Java, Python, MySQL, PostgreSQL, Docker e metodologias ágeis.',
        'categories': ['Desenvolvedor', 'DevOps', 'Tecnologia', 'Software Livre', 'Infraestrutura']
    }
    
    # Gerar vCard
    vcard_content = generator.generate_vcard(contact_data)
    
    # Validar
    errors = generator.validate_vcard(vcard_content)
    if errors:
        print("❌ Erros encontrados:")
        for error in errors:
            print(f"  - {error}")
        return
    
    # Salvar arquivo
    filename = "marcelo-matos-generated.vcf"
    filepath = generator.save_vcard(vcard_content, filename)
    
    print("✅ vCard gerado com sucesso!")
    print(f"📍 Arquivo salvo: {filepath}")
    print(f"📊 Tamanho: {filepath.stat().st_size} bytes")
    
    # Mostrar prévia
    print("\n📋 Prévia do conteúdo:")
    print("─" * 50)
    print(vcard_content)
    print("─" * 50)

if __name__ == "__main__":
    main()
