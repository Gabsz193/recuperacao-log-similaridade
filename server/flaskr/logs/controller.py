from flask import jsonify, request
from .services import LogService

log_service = LogService()

def upload_logs_controller():
    files = request.files.getlist('files')
    if not files:
        return jsonify({"error": "Nenhum arquivo enviado"}), 400

    try:
        results = log_service.upload_files(files)
        return jsonify({"success": True, "files": results}), 200
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
    size = payload.get('size', 10)

    if not query or not str(query).strip():
        return jsonify({"error": "Query vazia"}), 400

    try:
        result = log_service.search(query, size)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def health_controller():
    try:
        status = log_service.health()
        return jsonify(status), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 503
