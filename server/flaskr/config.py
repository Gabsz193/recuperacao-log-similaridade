import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Configurações básicas (Default)"""
    ELASTICSEARCH_HOST = os.environ.get('ELASTICSEARCH_HOST', 'http://localhost:9200')
    DEBUG = False

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    # Em produção, você pode querer validar se a chave existe ou falhar
    pass

# Dicionário para facilitar a seleção
config_setup = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}