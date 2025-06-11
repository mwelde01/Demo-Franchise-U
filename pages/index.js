 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a//dev/null b/pages/index.tsx
index 0000000000000000000000000000000000000000..7b0e9121e50502abff677dadbc4808b03907f43d 100644
--- a//dev/null
+++ b/pages/index.tsx
@@ -0,0 +1,68 @@
+import Image from 'next/image';
+
+export default function Home() {
+  return (
+    <div className="min-h-screen bg-brand-muted text-gray-800 px-4 md:px-20">
+      {/* Navigation */}
+      <nav className="flex items-center justify-between py-6">
+        <div className="flex items-center space-x-2">
+          <Image src="/logo.svg" alt="FranchiseU Logo" width={40} height={40} />
+          <span className="font-bold text-xl text-brand-primary">FranchiseU!</span>
+        </div>
+        <ul className="flex space-x-6 text-brand-primary font-medium">
+          <li><a href="#episodes" className="hover:text-brand-secondary">Episodes</a></li>
+          <li><a href="#about" className="hover:text-brand-secondary">About</a></li>
+          <li><a href="#admin" className="hover:text-brand-secondary">Admin</a></li>
+        </ul>
+      </nav>
+
+      {/* Hero */}
+      <header className="mt-10 mb-16 text-center space-y-6">
+        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-primary">Welcome to FranchiseU!</h1>
+        <p className="text-lg md:text-xl max-w-2xl mx-auto">Your go-to podcast for franchising insights, success stories, and expert advice.</p>
+        <div className="flex justify-center">
+          <input
+            type="text"
+            placeholder="Search for topics or episodes…"
+            className="w-full max-w-md px-4 py-2 border border-brand-primary rounded-md focus:outline-none"
+          />
+        </div>
+      </header>
+
+      {/* Featured Episode */}
+      <section className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
+        <div className="flex-shrink-0">
+          <Image src="/featured.jpg" alt="Featured Episode" width={240} height={240} className="rounded" />
+        </div>
+        <div className="flex-1">
+          <h2 className="text-2xl font-bold text-brand-primary mb-2">Featured Episode Title</h2>
+          <p className="mb-4">A short summary of the featured episode goes here. Learn something amazing about franchising in this episode!</p>
+          <button className="px-6 py-2 bg-brand-primary text-white rounded hover:bg-brand-secondary">Play Episode</button>
+        </div>
+      </section>
+
+      {/* Tags */}
+      <section className="mt-12 space-y-6">
+        {[
+          { label: 'Course', tags: ['Intro', 'Growth', 'Financing'] },
+          { label: 'Topic', tags: ['Legal', 'Marketing', 'Operations'] },
+          { label: 'Audience', tags: ['New Owners', 'Veterans', 'Investors'] },
+          { label: 'Content', tags: ['Audio', 'Video', 'Blog'] },
+        ].map(group => (
+          <div key={group.label} className="flex flex-wrap items-center">
+            <span className="mr-4 font-semibold text-brand-primary w-24">{group.label}:</span>
+            {group.tags.map(tag => (
+              <a
+                key={tag}
+                href="#"
+                className="mr-2 mb-2 px-3 py-1 bg-brand-accent text-sm rounded-full hover:bg-brand-secondary hover:text-white"
+              >
+                {tag}
+              </a>
+            ))}
+          </div>
+        ))}
+      </section>
+    </div>
+  );
+}
 
EOF
)
