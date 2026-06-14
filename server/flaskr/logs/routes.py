from . import bp
from .controller import (
    upload_logs_controller,
    list_files_controller,
    delete_file_controller,
    search_logs_controller,
    import_logs_controller,
    metrics_controller,
    health_controller,
    metrics_chart_controller,
    wordcloud_chart_controller,
    word_freq_chart_controller,
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

@bp.route('/import', methods=['POST'])
def import_logs():
    return import_logs_controller()

@bp.route('/metrics', methods=['GET'])
def metrics():
    return metrics_controller()

@bp.route('/health', methods=['GET'])
def health():
    return health_controller()

@bp.route('/charts/metrics', methods=['GET'])
def metrics_chart():
    return metrics_chart_controller()

@bp.route('/charts/wordcloud', methods=['GET'])
def wordcloud_chart():
    return wordcloud_chart_controller()

@bp.route('/charts/word-freq', methods=['GET'])
def word_freq_chart():
    return word_freq_chart_controller()
