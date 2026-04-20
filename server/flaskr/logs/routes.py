from . import bp
from .controller import (
    upload_logs_controller,
    list_files_controller,
    delete_file_controller,
    search_logs_controller,
    health_controller,
)

@bp.route('/upload', methods=['POST'])
def upload_logs():
    return upload_logs_controller()

@bp.route('/files', methods=['GET'])
def list_files():
    return list_files_controller()

@bp.route('/files/<id>', methods=['DELETE'])
def delete_file(id):
    return delete_file_controller(id)

@bp.route('/search', methods=['POST'])
def search_logs():
    return search_logs_controller()

@bp.route('/health', methods=['GET'])
def health():
    return health_controller()
