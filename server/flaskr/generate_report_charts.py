import os
import re
from collections import Counter
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from wordcloud import WordCloud
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from flaskr.logs.services import LogService

def main():
    service = LogService()
    
    # Ensure folder is where we save
    save_dir = os.path.dirname(os.path.abspath(__file__))
    
    # -------------------------------------------------------------
    # 1. Metrics Chart (Light Mode)
    # -------------------------------------------------------------
    print("Gerando grafico de metricas em modo claro...")
    metrics = service.calculate_metrics()
    strategies = list(metrics.keys())
    display_names = []
    for name in strategies:
        if "Standard" in name and "Log" in name:
            display_names.append("Log Standard")
        elif "Custom" in name:
            display_names.append("Log Custom")
        elif "Event" in name:
            display_names.append("Event Search")
        elif "Hybrid" in name:
            display_names.append("Hybrid Search")
        else:
            display_names.append(name)
            
    mrr_vals = [metrics[s]["mrr"] for s in strategies]
    ndcg_vals = [metrics[s]["ndcg_5"] for s in strategies]
    
    y = np.arange(len(strategies))
    height = 0.3
    
    fig, ax = plt.subplots(figsize=(8, 4), facecolor='#ffffff')
    ax.set_facecolor('#f8f9fa')
    
    rects1 = ax.barh(y + height/2, mrr_vals, height, label='MRR', color='#1d4ed8') # Darker blue
    rects2 = ax.barh(y - height/2, ndcg_vals, height, label='nDCG@5', color='#15803d') # Darker green
    
    ax.set_yticks(y)
    ax.set_yticklabels(display_names, color='#0f172a', fontsize=11, fontweight='bold')
    ax.set_xlabel('Pontuação', color='#334155', fontsize=10)
    ax.set_title('Comparação de Métricas de Busca', color='#0f172a', fontsize=13, fontweight='bold', pad=15)
    ax.set_xlim(0, 1.1)
    
    ax.tick_params(colors='#475569', labelsize=10)
    ax.xaxis.grid(True, linestyle='--', alpha=0.5, color='#cbd5e1')
    ax.set_axisbelow(True)
    
    for spine in ['top', 'right', 'left', 'bottom']:
        ax.spines[spine].set_color('#cbd5e1')
        
    for rect in rects1:
        width = rect.get_width()
        ax.annotate(f'{width:.4f}',
                    xy=(width, rect.get_y() + rect.get_height()/2),
                    xytext=(5, 0),
                    textcoords="offset points",
                    ha='left', va='center', color='#1d4ed8', fontsize=9, fontweight='bold')
                    
    for rect in rects2:
        width = rect.get_width()
        ax.annotate(f'{width:.4f}',
                    xy=(width, rect.get_y() + rect.get_height()/2),
                    xytext=(5, 0),
                    textcoords="offset points",
                    ha='left', va='center', color='#15803d', fontsize=9, fontweight='bold')
                    
    ax.legend(facecolor='#ffffff', edgecolor='#cbd5e1', labelcolor='#0f172a')
    plt.tight_layout()
    fig.savefig(os.path.join(save_dir, "grafico_metricas_claro.png"), dpi=300, facecolor='#ffffff')
    plt.close(fig)
    print("Grafico de metricas salvo em grafico_metricas_claro.png")

    # -------------------------------------------------------------
    # 2. Word Cloud (Light Mode)
    # -------------------------------------------------------------
    print("Gerando nuvem de palavras em modo claro...")
    result = service.es.search(
        index=service.index,
        size=500,
        query={"match_all": {}},
        _source=["event_content"]
    )
    
    stopwords = {
        "the", "a", "an", "and", "or", "but", "is", "are", "was", "were", "be", "been", "has", "have", "had",
        "to", "of", "in", "for", "on", "with", "at", "by", "from", "up", "about", "into", "over", "after",
        "de", "do", "da", "em", "para", "com", "um", "uma", "o", "a", "e", "os", "as", "dos", "das", "no", "na",
        "nos", "nas", "ao", "aos", "se", "que", "como", "por", "mais", "xml", "json", "null", "not", "this",
        "that", "it", "its", "their", "they", "we", "he", "she", "you", "me", "my", "your", "our", "us",
        "at", "org", "com", "java", "android", "app", "application", "file", "line", "method", "class",
        "error", "exception", "failed", "crash", "failed", "fatal", "run", "running", "start", "started",
        "activity", "cannot", "issue", "log", "logs", "event", "events"
    }
    
    word_counter = Counter()
    for hit in result["hits"]["hits"]:
        content = hit["_source"].get("event_content", "")
        if content:
            words = re.findall(r'[a-zA-Z]{3,}', content.lower())
            for w in words:
                if w not in stopwords:
                    word_counter[w] += 1
                    
    if not word_counter:
        word_counter = {"vazio": 1}
        
    wordcloud = WordCloud(
        width=800,
        height=400,
        background_color='#ffffff',
        colormap='tab10',
        min_font_size=10,
        max_font_size=80,
        random_state=42
    ).generate_from_frequencies(word_counter)
    
    fig, ax = plt.subplots(figsize=(8, 4), facecolor='#ffffff')
    ax.imshow(wordcloud, interpolation='bilinear')
    ax.axis('off')
    plt.tight_layout(pad=0)
    fig.savefig(os.path.join(save_dir, "nuvem_palavras_clara.png"), dpi=300, facecolor='#ffffff')
    plt.close(fig)
    print("Nuvem de palavras salva em nuvem_palavras_clara.png")

    # -------------------------------------------------------------
    # 3. Top 10 Words Chart (Light Mode)
    # -------------------------------------------------------------
    print("Gerando grafico top 10 palavras em modo claro...")
    top_10 = word_counter.most_common(10)
    if not top_10:
        top_10 = [("Vazio", 0)]
        
    words, counts = zip(*top_10)
    words = list(words)[::-1]
    counts = list(counts)[::-1]
    
    y = np.arange(len(words))
    
    fig, ax = plt.subplots(figsize=(6, 4), facecolor='#ffffff')
    ax.set_facecolor('#f8f9fa')
    
    # Curated dark/deep colors for light theme
    colors = ['#5b21b6', '#6d28d9', '#7c3aed', '#db2777', '#be123c', '#d97706', '#ea580c', '#c2410c', '#15803d', '#1d4ed8']
    bar_colors = colors[-len(words):]
    
    rects = ax.barh(y, counts, height=0.6, color=bar_colors)
    
    ax.set_yticks(y)
    ax.set_yticklabels(words, color='#0f172a', fontsize=11, fontweight='bold')
    ax.set_xlabel('Frequência de Ocorrência', color='#334155', fontsize=10)
    ax.set_title('Top 10 Palavras nos Eventos', color='#0f172a', fontsize=13, fontweight='bold', pad=15)
    
    for rect in rects:
        width = rect.get_width()
        ax.annotate(f'{width}',
                    xy=(width, rect.get_y() + rect.get_height()/2),
                    xytext=(5, 0),
                    textcoords="offset points",
                    ha='left', va='center', color='#0f172a', fontsize=9, fontweight='bold')
                    
    ax.tick_params(colors='#475569', labelsize=10)
    ax.xaxis.grid(True, linestyle='--', alpha=0.5, color='#cbd5e1')
    ax.set_axisbelow(True)
    
    for spine in ['top', 'right', 'left', 'bottom']:
        ax.spines[spine].set_color('#cbd5e1')
        
    plt.tight_layout()
    fig.savefig(os.path.join(save_dir, "top10_palavras_claro.png"), dpi=300, facecolor='#ffffff')
    plt.close(fig)
    print("Grafico top 10 palavras salvo em top10_palavras_claro.png")
    print("Todos os graficos gerados com sucesso!")

if __name__ == '__main__':
    main()
