from flask import jsonify, request
from .services import LogService

log_service = LogService()

def upload_logs_controller():
    event_file = request.files.get('event_file')
    log_file = request.files.get('log_file')
    
    if not event_file or not log_file:
        return jsonify({"error": "Ambos os arquivos event_file e log_file sao obrigatorios"}), 400

    app_name = request.form.get('app_name')
    pair_id = request.form.get('pair_id')

    try:
        result = log_service.upload_pair(event_file, log_file, app_name, pair_id)
        return jsonify({"success": True, "file": result}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def list_files_controller():
    try:
        files = log_service.list_files()
        return jsonify({"files": files}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def delete_file_controller(file_id):
    try:
        log_service.delete_file(file_id)
        return jsonify({"success": True}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def search_logs_controller():
    payload = request.get_json(silent=True) or {}
    query = payload.get('query') or request.args.get('q', '')
    search_type = payload.get('search_type') or request.args.get('search_type', 'log')
    size = payload.get('size', 10)

    if not query or not str(query).strip():
        return jsonify({"error": "Query vazia"}), 400

    try:
        result = log_service.search(query, search_type, size)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def import_logs_controller():
    try:
        count = log_service.import_pairs()
        return jsonify({"success": True, "imported": count}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def metrics_controller():
    try:
        metrics = log_service.calculate_metrics()
        return jsonify(metrics), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def health_controller():
    try:
        status = log_service.health()
        return jsonify(status), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 503
