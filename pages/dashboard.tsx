import { useState } from 'react';
import { FaRegThumbsUp, FaRegBookmark } from 'react-icons/fa';

// Mock episode data
export type Episode = {
  id: number;
  title: string;
  guest: string;
  date: string;
  summary: string;
  tags: { group: 'Course' | 'Topic' | 'Audience' | 'Content'; label: string }[];
  likes: number;
  bookmarks: number;
};

const episodes: Episode[] = [
  {
    id: 1,
    title: 'Introduction to React',
    guest: 'Alice',
    date: '2024-01-01',
    summary: 'Getting started with React and component-based UI development.',
    tags: [
      { group: 'Course', label: 'React Basics' },
      { group: 'Topic', label: 'UI' },
      { group: 'Audience', label: 'Beginner' },
      { group: 'Content', label: 'Video' },
    ],
    likes: 12,
    bookmarks: 3,
  },
  {
    id: 2,
    title: 'Advanced TailwindCSS',
    guest: 'Bob',
    date: '2024-02-15',
    summary: 'Deep dive into customizing Tailwind for large projects.',
    tags: [
      { group: 'Course', label: 'Styling Pro' },
      { group: 'Topic', label: 'CSS' },
      { group: 'Audience', label: 'Intermediate' },
      { group: 'Content', label: 'Article' },
    ],
    likes: 20,
    bookmarks: 5,
  },
  {
    id: 3,
    title: 'Accessibility with Next.js',
    guest: 'Carol',
    date: '2024-03-20',
    summary: 'Best practices for building accessible React applications.',
    tags: [
      { group: 'Course', label: 'Web A11y' },
      { group: 'Topic', label: 'Accessibility' },
      { group: 'Audience', label: 'Advanced' },
      { group: 'Content', label: 'Podcast' },
    ],
    likes: 8,
    bookmarks: 2,
  },
];

const tagColors: Record<string, string> = {
  Course: 'bg-blue-200 text-blue-800',
  Topic: 'bg-green-200 text-green-800',
  Audience: 'bg-yellow-200 text-yellow-800',
  Content: 'bg-purple-200 text-purple-800',
};

export default function DashboardPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const tagsByGroup: Record<string, string[]> = {};
  episodes.forEach((ep) => {
    ep.tags.forEach((t) => {
      if (!tagsByGroup[t.group]) tagsByGroup[t.group] = [];
      if (!tagsByGroup[t.group].includes(t.label)) tagsByGroup[t.group].push(t.label);
    });
  });

  const filtered = episodes.filter((ep) => {
    const matchesTag = selectedTag ? ep.tags.some((t) => t.label === selectedTag) : true;
    const matchesQuery = ep.title.toLowerCase().includes(query.toLowerCase());
    return matchesTag && matchesQuery;
  });

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 p-4 border-r overflow-y-auto bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Filter by Tag</h2>
        {Object.entries(tagsByGroup).map(([group, tags]) => (
          <div key={group} className="mb-4">
            <h3 className="font-medium mb-2">{group}</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`px-2 py-1 rounded text-sm border ${tagColors[group]} ${
                    selectedTag === tag ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        ))}
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Search bar */}
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Search episodes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Episode list */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
          {filtered.map((ep) => (
            <div key={ep.id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-bold mb-1">{ep.title}</h3>
              <p className="text-sm text-gray-500 mb-2">
                {ep.guest} &bull; {ep.date}
              </p>
              <p className="mb-2 text-sm text-gray-700">{ep.summary}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {ep.tags.map((t) => (
                  <span key={t.label} className={`px-2 py-1 rounded text-xs ${tagColors[t.group]}`}> 
                    {t.label}
                  </span>
                ))}
              </div>
              <div className="flex items-center space-x-4 text-gray-600 text-sm">
                <span className="flex items-center">
                  <FaRegThumbsUp className="mr-1" />
                  {ep.likes}
                </span>
                <span className="flex items-center">
                  <FaRegBookmark className="mr-1" />
                  {ep.bookmarks}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

