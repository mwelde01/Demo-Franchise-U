import { useEffect, useState, ChangeEvent } from 'react'

interface Tag {
  value: string
  label: string
  tooltip: string
}

const TAGS: Record<string, Tag[]> = {
  Course: [
    { value: 'course1', label: 'Course 1', tooltip: 'Tag for course 1' },
    { value: 'course2', label: 'Course 2', tooltip: 'Tag for course 2' },
  ],
  Topic: [
    { value: 'topic1', label: 'Topic 1', tooltip: 'Tag for topic 1' },
    { value: 'topic2', label: 'Topic 2', tooltip: 'Tag for topic 2' },
  ],
  Audience: [
    { value: 'audience1', label: 'Audience 1', tooltip: 'Tag for audience 1' },
    { value: 'audience2', label: 'Audience 2', tooltip: 'Tag for audience 2' },
  ],
  Content: [
    { value: 'content1', label: 'Content 1', tooltip: 'Tag for content 1' },
    { value: 'content2', label: 'Content 2', tooltip: 'Tag for content 2' },
  ],
}

export default function Admin() {
  const [title, setTitle] = useState('')
  const [guests, setGuests] = useState('')
  const [summary, setSummary] = useState('')
  const [date, setDate] = useState('')
  const [audio, setAudio] = useState<File | null>(null)
  const [transcript, setTranscript] = useState<File | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [suggested, setSuggested] = useState<string[]>([])

  useEffect(() => {
    // placeholder for AI suggestion logic
    setSuggested(['topic1', 'audience2'])
  }, [])

  const toggleTag = (val: string) => {
    setSelectedTags((prev) =>
      prev.includes(val) ? prev.filter((t) => t !== val) : [...prev, val]
    )
  }

  const addSuggested = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const removeSuggested = (tag: string) => {
    setSuggested((prev) => prev.filter((t) => t !== tag))
  }

  const handleFile = (
    e: ChangeEvent<HTMLInputElement>,
    setter: (f: File | null) => void
  ) => {
    setter(e.target.files ? e.target.files[0] : null)
  }

  const handleSubmit = (status: 'draft' | 'publish') => {
    const data = {
      title,
      guests,
      summary,
      date,
      audio,
      transcript,
      tags: selectedTags,
      status,
    }
    console.log('submit', data)
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold text-brand-primary">Episode Admin</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="audio">
            Audio File
          </label>
          <input
            id="audio"
            type="file"
            accept="audio/*"
            onChange={(e) => handleFile(e, setAudio)}
            className="border rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="transcript">
            Transcript File
          </label>
          <input
            id="transcript"
            type="file"
            accept=".txt,.pdf"
            onChange={(e) => handleFile(e, setTranscript)}
            className="border rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="title">
            Episode Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded w-full p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="guests">
            Guest(s)
          </label>
          <input
            id="guests"
            type="text"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="border rounded w-full p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="summary">
            Summary
          </label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="border rounded w-full p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="date">
            Episode Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded p-2"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold mt-4 mb-2">Tags</h2>
          {Object.entries(TAGS).map(([category, tags]) => (
            <div key={category} className="mb-2">
              <h3 className="font-medium">{category}</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {tags.map((tag) => (
                  <label
                    key={tag.value}
                    className="flex items-center space-x-1 text-sm"
                    title={tag.tooltip}
                  >
                    <input
                      type="checkbox"
                      value={tag.value}
                      checked={selectedTags.includes(tag.value)}
                      onChange={() => toggleTag(tag.value)}
                      className="mr-1"
                    />
                    <span>{tag.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-lg font-semibold mt-4 mb-2">AI Suggested Tags</h2>
          <div className="flex flex-wrap gap-2">
            {suggested.map((tag) => (
              <div
                key={tag}
                className="border rounded px-2 py-1 text-sm flex items-center space-x-1"
              >
                <span>{tag}</span>
                {selectedTags.includes(tag) ? (
                  <button
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className="text-red-600"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => addSuggested(tag)}
                    className="text-brand-secondary"
                  >
                    Add
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeSuggested(tag)}
                  className="text-gray-500"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex space-x-4 mt-6">
          <button
            type="button"
            onClick={() => handleSubmit('draft')}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={() => handleSubmit('publish')}
            className="bg-brand-primary text-white px-4 py-2 rounded"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  )
}
