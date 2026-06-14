import re
from collections import Counter
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from wordcloud import WordCloud

class AnalysisService:
    @staticmethod
    def generate_metrics_chart(metrics):
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
        
        fig, ax = plt.subplots(figsize=(8, 4), facecolor='#0c1422')
        ax.set_facecolor('#07090f')
        
        rects1 = ax.barh(y + height/2, mrr_vals, height, label='MRR', color='#3b82f6')
        rects2 = ax.barh(y - height/2, ndcg_vals, height, label='nDCG@5', color='#22c55e')
        
        ax.set_yticks(y)
        ax.set_yticklabels(display_names, color='#dde8f8', fontsize=11, fontweight='bold')
        ax.set_xlabel('Pontuação', color='#b8cce0', fontsize=10)
        ax.set_title('Comparação de Métricas de Busca', color='#dde8f8', fontsize=13, fontweight='bold', pad=15)
        ax.set_xlim(0, 1.1)
        
        ax.tick_params(colors='#526d8c', labelsize=10)
        ax.xaxis.grid(True, linestyle='--', alpha=0.15, color='#526d8c')
        ax.set_axisbelow(True)
        
        for spine in ['top', 'right', 'left', 'bottom']:
            ax.spines[spine].set_color('#162033')
            
        for rect in rects1:
            width = rect.get_width()
            ax.annotate(f'{width:.4f}',
                        xy=(width, rect.get_y() + rect.get_height()/2),
                        xytext=(5, 0),
                        textcoords="offset points",
                        ha='left', va='center', color='#3b82f6', fontsize=9, fontweight='bold')
                        
        for rect in rects2:
            width = rect.get_width()
            ax.annotate(f'{width:.4f}',
                        xy=(width, rect.get_y() + rect.get_height()/2),
                        xytext=(5, 0),
                        textcoords="offset points",
                        ha='left', va='center', color='#22c55e', fontsize=9, fontweight='bold')
                        
        ax.legend(facecolor='#0c1422', edgecolor='#162033', labelcolor='#dde8f8')
        
        plt.tight_layout()
        return fig

    @staticmethod
    def generate_wordcloud_chart(es, index):
        result = es.search(
            index=index,
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
            background_color='#07090f',
            colormap='cool',
            min_font_size=10,
            max_font_size=80,
            random_state=42
        ).generate_from_frequencies(word_counter)
        
        fig, ax = plt.subplots(figsize=(8, 4), facecolor='#0c1422')
        ax.imshow(wordcloud, interpolation='bilinear')
        ax.axis('off')
        plt.tight_layout(pad=0)
        return fig

    @staticmethod
    def generate_word_freq_chart(es, index):
        result = es.search(
            index=index,
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
                        
        top_10 = word_counter.most_common(10)
        if not top_10:
            top_10 = [("Vazio", 0)]
            
        words, counts = zip(*top_10)
        words = list(words)[::-1]
        counts = list(counts)[::-1]
        
        y = np.arange(len(words))
        
        fig, ax = plt.subplots(figsize=(6, 4), facecolor='#0c1422')
        ax.set_facecolor('#07090f')
        
        colors = ['#8b5cf6', '#a78bfa', '#c084fc', '#f472b6', '#f43f5e', '#fbbf24', '#fb923c', '#f97316', '#22c55e', '#3b82f6']
        bar_colors = colors[-len(words):]
        
        rects = ax.barh(y, counts, height=0.6, color=bar_colors)
        
        ax.set_yticks(y)
        ax.set_yticklabels(words, color='#dde8f8', fontsize=11, fontweight='bold')
        ax.set_xlabel('Frequência de Ocorrência', color='#b8cce0', fontsize=10)
        ax.set_title('Top 10 Palavras nos Eventos', color='#dde8f8', fontsize=13, fontweight='bold', pad=15)
        
        for rect in rects:
            width = rect.get_width()
            ax.annotate(f'{width}',
                        xy=(width, rect.get_y() + rect.get_height()/2),
                        xytext=(5, 0),
                        textcoords="offset points",
                        ha='left', va='center', color='#dde8f8', fontsize=9, fontweight='bold')
                        
        ax.tick_params(colors='#526d8c', labelsize=10)
        ax.xaxis.grid(True, linestyle='--', alpha=0.15, color='#526d8c')
        ax.set_axisbelow(True)
        
        for spine in ['top', 'right', 'left', 'bottom']:
            ax.spines[spine].set_color('#162033')
            
        plt.tight_layout()
        return fig
