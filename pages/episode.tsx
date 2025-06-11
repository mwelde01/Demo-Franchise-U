import { useMemo, useRef, useState } from 'react';

export type Tag = {
  group: 'Course' | 'Topic' | 'Audience' | 'Content';
  label: string;
};

export type TranscriptSegment = {
  text: string;
  start?: number; // seconds
};

export type EpisodeDetail = {
  title: string;
  guest: string;
  date: string;
  summary: string;
  tags: Tag[];
  audioUrl: string;
  duration: number; // seconds
  transcript: string;
};

const tagColors: Record<string, string> = {
  Course: 'bg-blue-200 text-blue-800',
  Topic: 'bg-green-200 text-green-800',
  Audience: 'bg-yellow-200 text-yellow-800',
  Content: 'bg-purple-200 text-purple-800',
};

const episode: EpisodeDetail = {
  title: 'Franchise Insights Episode 1',
  guest: 'John Doe',
  date: '2024-06-01',
  summary: 'Discussing franchise operations and success stories.',
  tags: [
    { group: 'Course', label: 'Business 101' },
    { group: 'Topic', label: 'Franchising' },
    { group: 'Audience', label: 'Entrepreneurs' },
    { group: 'Content', label: 'Podcast' },
  ],
  audioUrl: '/audio/sample.mp3',
  duration: 600,
  transcript: Array(18)
    .fill(
      'This is the sample transcript segment that covers topics about running a successful franchise with helpful tips.'
    )
    .join(' '),
};

function splitTranscript(text: string): TranscriptSegment[] {
  const words = text.trim().split(/\s+/);
  const segments: TranscriptSegment[] = [];
  for (let i = 0; i < words.length; i += 100) {
    segments.push({ text: words.slice(i, i + 100).join(' ') });
  }
  return segments;
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
}

export default function EpisodePage() {
  const [search, setSearch] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);

  const segments = useMemo(() => {
    const segs = splitTranscript(episode.transcript);
    const hasTimestamps = segs.some((s) => s.start !== undefined);
    if (!hasTimestamps) {
      segs.forEach((s, i) => {
        s.start = (i * episode.duration) / segs.length;
      });
    }
    return segs;
  }, []);

  const filtered = segments.filter((s) =>
    s.text.toLowerCase().includes(search.toLowerCase())
  );

  const highlight = (text: string, q: string) => {
    if (!q) return text;
    return text.replace(new RegExp(`(${q})`, 'gi'), '<mark>$1</mark>');
  };

  const jumpTo = (sec: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = sec;
      audioRef.current.play();
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <div className="bg-gray-800 text-white p-4 rounded">
        <h1 className="text-2xl font-bold mb-2">FranchiseU!</h1>
        <audio ref={audioRef} controls className="w-full" src={episode.audioUrl} />
      </div>

      <div>
        <h2 className="text-xl font-semibold">{episode.title}</h2>
        <p className="text-gray-600 mb-2">
          {episode.guest} &bull; {episode.date}
        </p>
        <p className="mb-3 text-gray-700">{episode.summary}</p>
        <div className="flex flex-wrap gap-2">
          {episode.tags.map((t) => (
            <span key={t.label} className={`px-2 py-1 rounded text-xs ${tagColors[t.group]}`}>{t.label}</span>
          ))}
        </div>
      </div>

      <div className="border p-4 rounded">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search transcript..."
          className="w-full p-2 border rounded mb-4"
        />
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {segments.map((seg, i) => {
            const match = seg.text.toLowerCase().includes(search.toLowerCase());
            return (
              <div key={i} className="space-y-1">
                <p
                  dangerouslySetInnerHTML={{
                    __html: highlight(seg.text, match ? search : ''),
                  }}
                  className="leading-relaxed"
                />
                {match && (
                  <button
                    className="text-blue-600 text-sm underline"
                    onClick={() => jumpTo(seg.start || 0)}
                  >
                    Jump to {formatTime(seg.start || 0)}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
